"use client";

import React from "react";

import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "../ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TRPCReactProvider>
        {children}
        <Toaster />
      </TRPCReactProvider>
    </>
  );
}
