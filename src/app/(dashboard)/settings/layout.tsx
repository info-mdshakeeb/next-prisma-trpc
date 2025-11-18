import { Metadata } from "next";

import {
  Header,
  Main,
  ModeSwitcher,
  ProfileDropdown,
  Search,
  SidebarNav,
} from "@/components/layout";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};
interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function layout({ children }: SettingsLayoutProps) {
  return (
    <>
      <Header>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ModeSwitcher />

          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1 ">{children}</div>
        </div>
      </Main>
    </>
  );
}
