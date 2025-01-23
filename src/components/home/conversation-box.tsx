"use client";

import CodeBlock from "../common/code-block";
import agentAvatar from "@/assets/images/agent-avatar.webp";
import { useConversation } from "@/hooks/use-conversation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { Key, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export default function ConversationBox() {
  const { conversation, answeringText, isThinking, isAnswering } =
    useConversation();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [answeringText]);

  if (conversation.length === 0) return null;

  return (
    <motion.div
      initial={{ flexGrow: 0, height: "0px", opacity: 0 }}
      animate={{ flexGrow: 1, height: "auto", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-191 flex-grow space-y-4 overflow-y-auto rounded-md">
      {conversation.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "flex w-full flex-col gap-2",
            msg.role === "user" && "items-end",
          )}>
          {msg.images && (
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
          <div className="flex items-start justify-start gap-2">
            {msg.role === "agent" && (
              <Image
                src={agentAvatar.src}
                alt="agent avt"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div
              className={cn(
                "w-max rounded-lg px-4 py-2",
                msg.role === "user" && "max-w-[90%] bg-black/50",
                msg.role === "agent" &&
                  "max-w-[80%] bg-gradient-to-r from-cyan-400/20 to-cyan-200/20 backdrop-blur",
              )}>
              {msg.role === "agent" && (
                <Markdown
                  components={{
                    code: CodeBlock,
                  }}
                  remarkPlugins={[remarkGfm, remarkHtml]}
                  className={"w-full max-w-full"}>
                  {msg.content}
                </Markdown>
              )}
              {msg.role === "user" && msg.content}
            </div>
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
    </motion.div>
  );
}
