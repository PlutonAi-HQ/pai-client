import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Strong } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="flex h-[calc(100svh-80px)] flex-col justify-between rounded-xl bg-slate-200 p-4">
      <div className="flex items-center space-x-3">
        <SidebarTrigger />
        <Button>New chat</Button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
        <p>Temp</p>
      </div>
      <div>
        <Strong className="mb-1 text-2xl">What can I help with?</Strong>
        <div className="my-2 flex space-x-2">
          <Badge>Top 10 Meme Coin</Badge>
          <Badge>Tokens Top Today</Badge>
          <Badge>Top Smart Wallets in 7 days</Badge>
          <Badge>Check balance</Badge>
        </div>
        <Textarea rows={1} />
      </div>
    </div>
  );
}
