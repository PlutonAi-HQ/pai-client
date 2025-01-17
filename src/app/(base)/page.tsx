import backgroundImage from "@/assets/images/background-image.png";
import ConversationBox from "@/components/home/conversation-box";
import UserInput from "@/components/home/user-input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div
      className={`flex h-[calc(100svh-80px)] flex-col justify-between gap-2 rounded-xl bg-black/70 p-4`}
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "soft-light",
      }}>
      <div className="flex items-center space-x-3">
        <SidebarTrigger />
        <Button variant={"secondary"}>New chat</Button>
      </div>
      <ConversationBox />
      <UserInput />
    </div>
  );
}
