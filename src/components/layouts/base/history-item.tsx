"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SERVER_URL } from "@/configs/env.config";
import { useConversation } from "@/hooks/use-conversation";
import { useToast } from "@/hooks/use-toast";
import { isEmptyString } from "@/utils";
import { LoaderCircle, SquarePenIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface HistoryItemProps {
  sessionId: string;
  title: string;
}

export default function HistoryItem({ sessionId, title }: HistoryItemProps) {
  const [conversationTitle, setConversationTitle] = useState<string>(title);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { fetchConversation } = useConversation();
  const { toast } = useToast();

  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditTitle = useCallback(async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!sessionId || isEmptyString(titleInputRef.current?.value)) {
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      if (!SERVER_URL) throw new Error("Server URL is not defined");
      const serverUrl = `${SERVER_URL}/agent/history/${sessionId}/title`;

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ title: titleInputRef.current?.value }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      setConversationTitle(titleInputRef.current?.value as string);
    } catch (error) {
      toast({ title: "Failed to edit conversation history title" });
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }, [session?.accessToken, sessionId, toast, isEditing]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleEditTitle();
    if (event.key === "Escape") setIsEditing(false);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <SidebarMenuItem
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}>
      {isEditing ? (
        <div className="relative flex items-center rounded-md border border-border">
          <Input
            ref={titleInputRef}
            className="border-none focus-visible:ring-0"
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          {isLoading && <LoaderCircle className="animate-spin" />}
        </div>
      ) : (
        <SidebarMenuButton
          className="min-w-0 max-w-full truncate"
          onClick={() => fetchConversation({ sessionId })}>
          <p className="truncate">{conversationTitle}</p>
        </SidebarMenuButton>
      )}
      {isHover && !isLoading && !isEditing && (
        <SidebarMenuAction onClick={() => setIsEditing(true)}>
          <SquarePenIcon />
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}
