"use client";

import Link from "next/link";

import { useAuth } from "@/components/providers/auth-provider";
import { SignOutDialog } from "@/components/sign-out-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDialogState from "@/hooks/use-dialog-state";

export function ProfileDropdown() {
  const [open, setOpen] = useDialogState();
  const { user, authLoading } = useAuth();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="relative h-8 w-8 rounded-full"
            disabled={authLoading}
          >
            <Avatar className="h-8 w-8 bg-background">
              {authLoading ? (
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
              ) : (
                <>
                  <AvatarImage
                    src={user?.image || "/avatars/01.png"}
                    alt={user?.name}
                  />
                  <AvatarFallback className="bg-background">
                    {user?.name?.slice(0, 2)}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1.5">
              {authLoading ? (
                <>
                  <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-40 rounded bg-muted animate-pulse" />
                </>
              ) : (
                <>
                  <p className="text-sm leading-none font-medium">
                    {user?.name}
                  </p>
                  <p className="text-muted-foreground text-xs leading-none">
                    {user?.email}
                  </p>
                </>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setOpen(true)}>
            Sign out
            <DropdownMenuShortcut className="text-current">
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  );
}
