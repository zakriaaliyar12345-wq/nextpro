"use client";
import { MessageSquare, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../../components/ui/field";
import { commentSchema } from "@/app/schemas/comments";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from 'zod';
import { toast } from "sonner";
import { useTransition } from "react";


export function CommentSection() {
  const params = useParams<{ postId: Id<"posts"> }>();
  const createComments = useMutation(api.comments.createComments);
   const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId,
    },
  });
   async function OnSubmit(data:z.infer<typeof commentSchema>) {
     startTransition( async() => {
      try {
        await createComments(data);
        form.reset();
        toast.success("comment posted success");
      } catch {
        toast.error("Failed to create comments ");
      }
   })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">5 comments</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(OnSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel></FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
