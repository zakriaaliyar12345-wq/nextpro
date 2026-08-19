"use client";

import { PostSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";
import { useRouter } from "next/navigation";
import { createBlogAction } from "@/app/action";
import { useConvexAuth } from "convex/react";

export default function CreateRoute() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const { isAuthenticated, isLoading } = useConvexAuth();

  const form = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  function onSubmit(values: z.infer<typeof PostSchema>) {
    startTransition(async () => {
      console.log("hey this runs from client side");

      await createBlogAction(values);
    });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Create Post
        </h1>

        <p className="text-xl text-muted-foreground pt-4">
          Share your ideas with all around the world
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>

          <CardDescription>Create your own blogs here!</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>

                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Amazing title !"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>

                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Content"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Image</FieldLabel>

                    <Input
                      aria-invalid={fieldState.invalid}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file);
                      }}
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
                  <span>Create Post</span>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
