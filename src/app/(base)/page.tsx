"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Strong } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { SendHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark, nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const temp =
  "https://s3-alpha-sig.figma.com/img/c96b/3e70/14cd0204f623b569cf511420946d94bd?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RMhTl-vyh4tapeM2hI2bgQf9Dvyr2e2dZ5x1qEOC48XbrOl5PFdnAbKYzPzvQBGFTfq83YcLcSMOZ9hGP7MwKEPf92WsvShH62jDjfB1-cZhnaJYyLHfuw1tGroh4VAmLP2iiWwLE6gJFwq6zH02yZZeys-yhpPUp5fAdeuGpp7BRveaGSRPcYQVwrwCxM8gQIJrZH6BpZunK3ViNhr88q985BDbgYiVpcGXXT1tP7nMCNsx4~skf1riuWk-6DTsqVjgJlfuVGOG5obrjs~-kT6ANrEo3gljebx6hW0BGwkARXmwCynSi~HlXod~llAqBZOBLi7GsDwaXqxLRDvhRw__";

type FormValue = {
  message: string;
};

export default function Home() {
  const { register, handleSubmit, resetField } = useForm<FormValue>();
  const [conversation, setConversation] = useState<{ role: "user" | "agent"; message: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [answeringText, setAnsweringText] = useState<string | null>(null);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [answeringText]);

  const onSubmit = handleSubmit(async (data: FormValue) => {
    resetField("message");
    setConversation((prev) => [...prev, { role: "user", message: data.message }]);
    setIsLoading(true);

    const sessionId = "s-1234567890";
    const userId = "u-1234567890";

    const payload = {
      message: data.message,
      session_id: sessionId,
      images: [],
      user_id: userId,
    };

    try {
      const serverUri = `${process.env.NEXT_PUBLIC_SERVER_URI}/agent/call`;
      if (!serverUri) {
        throw new Error("SERVER_URI is not defined");
      }

      const response = await fetch(serverUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      setIsLoading(false);
      setIsAnswering(true);
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get reader from response body.");
      }

      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const chunkArray = chunk.split("\n");

        const handledChunkArray: { event: string; data: string[] } = { event: "", data: [] };
        chunkArray.forEach((line) => {
          if (line.startsWith("event: ")) {
            handledChunkArray.event = line.replace("event: ", "");
          } else if (line.startsWith("data:")) {
            handledChunkArray.data.push(line.replace(/^data: /, ""));
          } else handledChunkArray.data.push(line);
        });

        if (handledChunkArray.event === "token") {
          result += handledChunkArray.data.filter((str) => str.trim() !== "").join("\n");
        } else {
          result = handledChunkArray.data.join("\n");
        }
        setAnsweringText(result);
      }
      setIsAnswering(false);
      setAnsweringText(null);
      setConversation((prev) => [...prev, { role: "agent", message: result }]);
    } catch (error) {
      console.error("Error:", error);
      setConversation((prev) => [
        ...prev,
        { role: "agent", message: "Failed to get response. Try again in 1 minutes" },
      ]);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div
      className={`flex h-[calc(100svh-80px)] flex-col justify-between gap-2 rounded-xl bg-black/70 p-4`}
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
      <div className="mx-auto w-full max-w-191 flex-grow space-y-4 overflow-y-auto">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={cn("flex w-full", msg.role === "user" && "justify-end")}>
            <div className={cn("max-w-[90%]", msg.role === "user" && "rounded-lg bg-black/50 px-4 py-2")}>
              <Markdown
                components={{
                  code: (props) => {
                    const { children, className, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        style={nord}
                        PreTag="div"
                        customStyle={{
                          borderRadius: "12px",
                          backgroundColor: "#000000cc",
                          color: "white",
                          textShadow: "none",
                          textDecoration: "none",
                          margin: "4px 0",
                        }}
                        language={match[1]}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        {...rest}
                        className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
                remarkPlugins={[remarkGfm, remarkHtml]}
                className={"w-full max-w-full"}>
                {msg.message}
              </Markdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <Markdown
            remarkPlugins={[remarkGfm, remarkHtml]}
            className={"w-full max-w-full"}>
            Agent is typing...
          </Markdown>
        )}
        {isAnswering && (
          <div ref={messagesEndRef}>
            <Markdown
              components={{
                code: (props) => {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={dark}
                      PreTag="div"
                      language={match[1]}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      {...rest}
                      className={className}>
                      {children}
                    </code>
                  );
                },
              }}
              remarkPlugins={[remarkGfm, remarkHtml]}
              className={"w-full max-w-full"}>
              {answeringText}
            </Markdown>
          </div>
        )}
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
          <Input
            {...register("message")}
            placeholder="Message PlutonAI"
            className="resize-none rounded-xl border-none py-0 placeholder:self-center focus-visible:ring-0"
          />
          <Button
            type="submit"
            size={"icon"}
            variant={"ghost"}>
            <SendHorizontalIcon className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
