import LoginButton from "@/components/common/login-button";
import Logo from "@/components/common/logo";
// import WalletButton from "@/components/common/wallet-button";
import { Badge } from "@/components/ui/badge";
import { HeartIcon } from "lucide-react";

export default function BaseHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 flex h-20 items-center justify-between px-4 py-5">
      <div className="flex items-center space-x-3">
        <Logo />
        <Badge variant={"secondary"}>beta</Badge>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center gap-2 rounded-md border border-yellow-500 bg-gradient-to-b from-yellow-400/60 via-yellow-500/40 via-30% to-yellow-600/20 p-2 text-sm text-yellow-500 backdrop-blur">
          100 Point <HeartIcon className="size-4 fill-yellow-500" />
        </button>
        {/* <WalletButton /> */}
        <LoginButton />
      </div>
    </header>
  );
}
