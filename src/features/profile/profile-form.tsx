"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { updatedDiff } from "deep-object-diff";
import {
  InfoIcon,
  Loader2,
  MailIcon,
  PhoneIcon,
  User2Icon,
} from "lucide-react";
import { useEffect, useMemo, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { removeNullableValues } from "@/lib/remove-nullable-values";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateUserAction } from "../auth/action";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(60, { message: "First name must not be longer than 30 characters." }),
  username: z.string().optional(),
  email: z.email().optional(),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters." })
    .max(11, { message: "Phone number must not be longer than 15 characters." })
    .optional(),
  photo: z.string().optional(),
});

export type IProfileUpdateForm = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { user, refetch, authLoading } = useAuth();
  const [isPending, startTransition] = useTransition();

  const userData = useMemo(
    () => ({
      name: user?.name ?? "",
      username: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      photo: "",
    }),
    [user]
  );

  const form = useForm<IProfileUpdateForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: userData,
    mode: "onChange",
  });

  const onSubmit = async (data: IProfileUpdateForm) => {
    const sanitized = removeNullableValues(data);

    const changes = updatedDiff(
      userData,
      sanitized
    ) as Partial<IProfileUpdateForm>;
    if (Object.keys(changes).length === 0) {
      toast.error("No changes detected.");
      return;
    }
    startTransition(async () => {
      const result = await updateUserAction({ ...changes });

      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success("Profile updated successfully!");
      refetch();
    });
  };

  useEffect(() => {
    if (!authLoading && user) {
      form.reset(userData);
    }
  }, [user, authLoading, form, userData]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset className="space-y-8" disabled={isPending || authLoading}>
        <FieldGroup>
          {/* Profile Picture */}
          <Controller
            control={form.control}
            name="photo"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Profile Picture</FieldLabel>
                <Input
                  disabled
                  id={field.name}
                  type="file"
                  // react-hook-form with file input usually handled via onChange
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    field.onChange(file ? file.name : "");
                  }}
                />
                {fieldState.invalid && fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Upload an image to use as your profile avatar.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          {/* Name & Username */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel required htmlFor={field.name}>
                    Name
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      placeholder="User Name"
                      {...field}
                      disabled
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon>
                      <User2Icon
                        className={cn("", {
                          "text-destructive": fieldState.invalid,
                        })}
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && fieldState.error ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>
                      Your name will be displayed publicly.
                    </FieldDescription>
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>User Name</FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      placeholder="User Name"
                      {...field}
                      disabled
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon>
                      <FieldLabel htmlFor="username">@</FieldLabel>
                      {/* <User2Icon
                        className={cn("", {
                          "text-destructive": fieldState.invalid,
                        })}
                      /> */}
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Email (disabled) */}
          <Controller
            disabled
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="m@example.com"
                  />
                  <InputGroupAddon align="block-start">
                    <FieldLabel htmlFor={field.name}>
                      <MailIcon
                        size={"16"}
                        className={cn("", {
                          "text-destructive": fieldState.invalid,
                        })}
                      />
                      Email
                      {fieldState.invalid && fieldState.error ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <FieldDescription className="saturate-0 opacity-70 line-clamp-1">
                          (You cannot change your email address)
                        </FieldDescription>
                      )}
                    </FieldLabel>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          aria-label="Help"
                          className="ml-auto rounded-full"
                          size="icon-xs"
                        >
                          <InfoIcon />
                        </InputGroupButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>We&apos;ll use this to send you notifications</p>
                      </TooltipContent>
                    </Tooltip>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />

          {/* Mobile Number */}
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel required htmlFor={field.name}>
                  Mobile Number
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    placeholder="01*********"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon>
                    <PhoneIcon
                      className={cn("", {
                        "text-destructive": fieldState.invalid,
                      })}
                    />
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Used for account recovery and security.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          {/* Submit Button */}
          <Field orientation={"horizontal"}>
            <Button type="submit" size="sm" className="" disabled={isPending}>
              {isPending ? (
                <FieldContent className="flex flex-col items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </FieldContent>
              ) : (
                "Update Profile"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </fieldset>
    </form>
  );
}
