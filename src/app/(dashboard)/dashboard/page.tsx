import {
  Header,
  Main,
  ModeSwitcher,
  ProfileDropdown,
  Search,
} from "@/components/layout";
import { requireAuth } from "@/lib/auth-utils";

export default async function Page() {
  await requireAuth();
  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ModeSwitcher />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className="">
        <div className="h-screen ">
          <div className="flex w-full justify-between"></div>
        </div>
        <div className="h-screen">
          <div className="flex w-full justify-between"></div>
        </div>
      </Main>
    </>
  );
}
