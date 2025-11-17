import { SidebarTrigger } from "@/components/ui/sidebar";
import { TextAlignStart } from "lucide-react";
import Logo from "../../core/logo";
import { ModeSwitcher } from "../../core/mood-switcher";
import { Header, HeaderActions, HeaderContent } from "./header";
import { ProfileDropdown } from "./profile-dropdown";
import { Search } from "./search";

export default function AppHeader() {
  return (
    <header className="bg-sidebar sticky top-0 z-50 flex w-full items-center h-(--header-height) ">
      <Header className=" pl-6 bg-transparent w-full">
        <HeaderContent className="">
          <div className="flex items-center gap-2  min-w-[207px]">
            <div className="md:hidden flex">
              <SidebarTrigger
                variant="ghost"
                className=""
                size={"icon"}
                icon={<TextAlignStart className="size-5" />}
              />
              <span
                aria-hidden="true"
                className="text-gray-300 w-4 min-w-4 select-none text-center text-lg  block"
              >
                /
              </span>
            </div>

            <a href="#" className="flex items-center gap-2">
              <Logo className="size-5" />
            </a>
            <span
              aria-hidden="true"
              className="text-gray-300 w-4 min-w-4 select-none text-center text-lg hidden md:block"
            >
              /
            </span>
          </div>
          <Search className="hidden md:flex" />
        </HeaderContent>
        <HeaderActions>
          <ModeSwitcher />
          <ProfileDropdown />
        </HeaderActions>
      </Header>
    </header>
  );
}
