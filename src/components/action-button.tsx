"use client";

import { VariantProps } from "class-variance-authority";
import type React from "react";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";

import { TextShimmer } from "./ui/text-shimmer";

const ActionButton = ({
  children,
  popupContent,
  popupTitle,
  onConfirm,
  open,
  onOpenChange,
  hideTrigger,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    popupContent: React.ReactNode;
    popupTitle: React.ReactNode;
    onConfirm: () => Promise<{
      message?: string;
      success?: boolean;
    }>;
    open?: boolean;
    hideTrigger?: boolean;
    onOpenChange?: (open: boolean) => void;
  }) => {
  const [isLoading, startLoading] = useTransition();

  const handleConfirm = () => {
    startLoading(async () => {
      const data = await onConfirm();
      if (!data.success) toast.error(data.message ?? "Something went wrong");
      else toast.success(data.message ?? "Action successful");

      // Close dialog after action if controlled
      if (onOpenChange) {
        onOpenChange(false);
      }
    });
  };

  return (
    <AlertDialog
      open={open ?? (isLoading ? true : undefined)}
      onOpenChange={onOpenChange}
    >
      {!hideTrigger && (
        <AlertDialogTrigger asChild>
          <Button {...props}>{children}</Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{popupTitle}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            {popupContent}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (onOpenChange) onOpenChange(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleConfirm}>
            {isLoading ? <TextShimmer>Confirm</TextShimmer> : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionButton;
