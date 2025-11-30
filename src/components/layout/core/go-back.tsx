"use client";

import { VariantProps } from "class-variance-authority";
import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button, buttonVariants } from "../../../components/ui/button";

type GoBackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

export default function GoBack({
  onClick,
  children,
  className = "text-xs h-6",
  variant = "link",
  size = "sm",
  ...props
}: GoBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      {...props}
      onClick={(e) => {
        router.back();
        if (onClick) onClick(e);
      }}
    >
      {children ?? (
        <>
          <ArrowBigLeftDash />
          <span className="hidden md:block"> Go Back</span>
        </>
      )}
    </Button>
  );
}
