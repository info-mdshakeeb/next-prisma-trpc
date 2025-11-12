import { Metadata } from "next";
import Link from "next/link";

import Logo from "@/components/layout/core/logo";
import { FieldDescription } from "@/components/ui/field";
import { RegisterForm } from "@/features/auth/forms/register.form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default async function page() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link
            href="#"
            className="flex flex-col items-center gap-2 font-medium"
          >
            <div className="flex size-8 items-center justify-center rounded-md">
              <Logo className="size-8" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </Link>
          <h1 className="text-xl font-bold">Create your account</h1>
          <FieldDescription>
            Already have an account? <Link href="/login">Log in</Link>
          </FieldDescription>
        </div>

        {/* //! FORM */}
        <RegisterForm />

        <FieldDescription className="px-6 text-center">
          By creating an account, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </div>
  );
}
