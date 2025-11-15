import Link from "next/link";

import Logo from "@/components/layout/core/logo";
import { FieldDescription } from "@/components/ui/field";
import { LoginForm } from "@/features/auth/forms/login.form";
import { requireUnAuth } from "@/lib/auth-utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function page(props: PageProps<"/login">) {
  await requireUnAuth();

  const { callback } = await props.searchParams;

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
          <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
          <FieldDescription>
            Don&apos;t have an account? <Link href={`/register`}>Register</Link>
          </FieldDescription>
        </div>

        {/* //! FORM */}
        <LoginForm callback={callback} />

        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
}
