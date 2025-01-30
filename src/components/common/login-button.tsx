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
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/utils";
import { CopyIcon, LoaderCircleIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const { copy } = useClipboard();
  const { toast } = useToast();

  const handleCopyWalletClick = async () => {
    if (session?.wallet?.public_key) {
      await copy(session?.wallet?.public_key);
      toast({ description: "Copied wallet address to clipboard!" });
    }
  };

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
        <DropdownMenuContent className="max-w-xs">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Wallet</DropdownMenuLabel>
            <DropdownMenuItem>
              <p className="w-full truncate">{session?.wallet?.public_key}</p>
              <CopyIcon
                className="cursor-pointer"
                onClick={handleCopyWalletClick}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>

          {/* <DropdownMenuSeparator /> */}

          {/* <DropdownMenuGroup>
            <DropdownMenuLabel>Referral</DropdownMenuLabel>
            <DropdownMenuItem disabled>
              <p>Invited: {session.referral.total_used}</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <p className="w-full truncate">Code: {session?.referral?.code}</p>
              <CopyIcon
                className="cursor-pointer"
                onClick={handleCopyReferralClick}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup> */}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="font-bold text-red-500"
            onClick={() => signOut()}>
            Log out
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
