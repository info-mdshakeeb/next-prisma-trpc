import {
  Header,
  HeaderContent,
  HeaderSidebarTrigger,
  Main,
} from "@/components/layout";
import LinkLoadingIndicator from "@/components/loader/link-loading-indicator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function page() {
  return (
    <>
      <Header className="bg-background/10 backdrop-blur-sm">
        <HeaderContent>
          <HeaderSidebarTrigger showSeparator className="hidden md:flex" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden lg:block">
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">
                    <LinkLoadingIndicator title="Dashboard" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden lg:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </HeaderContent>
      </Header>

      <Main className="">
        <div className="h-screen">
          <div className="flex w-full justify-between"></div>
        </div>
        <div className="h-screen">
          <div className="flex w-full justify-between"></div>
        </div>
      </Main>
    </>
  );
}
