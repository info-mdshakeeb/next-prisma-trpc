import { cn } from "@/lib/utils";

type BodyProps = React.HTMLAttributes<HTMLElement> & {
  fluid?: boolean;
  fixed?: boolean;
};

export function Main({
  children,
  fluid,
  fixed,
  className,
  ...props
}: BodyProps) {
  return (
    <div
      data-layout={fixed ? "fixed" : "auto"}
      className={cn(fixed && "flex grow flex-col overflow-hidden ", className)}
      {...props}
    >
      <div className={cn(!fluid && "container mx-auto")}>
        <div className="flex flex-1 flex-col ">{children}</div>
      </div>
    </div>
  );
}
