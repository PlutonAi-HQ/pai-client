"use client";

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export default function WalletButton() {
  const { setVisible: setModalVisible } = useWalletModal();
  const { connected, connecting, disconnect, disconnecting, publicKey, wallet } = useWallet();
  const { toast } = useToast();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleDisconnect = useCallback(() => {
    setOpenMenu(false);
    disconnect().catch((error) => console.error("Disconnection Error:", error));
  }, [disconnect]);

  const onClick = useCallback(() => {
    if (!connected) {
      setModalVisible(true);
    } else {
      setOpenMenu(true);
    }
  }, [connected, setModalVisible]);

  const buttonContent = useMemo(() => {
    if (connecting) return "Connecting...";
    if (disconnecting) return "Disconnecting...";
    if (!connected) return "Connect Wallet";
    if (!wallet) return "No Wallet";

    const address = publicKey?.toBase58();
    const shortenAddress = address ? `${address.slice(0, 4)}..${address.slice(-4)}` : "N/A";

    return (
      <span className="flex items-center gap-2">
        {shortenAddress}
        {wallet.adapter.icon && (
          <Image
            src={wallet.adapter.icon}
            alt={`${wallet.adapter.name} Icon`}
            width={20}
            height={20}
          />
        )}
      </span>
    );
  }, [connected, connecting, disconnecting, publicKey, wallet]);

  return (
    <DropdownMenu open={openMenu}>
      <DropdownMenuTrigger>
        <Button
          variant={"secondary"}
          onClick={onClick}>
          {buttonContent}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-4 p-6">
        <DropdownMenuLabel>Referral Link:</DropdownMenuLabel>
        <Button
          onClick={() => toast({ title: "Copied referral link" })}
          variant={"outline"}
          className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-400 bg-clip-text font-bold text-transparent">
          plutonai.io/ref=f123jfsdl...
          <CopyIcon className="size-5" />
        </Button>
        <Button
          variant={"secondary"}
          onClick={handleDisconnect}>
          Disconnect Wallet
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
