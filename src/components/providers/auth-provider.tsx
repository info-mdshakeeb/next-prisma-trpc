"use client";

import { AnimatePresence, motion } from "motion/react";
import { Route } from "next";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { loginAction, logoutAction } from "@/features/auth/action";
import { AuthEvent, useCrossTabBus } from "@/hooks/use-cross-tab-bus";
import { ISession, IUser } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { SessionQueryParams } from "better-auth";
import { SVGLoader } from "../loader/svg-loader";

interface AuthContextValue {
  user: IUser | undefined;
  session: ISession | undefined;
  authLoading: boolean;
  logout: () => Promise<void>;
  login: (args: {
    data: { email: string; password: string };
    callback?: string | string[] | undefined;
  }) => Promise<void>;
  refetch: (
    queryParams?:
      | {
          query?: SessionQueryParams | undefined;
        }
      | undefined
  ) => void;
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
    error,
  } = authClient.useSession();

  const [actionMessage, setActionMessage] = React.useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  // incoming cross-tab events
  const handleIncoming = React.useCallback(
    (msg: AuthEvent) => {
      if (!msg || msg.originTab === tabIdRef.current) return;

      const messages = {
        logout: "Synchronizing logout across tabs...",
        login: "Synchronizing login across tabs...",
      };

      if (msg.type in messages) {
        setActionMessage(messages[msg.type as keyof typeof messages]);
        startTransition(async () => {
          await new Promise((resolve) => setTimeout(resolve, 800));
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
    if (!res.success) {
      toast.error(res.message, { id: "login" });
      return;
    }
    toast.dismiss("login");
    setIsLoggingIn(true);
    try {
      setActionMessage("Setting up your session...");
      await new Promise((resolve) => setTimeout(resolve, 700));
      publish({
        id: uuidv4(),
        type: "login",
        originTab: tabIdRef.current,
        ts: Date.now(),
      });
      setActionMessage("Loading your preferences...");
      refetch();
      await new Promise((resolve) => setTimeout(resolve, 700));

      setActionMessage("Almost there...");
      await new Promise((resolve) => setTimeout(resolve, 500));

      startTransition(() => {
        router.push(callback ? (callback as Route) : "/dashboard");
      });
    } catch (_err) {
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsLoggingIn(false);
      setActionMessage("");
    }
  };

  const logout = async () => {
    setActionMessage("Finalizing logout...");
    startTransition(async () => {
      const res = await logoutAction();
      if (!res.success) {
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
    refetch,
  };

  const getLoadingState = () => {
    if (isPending || isLoggingIn) {
      return { show: true, message: actionMessage || "Loading..." };
    }
    return { show: false, message: "" };
  };
  const loadingState = getLoadingState();

  return (
    <AuthContext.Provider value={value}>
      <AnimatePresence mode="wait">
        <LoadingOverlay
          show={loadingState.show}
          message={loadingState.message}
        />
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

function LoadingOverlay({
  message = "Loading...",
  show,
}: {
  message?: string;
  show: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.3, opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-0 z-99 flex items-center justify-center
             bg-background origin-center"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-4"
          >
            <SVGLoader size={50} />

            <motion.span
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-medium text-foreground text-center max-w-xs"
            >
              {message}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
