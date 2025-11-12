"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, UserIcon } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { PasswordInput } from "@/components/forms/password-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be at most 255 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be at most 128 characters"),
});

export type IRegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm({
  className,
  callback,
}: {
  className?: string;
  callback?: string;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<IRegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: IRegisterFormValues) {
    toast.loading("Registering...", {
      id: "register",
    });
    startTransition(async () => {
      await authClient.signUp.email(
        {
          ...data,
          callbackURL: callback ?? "/",
        },
        {
          onError: ({ error }) => {
            toast.error(error.message, {
              id: "register",
            });
          },
          onSuccess() {
            toast.success("Register successful!", {
              id: "register",
            });
          },
        }
      );
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={isPending} className={cn("", className)}>
        <FieldGroup className="gap-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel required htmlFor={field.name}>
                  Name
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="Jane Doe"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon>
                    <UserIcon
                      className={cn({ "text-destructive": fieldState.invalid })}
                    />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>Enter your full name.</FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel required htmlFor={field.name}>
                  Email
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon>
                    <MailIcon
                      className={cn({ "text-destructive": fieldState.invalid })}
                    />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    We&apos;ll never share your email with anyone else.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel required htmlFor={field.name}>
                  Password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Enter your password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Must be at least 6 characters.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Create account</Button>
          </Field>
        </FieldGroup>
      </fieldset>
    </form>
  );
}
