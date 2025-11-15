import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to the Home Page
        </h1>
        {session ? (
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Logged in as {session.user?.email}
          </p>
        ) : (
          <p className="text-lg text-gray-700 dark:text-gray-300">
            You are not logged in.
          </p>
        )}
      </div>
    </div>
  );
}
