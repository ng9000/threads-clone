"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";
import ImageUpload from "./ImageUpload";

const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const newFiles = e.target.files;
    if (newFiles) {
      for (let i = 0; i < newFiles.length; i++) {
        const fileType = newFiles[i].type;
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (files.length >= 5) {
          setMessage("You can upload a maximum of 5 images.");
          return; // Stop processing further files if the limit is reached
        }
        if (validImageTypes.includes(fileType)) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setFiles((prevFiles) => [
              ...prevFiles,
              { file: newFiles[i], dataURL: event.target?.result },
            ]);
          };
          reader.readAsDataURL(newFiles[i]);
        } else {
          setMessage("Only images accepted");
        }
      }
    }
  };

  const removeImage = (fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.file.name !== fileName)
    );
  };
  const { organization } = useOrganization();
  // console.log(organization, "org");

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization?.id : null,
      path: pathname,
      image: files,
    });
    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 space-y-8 flex flex-col justify-start"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={7} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageUpload
          handleFile={handleFile}
          removeImage={removeImage}
          files={files}
          message={message}
        />
        <Button type="submit" className="bg-primary-500">
          Send
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
