import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Strong } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { formatToPercentage } from "@/utils";
import { BitcoinIcon } from "lucide-react";
import { FC, Key, SVGAttributes } from "react";

type Token = {
  icon: FC<SVGAttributes<SVGSVGElement>>;
  amount: number;
  pnlPercentage: number;
  pnlUsd: number;
  symbol: string;
};

const tokenList: Token[] = [
  {
    icon: BitcoinIcon,
    amount: 1234567,
    pnlPercentage: 5.3,
    pnlUsd: 65000,
    symbol: "LST",
  },
  {
    icon: BitcoinIcon,
    amount: 987654,
    pnlPercentage: -3.2,
    pnlUsd: -32000,
    symbol: "JITO",
  },
  {
    icon: BitcoinIcon,
    amount: 25000,
    pnlPercentage: 12.8,
    pnlUsd: 3200,
    symbol: "INF",
  },
  {
    icon: BitcoinIcon,
    amount: 0.075,
    pnlPercentage: -1.8,
    pnlUsd: -15,
    symbol: "BTC",
  },
  {
    icon: BitcoinIcon,
    amount: 320.5,
    pnlPercentage: 2.4,
    pnlUsd: 200,
    symbol: "SOL",
  },
];

export default function Portfolio() {
  return (
    <Sidebar
      side="right"
      collapsible="none"
      className="mt-20 h-[calc(100svh-80px)] px-2"
      variant="inset">
      <SidebarContent>
        <SidebarGroup className="items-start gap-2">
          <SidebarGroupLabel className="text-base font-bold text-foreground">
            Porfolio Invest:
          </SidebarGroupLabel>
          <Strong className="whitespace-nowrap bg-gradient-to-b from-cyan-400 to-cyan-100 to-60% bg-clip-text px-2 text-[40px] leading-[48px] text-transparent">
            $ {(1234567).toLocaleString()}
          </Strong>
          <Badge className="mx-2 bg-green-500 bg-opacity-10 text-green-500">
            +$200.41(23.41%)
          </Badge>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="items-start gap-2">
          <SidebarGroupLabel className="text-base font-bold text-foreground">
            Token List:
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tokenList.map((token: Token, key: Key) => (
                <SidebarMenuItem
                  key={key}
                  className="my-2 flex items-center">
                  <SidebarMenuButton className="p-2">
                    <token.icon className="box-content size-8 rounded-full bg-yellow-600 p-1 text-white" />
                    <div className="flex flex-col justify-between">
                      <p className="text-sm font-bold">
                        {token.amount} {token.symbol}
                      </p>
                      <p
                        className={cn(
                          "font-mono text-sm",
                          token.pnlUsd > 0 && "text-green-500",
                          token.pnlUsd < 0 && "text-red-500",
                        )}>
                        {token.pnlUsd > 0 && "+"}
                        {token.pnlUsd < 0 && "-"}
                        {Math.abs(token.pnlUsd).toLocaleString()}$
                      </p>
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuBadge
                    className={cn(
                      "bg-opacity-10",
                      token.pnlUsd > 0 && "bg-green-500 text-green-500",
                      token.pnlUsd < 0 && "bg-red-500 text-red-500",
                    )}>
                    {formatToPercentage(token.pnlPercentage)}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
