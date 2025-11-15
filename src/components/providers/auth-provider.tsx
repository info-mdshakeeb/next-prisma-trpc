"use client";

import { AuthEvent, useCrossTabBus } from "@/hooks/use-cross-tab-bus";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

type LoginResult = {
  success: boolean;
  message?: string;
};

type LoginArgs = {
  data: { email: string; password: string };
  callback?: string | string[] | undefined;
};

type LoginFn = (args: LoginArgs) => Promise<LoginResult>;

interface AuthContextValue {
  user: (typeof authClient.$Infer.Session)["user"] | undefined;
  session: (typeof authClient.$Infer.Session)["session"] | undefined;
  login: LoginFn;
  logout: () => Promise<void>;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const [isActionLoading, setIsActionLoading] = React.useState(false);
  const [actionMessage, setActionMessage] = React.useState<string | null>(null);

  // unique per tab
  const tabIdRef = React.useRef<string>(uuidv4());

  const publish = useCrossTabBus(() => {});

  const startLoading = (message: string) => {
    setIsActionLoading(true);
    setActionMessage(message);
  };

  // Cleanly stop loader
  const stopLoading = () => {
    setIsActionLoading(false);
    setActionMessage(null);
  };

  const { data, isPending: authLoading } = authClient.useSession();

  const login: LoginFn = async ({ data, callback }) => {
    let result: { success: boolean; message?: string } = { success: false };
    await authClient.signIn.email(
      {
        ...data,
        callbackURL: callback
          ? Array.isArray(callback)
            ? callback[0]
            : callback
          : "/dashboard",
      },
      {
        onError: ({ error }) => {
          result = {
            success: false,
            message: error.message,
          };
        },
        onSuccess: () => {
          result = {
            success: true,
            message: "Login successful",
          };
          startLoading("Finalizing login...");
          publish({
            id: uuidv4(),
            type: "login",
            originTab: tabIdRef.current,
            ts: Date.now(),
          });
          stopLoading();
        },
      }
    );
    return result;
  };

  const logout = async () => {
    startLoading("Logging out...");
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          publish({
            id: uuidv4(),
            type: "logout",
            originTab: tabIdRef.current,
            ts: Date.now(),
          });
          stopLoading();
        },
      },
    });
  };

  // incoming cross-tab events
  const handleIncoming = React.useCallback(
    (msg: AuthEvent) => {
      if (!msg || msg.originTab === tabIdRef.current) return;

      if (msg.type === "logout") {
        startLoading("Logging out...");
        startTransition(() => {
          router.refresh();
          stopLoading();
        });
      } else if (msg.type === "login") {
        startLoading("Loading user session...");
        startTransition(() => {
          router.refresh();
          stopLoading();
        });
      }
    },
    [router]
  );

  // subscribe to bus with stable handler
  useCrossTabBus(handleIncoming);

  const value: AuthContextValue = {
    user: data?.user,
    session: data?.session,
    login,
    logout,
    authLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      <AnimatePresence>
        {(isPending || isActionLoading) && (
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
              <Loader className="h-6 w-6 animate-spin text-primary" />
              <span className="text-2xl font-semibold text-foreground">
                {actionMessage || (authLoading ? "Syncing session..." : "")}
              </span>
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
