"use client";

import MarkdownFormat from "../common/markdown-format";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import agentAvatar from "@/assets/svgs/agent-avatar.svg";
import { useConversation } from "@/hooks/use-conversation";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Key, useEffect, useRef } from "react";

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

  if (conversation.length === 0) return;

  return (
    <div className="z-10 mx-auto w-full max-w-7xl flex-grow space-y-4 divide-y-2 divide-white/30 overflow-y-auto rounded-xl bg-black p-6">
      {conversation?.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "relative flex w-full max-w-full items-center space-x-4 pb-2 pt-6 first:pt-0",
            msg.role === "user" && "justify-end",
          )}>
          {/* Agent avatar */}
          {msg.role === "assistant" && (
            <Image
              src={agentAvatar}
              alt="agent avt"
              width={40}
              height={40}
              className="sticky top-0 self-start rounded-full"
            />
          )}
          <div className="flex flex-grow flex-col items-end space-y-2">
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
              className={cn(
                "flex w-full",
                msg.role === "user" && "justify-end",
              )}>
              {msg.role === "assistant" && (
                <MarkdownFormat>{msg.content}</MarkdownFormat>
              )}
              <p className="w-fit">{msg.role === "user" && msg.content}</p>

              {/* This component used to scroll to current generating message */}
            </div>
          </div>
          {/* User avatar */}
          {msg.role === "user" && (
            <Avatar className="sticky top-0 self-start rounded-full">
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>
                {getInitials(session?.user?.name as string)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      {isThinking && (
        <div
          ref={messagesEndRef}
          className="flex items-center justify-start space-x-4 pb-2 pt-6">
          <Image
            src={agentAvatar.src}
            alt="agent avt"
            width={40}
            height={40}
            className="sticky top-0 self-start rounded-full"
          />
          <MarkdownFormat>Agent is thinking....</MarkdownFormat>
        </div>
      )}
      {isAnswering && (
        <div className="flex items-center justify-start space-x-4 pb-2 pt-6">
          <Image
            src={agentAvatar.src}
            alt="agent avt"
            width={40}
            height={40}
            className="sticky top-0 self-start rounded-full"
          />
          <MarkdownFormat>{answeringText}</MarkdownFormat>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
