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
import { BASE_URL } from "@/configs/env.config";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/utils";
import { CopyIcon, LoaderCircleIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback } from "react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const { copy } = useClipboard();
  const { toast } = useToast();

  const handleCopyWalletClick = useCallback(async () => {
    if (session?.wallet?.public_key) {
      await copy(session?.wallet?.public_key);
      toast({ description: "Copied wallet address to clipboard!" });
    }
  }, [copy, session?.wallet?.public_key, toast]);

  const handleCopyReferralClick = useCallback(async () => {
    if (session?.referral?.code) {
      await copy(`${BASE_URL}?ref=${session?.referral?.code}`);
      toast({ description: "Copied referral code to clipboard!" });
    }
  }, [session, copy, toast]);

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

          <DropdownMenuSeparator className="md:hidden" />

          <DropdownMenuGroup className="md:hidden">
            <DropdownMenuLabel>Wallet</DropdownMenuLabel>
            <DropdownMenuItem>
              <p className="w-full truncate">{session?.wallet?.public_key}</p>
              <CopyIcon
                className="cursor-pointer"
                onClick={handleCopyWalletClick}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="md:hidden" />

          <DropdownMenuGroup className="md:hidden">
            <DropdownMenuLabel>Referral</DropdownMenuLabel>
            <DropdownMenuItem disabled>
              <p>Invited: {session?.referral?.total_used}</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <p className="w-full truncate">
                Referral Code: {session?.referral?.code}
              </p>
              <CopyIcon
                className="cursor-pointer"
                onClick={handleCopyReferralClick}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>

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
