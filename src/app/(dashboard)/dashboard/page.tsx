import {
  Header,
  Main,
  ModeSwitcher,
  ProfileDropdown,
  SearchExpand,
} from "@/components/layout";

import { requireAuth } from "@/lib/auth-utils";

export default async function Page() {
  await requireAuth();
  return (
    <>
      <Header fixed>
        <SearchExpand />
        <div className="ms-auto flex items-center space-x-4">
          <ModeSwitcher />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className="">
        <div className="h-screen ">
          <div className="flex w-full justify-between"></div>
        </div>

        <ul className="flex max-w-2xl mx-auto w-full h-full gap-4 items-center justify-center"></ul>
        <div className="h-screen">
          <div className="flex w-full justify-between"></div>
        </div>
      </Main>
    </>
  );
}
