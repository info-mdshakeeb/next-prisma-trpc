import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderSidebarTrigger,
  Main,
  ModeSwitcher,
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
      <Header className="">
        <HeaderContent>
          <HeaderSidebarTrigger showSeparator />
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

        <HeaderActions>
          <Search className="" />
          <ModeSwitcher />
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
