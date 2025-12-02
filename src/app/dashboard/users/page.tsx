import {
  GlobalSearch,
  Header,
  Main,
  ModeSwitcher,
  ProfileDropdown,
} from "@/components/layout";
import { UsersTable } from "@/features/users/components/user-table";
import { UsersProvider } from "@/features/users/components/users-provider";

export default function page() {
  return (
    <>
      <UsersProvider>
        <Header fixed>
          <GlobalSearch />
          <div className="ms-auto flex items-center space-x-4">
            <ModeSwitcher />
            <ProfileDropdown />
          </div>
        </Header>

        <Main className="flex flex-1 flex-col gap-4 sm:gap-6 pb-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">User List</h2>
              <p className="text-muted-foreground">
                Manage your users and their roles here.
              </p>
            </div>
            {/* <UsersPrimaryButtons /> */}
          </div>
          <UsersTable />
        </Main>

        {/* <UsersDialogs /> */}
      </UsersProvider>
    </>
  );
}
