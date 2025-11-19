"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
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

import { removeNullableValues } from "@/lib/remove-nullable-values";
import { toast } from "sonner";
import { updateUserAction } from "../auth/action";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(60, { message: "First name must not be longer than 30 characters." }),
  username: z.string().optional(),
  email: z.email().optional(),
  phone_number: z.string().optional(),
  photo: z.string().optional(),
});

export type IProfileUpdateForm = z.infer<typeof profileFormSchema>;
export type IProfileUpdateFormServer = Partial<
  z.infer<typeof profileFormSchema>
>;

export function ProfileForm() {
  const { user, refetch } = useAuth();
  const [isPending, startTransition] = useTransition();

  const form = useForm<IProfileUpdateForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      username: user?.name ?? "",
      email: user?.email ?? "",
      phone_number: user?.phone ?? "",
      photo: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: IProfileUpdateForm) => {
    const { email, username, photo, name, phone_number } = data;
    const sanitized = removeNullableValues(data);
    console.log(data);
    startTransition(async () => {
      const result = await updateUserAction({ name, phone: phone_number });
      console.log("Profile update result:", result);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success("Profile updated successfully!");
      refetch();
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset className="space-y-8" disabled={isPending}>
        <FieldGroup>
          {/* Profile Picture */}
          <Controller
            control={form.control}
            name="photo"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Profile Picture</FieldLabel>
                <Input
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
                  <Input
                    id={field.name}
                    placeholder="Name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
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
                  <Input
                    id={field.name}
                    placeholder="User Name"
                    {...field}
                    disabled
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Email (disabled) */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  placeholder="Email"
                  {...field}
                  disabled
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    You cannot change your email address.
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          {/* Mobile Number */}
          <Controller
            control={form.control}
            name="phone_number"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel required htmlFor={field.name}>
                  Mobile Number
                </FieldLabel>
                <Input
                  id={field.name}
                  placeholder="01*********"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
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
          <Field>
            <Button
              type="submit"
              size="sm"
              className="ml-auto"
              disabled={isPending}
            >
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
