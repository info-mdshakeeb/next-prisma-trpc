import { requireUnAuth } from "@/lib/auth-utils";

export default async function page() {
  await requireUnAuth();
  return <div></div>;
}
