"use client";

import { AnimatePresence, motion } from "motion/react";
import { Route } from "next";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { loginAction, logoutAction } from "@/features/action";
import { AuthEvent, useCrossTabBus } from "@/hooks/use-cross-tab-bus";
import { authClient } from "@/lib/auth-client";
import { SVGLoader } from "../loader/svg-loader";

interface AuthContextValue {
  user: (typeof authClient.$Infer.Session)["user"] | undefined;
  session: (typeof authClient.$Infer.Session)["session"] | undefined;
  authLoading: boolean;
  logout: () => Promise<void>;
  login: (args: {
    data: { email: string; password: string };
    callback?: string | string[] | undefined;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const tabIdRef = React.useRef<string>(uuidv4());
  const [isPending, startTransition] = React.useTransition();
  const {
    data,
    isPending: authLoading,
    refetch,
    isRefetching,
  } = authClient.useSession();

  const [actionMessage, setActionMessage] = React.useState<string>("");

  // incoming cross-tab events
  const handleIncoming = React.useCallback(
    (msg: AuthEvent) => {
      if (!msg || msg.originTab === tabIdRef.current) return;

      if (msg.type === "logout") {
        startTransition(() => {
          setActionMessage("Logging out...");
          router.refresh();
        });
      } else if (msg.type === "login") {
        setActionMessage("Logging in...");
        startTransition(() => {
          router.refresh();
        });
      }
    },

    [router]
  );
  const publish = useCrossTabBus(handleIncoming);

  const login = async ({
    data,
    callback,
  }: {
    data: { email: string; password: string };
    callback?: string | string[] | undefined;
  }) => {
    toast.loading("Logging in...", { id: "login" });
    const res = await loginAction({
      ...data,
    });
    if (!res.ok) {
      toast.error(res.message, { id: "login" });
      return;
    }
    toast.dismiss("login");
    setActionMessage("Finalizing login...");
    startTransition(async () => {
      publish({
        id: uuidv4(),
        type: "login",
        originTab: tabIdRef.current,
        ts: Date.now(),
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      refetch();
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push(callback ? (callback as Route) : "/dashboard");
    });
  };

  const logout = async () => {
    setActionMessage("Finalizing logout...");
    startTransition(async () => {
      const res = await logoutAction();
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      publish({
        id: uuidv4(),
        type: "logout",
        originTab: tabIdRef.current,
        ts: Date.now(),
      });
      router.refresh();
      setActionMessage("");
    });
  };

  const value: AuthContextValue = {
    user: data?.user,
    session: data?.session,
    authLoading,
    logout,
    login,
  };

  const showAuthLoading = isPending;
  const overlayText =
    authLoading || isRefetching
      ? "Synchronizing session..."
      : actionMessage || "Loading...";

  return (
    <AuthContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {showAuthLoading && (
          <motion.div
            key="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-background backdrop-blur-sm z-51"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <SVGLoader size={50} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={overlayText}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 18,
                    mass: 0.3,
                  }}
                  className="text-2xl font-semibold text-foreground"
                >
                  {overlayText}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
