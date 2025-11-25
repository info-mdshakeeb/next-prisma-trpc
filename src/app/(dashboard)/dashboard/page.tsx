import {
  GlobalSearch,
  Header,
  Main,
  ModeSwitcher,
  ProfileDropdown,
} from "@/components/layout";

export default async function Page() {
  // await requireAuth();
  return (
    <>
      <Header>
        <GlobalSearch />
        <div className="ms-auto flex items-center space-x-4">
          <ModeSwitcher />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className=""></Main>
    </>
  );
}
