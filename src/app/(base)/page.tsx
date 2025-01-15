"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Strong } from "@/components/ui/typography";
import { SendHorizontalIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const temp =
  "https://s3-alpha-sig.figma.com/img/c96b/3e70/14cd0204f623b569cf511420946d94bd?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RMhTl-vyh4tapeM2hI2bgQf9Dvyr2e2dZ5x1qEOC48XbrOl5PFdnAbKYzPzvQBGFTfq83YcLcSMOZ9hGP7MwKEPf92WsvShH62jDjfB1-cZhnaJYyLHfuw1tGroh4VAmLP2iiWwLE6gJFwq6zH02yZZeys-yhpPUp5fAdeuGpp7BRveaGSRPcYQVwrwCxM8gQIJrZH6BpZunK3ViNhr88q985BDbgYiVpcGXXT1tP7nMCNsx4~skf1riuWk-6DTsqVjgJlfuVGOG5obrjs~-kT6ANrEo3gljebx6hW0BGwkARXmwCynSi~HlXod~llAqBZOBLi7GsDwaXqxLRDvhRw__";

type FormValue = {
  message: string;
};

export default function Home() {
  const { register, handleSubmit, resetField } = useForm<FormValue>();
  const onSubmit = handleSubmit(async (data: FormValue) => {
    const sessionId = "s-1234567890";
    const userId = "u-1234567890";

    const payload = {
      message: data.message,
      session_id: sessionId,
      images: [],
      user_id: userId,
    };

    console.log(payload);

    try {
      const serverUri = `${process.env.NEXT_PUBLIC_SERVER_URL}/agent/call`;
      if (!serverUri) {
        throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");
      }
      const response = await fetch(serverUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(response);

      // if (!response.ok) {
      //   throw new Error("Failed to send message");
      // }

      // const responseData = await response.json();
      // console.log("Response from API:", responseData);

      resetField("message");
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send message");
    }
  });

  return (
    <div
      className={`flex h-[calc(100svh-80px)] flex-col justify-between gap-2 rounded-xl bg-black/60 p-4`}
      style={{
        backgroundImage: `url(${temp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "soft-light",
      }}>
      <div className="flex items-center space-x-3">
        <SidebarTrigger />
        <Button>New chat</Button>
      </div>
      <div className="mx-auto w-full max-w-191 overflow-y-auto">
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
      <div className="mx-auto w-full max-w-191">
        <Strong className="mb-1 text-2xl font-semibold">What can I help with?</Strong>
        <div className="my-2 flex space-x-2">
          <Badge variant={"secondary"}>Top 10 Meme Coin</Badge>
          <Badge variant={"secondary"}>Tokens Top Today</Badge>
          <Badge variant={"secondary"}>Top Smart Wallets in 7 days</Badge>
          <Badge variant={"secondary"}>Check balance</Badge>
        </div>
        <form
          onSubmit={onSubmit}
          className="mb-6 flex items-center rounded-xl border bg-black/50 p-1 backdrop-blur">
          <Textarea
            {...register("message")}
            rows={1}
            placeholder="Message PlutonAI"
            className="resize-none rounded-xl border-none py-0 placeholder:self-center focus-visible:ring-0"
          />
          <Button
            type="submit"
            variant={"ghost"}>
            <SendHorizontalIcon className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
