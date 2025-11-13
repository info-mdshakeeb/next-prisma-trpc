import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderSidebarTrigger,
  Main,
  ProfileDropdown,
  Search,
  Wrapper,
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
    <Wrapper fixed>
      <Header className="border-b-0!">
        <HeaderContent>
          <HeaderSidebarTrigger showSeparator />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </HeaderContent>

        <HeaderActions>
          <Search className="" />
          <ProfileDropdown />
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
    </Wrapper>
  );
}
