import { UserRound, Wrench } from "lucide-react";

export const sidebarNavItems = [
  {
    title: "Profile",
    icon: UserRound,
    href: "/settings",
    module: "profile",
  },
  {
    title: "Account",
    icon: Wrench,
    href: "/settings/account",
    module: "account",
  },
];
