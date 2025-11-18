import { Bell, Palette, UserRound, Wrench } from "lucide-react";

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
  {
    title: "Appearance",
    icon: Palette,
    href: "/dashboard/settings/appearance",
    module: "appearance",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/dashboard/settings/notifications",
    module: "notifications",
  },
];
