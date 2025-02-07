"use client";

import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import { formatWalletAddress } from "@/utils";
import { CopyIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function WalletAddress() {
  const { data: session } = useSession();

  const { copy } = useClipboard();

  const { toast } = useToast();

  const handleCopyReferralClick = useCallback(async () => {
    if (session?.referral?.code) {
      await copy(session?.wallet.public_key);
      toast({ description: "Copied wallet address to clipboard!" });
    }
  }, [session, copy, toast]);

  if (!session || !session?.wallet) return;

  return (
    <div className="mr-4 hidden items-center space-x-1 md:flex">
      <p>Wallet Address:</p>
      <p className="text-yellow-600">
        {formatWalletAddress(session.wallet.public_key)}
      </p>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="size-7"
        onClick={handleCopyReferralClick}>
        <CopyIcon />
      </Button>
    </div>
  );
}
