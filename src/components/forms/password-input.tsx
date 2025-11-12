"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed, InfoIcon } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const PasswordInput = ({ ...props }: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);
  const disabled =
    props.value === "" || props.value === undefined || props.disabled;

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
      />
      <InputGroupAddon>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <InputGroupButton variant="ghost" aria-label="Info" size="icon-xs">
              <InfoIcon
                className={cn("", {
                  "text-destructive": props["aria-invalid"],
                })}
              />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>
            mix of upper/lowercase, numbers & symbols.
          </TooltipContent>
        </Tooltip>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          size="icon-xs"
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
export { PasswordInput };
