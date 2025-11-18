import { cn } from "@/lib/utils";
import * as React from "react";

interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative  pt-3 pb-1 border-b border-primary/10",
        className
      )}
      {...props}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn("flex flex-row  justify-between gap-2 items-end ", {
            "pb-2": !description && actions,
          })}
        >
          <span
            className={cn(
              "text-2xl sm:text-[27px] font-bold tracking-tight text-foreground ",
              titleClassName
            )}
          >
            {title}
          </span>

          {actions && !description && actions}
        </div>

        {description && (
          <div className="flex flex-row items-center justify-between gap-2 pb-1">
            <span
              className={cn(
                "flex-1 min-w-0 text-muted-foreground text-base sm:text-lg truncate",
                descriptionClassName
              )}
            >
              {description}
            </span>

            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
