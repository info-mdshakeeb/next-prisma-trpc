import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { TextShimmer } from "../ui/text-shimmer";

export default function ShimmerLoader({
  loading,
  loaderText,
  text,
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading: boolean;
    text: string;
    loaderText?: string;
  }) {
  return (
    <Button data-slot="button" className={cn(className)} {...props}>
      {loading ? (
        <TextShimmer duration={1.2}>{loaderText ?? text}</TextShimmer>
      ) : (
        <div>{text}</div>
      )}
    </Button>
  );
}
