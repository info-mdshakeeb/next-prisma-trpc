import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderSidebarTrigger,
  Main,
  NavUser,
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
    <Wrapper>
      <Header fixed>
        <HeaderSidebarTrigger showSeparator />

        <HeaderContent>
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
          <NavUser />
        </HeaderActions>
      </Header>

      <Main className="">
        <div className="h-screen">
          <div className="flex w-full justify-between">asdasdasdas</div>
        </div>
        <div className="h-screen">
          <div className="flex w-full justify-between">
            asdasdasdas
            <span>asdasdas</span>
          </div>
        </div>
      </Main>
    </Wrapper>
  );
}
