"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Strong } from "../ui/typography";
import RecommendMessages from "./recommend-messages";
import { useConversation } from "@/hooks/use-conversation";
import { ImagePlus, SendHorizontalIcon, XCircle } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValue = {
  message: string;
  images?: File[];
};

export default function UserInput() {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    formState: { isDirty, isSubmitting },
  } = useForm<FormValue>();

  const { submitUserInput } = useConversation();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormValue> = useCallback(
    (data) => {
      resetField("message");
      resetField("images");
      setImagePreviews([]);
      submitUserInput({ message: data.message, images: data.images || [] });
    },
    [resetField, submitUserInput],
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setValue("images", files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevImageReview) => [
        ...prevImageReview,
        ...newPreviews,
      ]);
    }
  };

  const clearImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    const currentFiles = getValues("images") || [];
    const updatedFiles = currentFiles.filter(
      (_: File, i: number) => i !== index,
    );
    setValue("images", updatedFiles);
  };
  return (
    <div className="mx-auto w-full max-w-191">
      <Strong className="mb-1 text-2xl font-semibold">
        What can I help with?
      </Strong>
      <RecommendMessages />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 flex flex-col items-start gap-2 rounded-xl border bg-black/50 p-2 backdrop-blur">
        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imagePreviews.map((preview, index) => (
              <div
                className="relative"
                key={index}>
                <Image
                  src={preview}
                  alt={`Preview ${index}`}
                  className="rounded-md object-cover"
                  width={64}
                  height={64}
                />
                <Button
                  type="button"
                  size={"icon"}
                  variant={"secondary"}
                  className="absolute right-0 top-0 size-6 -translate-y-1/2 translate-x-1/2 rounded-full"
                  onClick={() => clearImage(index)}>
                  <XCircle className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full space-x-2">
          <Input
            {...register("message")}
            type="text"
            placeholder="Message PlutonAI"
            className="w-full resize-none rounded-xl border-none py-2 placeholder:self-center focus-visible:ring-0"
            disabled={isSubmitting}
          />
          <Label
            htmlFor="upload-images"
            className="flex cursor-pointer items-center gap-2">
            <ImagePlus className="size-4" />
            <Input
              id="upload-images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </Label>
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={!isDirty || isSubmitting}>
            <SendHorizontalIcon className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
