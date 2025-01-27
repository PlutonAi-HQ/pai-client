"use client";

import CodeBlock from "../common/code-block";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import agentAvatar from "@/assets/images/agent-avatar.webp";
import { useConversation } from "@/hooks/use-conversation";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Key, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export default function ConversationBox() {
  const { conversation, answeringText, isThinking, isAnswering } =
    useConversation();

  const { data: session } = useSession();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [answeringText]);

  return (
    <div className="z-10 mx-auto w-full max-w-7xl flex-grow space-y-4 overflow-y-auto rounded-md">
      {conversation.map((msg, index) => (
        <div
          key={index}
          className={cn("flex w-full", msg.role === "user" && "justify-end")}>
          <div
            className={cn(
              "flex w-full max-w-full items-start space-x-2",
              msg.role === "user" && "justify-end",
            )}>
            {/* Agent avatar */}
            {msg.role === "assistant" && (
              <Image
                src={agentAvatar.src}
                alt="agent avt"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col items-end space-y-2">
              {/* Input Image */}
              {msg.images && msg.images?.length > 0 && (
                <div className="flex gap-2">
                  {msg.images.map((image: string, key: Key) => (
                    <Image
                      key={key}
                      src={image}
                      alt={"User Input Image"}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  ))}
                </div>
              )}

              {/* Message */}
              <div
                ref={messagesEndRef}
                className={cn(
                  "rounded-lg px-4 py-2",
                  msg.role === "user" && "bg-black/50",
                  msg.role === "assistant" &&
                    "bg-gradient-to-r from-cyan-400/20 to-cyan-200/20 backdrop-blur",
                )}>
                {msg.role === "assistant" && (
                  <Markdown
                    components={{
                      code: CodeBlock,
                    }}
                    // remarkPlugins={[remarkGfm, remarkHtml]}
                    // rehypePlugins={[rehypeRaw]}
                    className={
                      "w-full max-w-[90%] overflow-x-auto whitespace-normal"
                    }>
                    {msg.content}
                  </Markdown>
                )}
                <p className="w-full max-w-full">
                  {msg.role === "user" && msg.content}
                </p>
              </div>
            </div>
            {/* User avatar */}
            {msg.role === "user" && (
              <Avatar>
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback>
                  {getInitials(session?.user?.name as string)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      ))}
      {isThinking && (
        <div className="flex items-start justify-start gap-2">
          <Image
            src={agentAvatar.src}
            alt="agent avt"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div
            className={
              "w-max max-w-[80%] rounded-lg bg-gradient-to-r from-cyan-400/20 to-cyan-200/20 px-4 py-2 backdrop-blur"
            }>
            <Markdown
              components={{
                code: CodeBlock,
              }}
              remarkPlugins={[remarkGfm, remarkHtml]}
              className={"w-full max-w-full"}>
              Agent is thinking....
            </Markdown>
          </div>
        </div>
      )}
      {isAnswering && (
        <div className="flex items-start justify-start gap-2">
          <Image
            src={agentAvatar.src}
            alt="agent avt"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div
            className={
              "w-max max-w-[80%] rounded-lg bg-gradient-to-r from-cyan-400/20 to-cyan-200/20 px-4 py-2 backdrop-blur"
            }>
            <Markdown
              components={{
                code: CodeBlock,
              }}
              remarkPlugins={[remarkGfm, remarkHtml]}
              className={"w-full max-w-full"}>
              {answeringText}
            </Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
