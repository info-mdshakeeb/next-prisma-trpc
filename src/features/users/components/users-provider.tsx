"use client";
import React, { useState } from "react";

import useDialogState from "@/hooks/use-dialog-state";
import { TUserItem } from "../user.type";

type UsersDialogType = "invite" | "add" | "edit" | "delete";

type UsersContextType = {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentRow: TUserItem | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<TUserItem | null>>;
};

const UsersContext = React.createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TUserItem | null>(null);

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext>
  );
}
export const useUsersContext = () => {
  const usersContext = React.useContext(UsersContext);
  if (!usersContext) {
    throw new Error("useUsersContext has to be used within <UsersContext>");
  }
  return usersContext;
};
