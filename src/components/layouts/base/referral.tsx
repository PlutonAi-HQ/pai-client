"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/configs/env.config";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";
import { CopyIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function Referral() {
  const { data: session } = useSession();

  const { copy } = useClipboard();

  const { toast } = useToast();

  const handleCopyReferralClick = useCallback(async () => {
    if (session?.referral?.code) {
      await copy(`${BASE_URL}?ref=${session?.referral?.code}`);
      toast({ description: "Copied referral code to clipboard!" });
    }
  }, [session, copy, toast]);

  if (!session || !session?.referral) return;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <p>Referral:</p>
        <p className="text-yellow-600">{session.referral.code}</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={handleCopyReferralClick}>
          <CopyIcon />
        </Button>
      </div>
      <Badge
        variant={"secondary"}
        className="space-x-2">
        <p>Invited:</p>
        <p className="text-[#3FCBFA]">{session.referral.total_used}</p>
      </Badge>
    </div>
  );
}
