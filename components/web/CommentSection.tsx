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
import { useMutation, useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z, { json } from 'zod';
import { toast } from "sonner";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";


 


export function CommentSection() {
  const params = useParams<{ postId: Id<"posts"> }>();
  const data = useQuery(api.comments.getCommentsByPost, { postId: params.postId })

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
  if (data === undefined) {
  return <p>Loading...</p>
}
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">{data.length} Comments</h2>
      </CardHeader>
      <CardContent className="space-y-8">
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
              <span>Comment</span>
            )}
          </Button>
        </form>
        {data?.length > 0 && <Separator/>}
        <section className="space-y-6">
          {data?.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="size-10 shrink">
                <AvatarImage
                  src={`https://avatar.vercel.sh/rauchg`}
                  alt={comment.authorName}
                />
                <AvatarFallback>
                  {comment.authorName.slice(0,2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">

                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{comment.authorName}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(comment._creationTime)
                    .toLocaleDateString("en-US")}</p>
                </div>
                <p className="text-sm text-foreground/90
                whitespace-nowrap leading-relaxed
                ">{comment.body}</p>

                
            </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
