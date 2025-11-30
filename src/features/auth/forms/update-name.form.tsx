"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

const updateNameSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

type UpdateNameFormValues = z.infer<typeof updateNameSchema>;

export function UpdateNameForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();
  const trpc = useTRPC();

  const form = useForm<UpdateNameFormValues>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const onSubmit = async (data: UpdateNameFormValues) => {
    startTransition(async () => {});
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("", className)}>
      <fieldset disabled={isPending}>
        <FieldGroup>
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
                    aria-invalid={fieldState.invalid}
                    placeholder="Your name"
                  />
                </InputGroup>

                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    This will be visible on your profile.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Update name</Button>
          </Field>
        </FieldGroup>
      </fieldset>
    </form>
  );
}
