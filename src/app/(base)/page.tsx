import backgroundImage from "@/assets/images/background-image.webp";
import AgentQuote from "@/components/home/agent-quote";
import ConversationBox from "@/components/home/conversation-box";
import ConversationMenu from "@/components/home/conversation-menu";
import Suggestions from "@/components/home/suggestion";
import UserInput from "@/components/home/user-input";

export default function Home() {
  return (
    <div
      className={`flex h-[calc(100svh-4rem)] flex-col gap-2 rounded-xl p-4`}
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <ConversationMenu />
      <ConversationBox />
      <AgentQuote />
      <Suggestions />
      <UserInput />
    </div>
  );
}
