"use client";

import React from "react";

import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/sonner";
import AuthProvider from "./auth-provider";
import { SearchProvider } from "./search-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        <AuthProvider>
          <TRPCReactProvider>
            <SearchProvider>{children}</SearchProvider>
            <Toaster />
          </TRPCReactProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
