import {
  GlobalSearch,
  Header,
  Main,
  ModeSwitcher,
  ProfileDropdown,
} from "@/components/layout";
import { requireAuth } from "@/lib/auth-utils";

export default async function page() {
  await requireAuth();
  return (
    <>
      <Header fixed>
        <GlobalSearch />
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
