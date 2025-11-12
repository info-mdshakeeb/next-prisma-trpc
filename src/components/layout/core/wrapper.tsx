import { cn } from "@/lib/utils";

type WrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  fixed?: boolean;
};

function Wrapper({ fixed, className, children, ...props }: WrapperProps) {
  return (
    <div
      data-layout={fixed ? "fixed" : "auto"}
      className={cn("group/layout flex flex-col flex-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Wrapper };
