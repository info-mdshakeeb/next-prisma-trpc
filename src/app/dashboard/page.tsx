import {
  Header,
  HeaderContent,
  HeaderSidebarTrigger,
  Main,
} from "@/components/layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {
  return (
    <>
      <Header className="pt-2 bg-background/10 backdrop-blur-sm">
        <HeaderContent>
          <HeaderSidebarTrigger showSeparator className="hidden md:flex" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden lg:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden lg:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
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
