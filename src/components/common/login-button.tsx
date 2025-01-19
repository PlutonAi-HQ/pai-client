"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { getInitials } from "@/utils";
import { LoaderCircleIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>
              {getInitials(session?.user?.name as string)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant={"destructive"}
              onClick={() => signOut()}
              className="w-full">
              Log out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  if (status === "unauthenticated") {
    return <Button onClick={() => signIn()}>Sign in</Button>;
  }

  if (status === "loading") {
    return (
      <Button disabled>
        <LoaderCircleIcon className="size-4 animate-spin" />
        Signing in
      </Button>
    );
  }
}
