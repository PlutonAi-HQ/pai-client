import backgroundImage from "@/assets/images/background-image.webp";
import AgentQuote from "@/components/home/agent-quote";
import ConversationBox from "@/components/home/conversation-box";
import ConversationMenu from "@/components/home/conversation-menu";
import Suggestions from "@/components/home/suggestion";
import UserInput from "@/components/home/user-input";
import { SERVER_URL } from "@/configs/env.config";
import { getServerSession } from "next-auth";

export default async function Home(props: {
  searchParams: Promise<{ ref: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const session = await getServerSession();

  console.log(session);

  if (searchParams.ref && session) {
    try {
      await fetch(`${SERVER_URL}/ref/use`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ ref_code: searchParams.ref }),
      });
    } catch (error) {
      throw new Error("Failed to submit referral code");
    }
  }

  return (
    <div
      className={`relative flex h-[calc(100svh-4rem)] flex-col justify-between gap-2 rounded-xl p-4`}
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 4px 4px 0 #00000040",
      }}>
      <div className="absolute left-0 top-0 z-0 h-[calc(100svh-4rem)] w-full bg-gradient-to-t from-[#121212] to-transparent" />
      <ConversationMenu />
      <ConversationBox />
      <div className="z-10">
        <AgentQuote />
        <Suggestions />
        <UserInput />
      </div>
    </div>
  );
}
