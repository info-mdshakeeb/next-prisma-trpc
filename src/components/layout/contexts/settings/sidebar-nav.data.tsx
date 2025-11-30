import { UserRound, Wrench } from "lucide-react";

export const sidebarNavItems = [
  {
    title: "Profile",
    icon: UserRound,
    href: "/dashboard/settings",
    module: "profile",
  },
  {
    title: "Account",
    icon: Wrench,
    href: "/dashboard/settings/account",
    module: "account",
  },
];
