import { Badge } from "../ui/badge";

export default function RecommendMessages() {
  return (
    <div className="my-2 flex space-x-2">
      <Badge variant={"secondary"}>Top 10 Meme Coin</Badge>
      <Badge variant={"secondary"}>Tokens Top Today</Badge>
      <Badge variant={"secondary"}>Top Smart Wallets in 7 days</Badge>
      <Badge variant={"secondary"}>Check balance</Badge>
    </div>
  );
}
