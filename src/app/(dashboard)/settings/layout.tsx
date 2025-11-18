import { Metadata } from "next";

import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderSidebarTrigger,
  Main,
} from "@/components/layout";
import SidebarNav from "@/components/layout/contexts/settings/sidebar-nav";

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
      <Header className="border-b">
        <HeaderContent>
          <HeaderSidebarTrigger showSeparator className="hidden md:flex" />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden lg:block">
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <LinkLoadingIndicator title="Home" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden lg:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
          <p className="text-xl sm:text-[27px] font-bold tracking-tight text-foreground">
            Settings
          </p>
        </HeaderContent>
        <HeaderActions>
          <aside className="lg:hidden">
            <SidebarNav />
          </aside>
        </HeaderActions>
      </Header>

      <Main fixed fluid>
        <div className="flex flex-1 overflow-hidden gap-3 ">
          <div className="top-0 hidden lg:flex  lg:sticky lg:w-1/5  ">
            <SidebarNav />
          </div>
          <div className="overflow-scroll flex-1 h-[calc(100vh-7.6rem)]">
            {children}
          </div>
        </div>
      </Main>
    </>
  );
}
