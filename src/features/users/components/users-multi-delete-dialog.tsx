"use client";

import { type Table } from "@tanstack/react-table";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import ActionButton from "@/components/action-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserMultiDeleteDialogProps<TData> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: Table<TData>;
};

const CONFIRM_WORD = "DELETE";

export function UsersMultiDeleteDialog<TData>({
  open: _open,
  onOpenChange,
  table,
}: UserMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState("");

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <ActionButton
      variant="destructive"
      popupTitle={
        <span className="text-destructive">
          <AlertTriangle
            className="stroke-destructive me-1 inline-block"
            size={18}
          />{" "}
          Delete {selectedRows.length}{" "}
          {selectedRows.length > 1 ? "users" : "user"}
        </span>
      }
      popupContent={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete the selected users? <br />
            This action cannot be undone.
          </p>

          <Label className="my-4 flex flex-col items-start gap-1.5">
            <span>Confirm by typing &quot;{CONFIRM_WORD}&quot;:</span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Type "${CONFIRM_WORD}" to confirm.`}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      onConfirm={async () => {
        if (value.trim() !== CONFIRM_WORD) {
          return {
            success: false,
            message: `Please type "${CONFIRM_WORD}" to confirm.`,
          };
        }

        onOpenChange(false);
        table.resetRowSelection();

        return {
          success: true,
          message: `Deleted ${selectedRows.length} ${
            selectedRows.length > 1 ? "users" : "user"
          }`,
        };
      }}
    >
      Delete
    </ActionButton>
  );
}
