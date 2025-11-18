import {
  Header,
  Main,
  ModeSwitcher,
  ProfileDropdown,
  Search,
} from "@/components/layout";

export default function page() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ModeSwitcher />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="min-h-screen ">
          <div className="flex w-full justify-between "></div>
        </div>
        <div className="h-screen ">
          <div className="flex w-full justify-between"></div>
        </div>
      </Main>
    </>
  );
}
