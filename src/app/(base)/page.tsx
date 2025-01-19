import backgroundImage from "@/assets/images/background-image.webp";
import ConversationBox from "@/components/home/conversation-box";
import ConversationMenu from "@/components/home/conversation-menu";
import UserInput from "@/components/home/user-input";

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
      <ConversationMenu />
      <ConversationBox />
      <UserInput />
    </div>
  );
}
