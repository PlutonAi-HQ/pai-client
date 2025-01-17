"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Strong } from "../ui/typography";
import RecommendMessages from "./recommend-messages";
import { useConversation } from "@/hooks/use-conversation";
import { SendHorizontalIcon } from "lucide-react";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValue = {
  message: string;
};

export default function UserInput() {
  const { register, handleSubmit, resetField } = useForm<FormValue>();

  const { submitUserInput } = useConversation();

  const onSubmit: SubmitHandler<FormValue> = useCallback(
    (data) => {
      resetField("message");
      submitUserInput(data.message);
    },
    [resetField, submitUserInput],
  );

  return (
    <div className="mx-auto w-full max-w-191">
      <Strong className="mb-1 text-2xl font-semibold">What can I help with?</Strong>
      <RecommendMessages />
      <form
        onSubmit={handleSubmit(onSubmit)}
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
  );
}
