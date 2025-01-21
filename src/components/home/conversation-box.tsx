"use client";

import { useConversation } from "@/hooks/use-conversation";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
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

  return (
    <div className="mx-auto w-full max-w-191 flex-grow space-y-4 overflow-y-auto rounded-md">
      {conversation.map((msg, index) => (
        <div
          key={index}
          className={cn("flex w-full", msg.role === "user" && "justify-end")}>
          <div
            className={cn(
              "max-w-[90%]",
              msg.role === "user" && "rounded-lg bg-black/50 px-4 py-2",
            )}>
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
      {isThinking && (
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
                    style={nord}
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
  );
}
