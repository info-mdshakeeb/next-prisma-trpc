import {
  Header,
  HeaderActions,
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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Header className="bg-background/10 backdrop-blur-sm ">
        <HeaderContent>
          <HeaderSidebarTrigger showSeparator className="hidden md:flex" />
          <Breadcrumb>
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
          </Breadcrumb>
        </HeaderContent>
        <HeaderActions>
          <Button size={"sm"} variant={"outline"}>
            New User
          </Button>
        </HeaderActions>
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
