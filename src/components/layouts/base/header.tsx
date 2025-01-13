"use client";

import Logo from "@/components/common/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function BaseHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 flex h-20 items-center justify-between px-4 py-5">
      <div className="flex items-center space-x-3">
        <Logo />
        <Badge>beta</Badge>
      </div>
      <div className="flex items-center space-x-4">
        <Button>100 Point</Button>
        <Button>Tweet</Button>
        <WalletMultiButton />
      </div>
    </header>
  );
}
