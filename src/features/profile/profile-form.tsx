"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/components/providers/auth-provider";
import { removeNullableValues } from "@/lib/remove-nullable-values";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(60, { message: "First name must not be longer than 30 characters." }),
  username: z.string().optional(),
  email: z.email().optional(),
  phone_number: z.string().min(1, "Phone number is required"),
  photo: z.string().optional(),
});

export type IProfileUpdateForm = z.infer<typeof profileFormSchema>;
export type IProfileUpdateFormServer = Partial<
  z.infer<typeof profileFormSchema>
>;

export function ProfileForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<IProfileUpdateForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      username: user?.name ?? "",
      email: user?.email ?? "",
      phone_number: "",
      photo: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: IProfileUpdateForm) => {
    const sanitized = removeNullableValues(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-8" disabled={isPending}>
          {/* Profile Picture */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username Field (disabled) */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="User Name" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription>
            Your name will be displayed publicly. You can change this any time.
          </FormDescription>

          {/* Email Field (disabled) */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled />
                </FormControl>
                <FormDescription>
                  You cannot change your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mobile Number Field */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="01*********" {...field} />
                </FormControl>
                <FormDescription>
                  Your mobile number is used for account recovery and security.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              size="sm"
              className="ml-auto"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
