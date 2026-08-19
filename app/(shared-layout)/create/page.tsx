
"use client";

import { useEffect, useTransition } from "react";

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

import { api } from "@/convex/_generated/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";

import { toast } from "sonner";

import { createBlogAction } from "@/app/action";

export default function CreateRoute() {
  const [isPending, startTransition] = useTransition();

  const generateUploadUrl = useMutation(
    api.post.generateImageUploadUrl
  );

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),

    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  // Always start with a completely empty form
  // when the Create page is mounted.
  useEffect(() => {
    form.reset({
      title: "",
      content: "",
      image: undefined,
    });

    // Clear the actual file input too.
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  }, [form]);

  async function onSubmit(
    values: z.infer<typeof PostSchema>
  ) {
    if (!values.image) {
      toast.error("Please select an image");
      return;
    }

    startTransition(async () => {
      try {
        console.log("Getting Convex upload URL...");

        // Upload the image directly from the browser to Convex.
        const uploadUrl = await generateUploadUrl();

        console.log("Uploading image directly to Convex...");

        const uploadResult = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": values.image.type,
          },
          body: values.image,
        });

        if (!uploadResult.ok) {
          throw new Error("Image upload failed");
        }

        const { storageId } = await uploadResult.json();

        console.log("Image uploaded:", storageId);

        // Only send text + storageId to the Server Action.
        // The large image itself is NOT sent through Next.js.
        const result = await createBlogAction(
          {
            title: values.title,
            content: values.content,
          },
          storageId
        );

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        // Reset the form after successful creation.
        form.reset({
          title: "",
          content: "",
          image: undefined,
        });

        // Reset the real file input.
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement | null;

        if (fileInput) {
          fileInput.value = "";
        }

        toast.success("Blog created successfully!");
      } catch (error) {
        console.error("UPLOAD ERROR:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to upload image"
        );
      }
    });
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

          <CardDescription>
            Create your own blogs here!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              {/* TITLE */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>

                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Amazing title!"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* CONTENT */}
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
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* IMAGE */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Image</FieldLabel>

                    <Input
                      type="file"
                      accept="image/*"
                      aria-invalid={fieldState.invalid}
                      onChange={(event) => {
                        const file =
                          event.target.files?.[0];

                        field.onChange(file);
                      }}
                    />

                    {field.value && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {field.value.name} (
                        {(
                          field.value.size /
                          (1024 * 1024)
                        ).toFixed(2)}
                        {" MB"})
                      </p>
                    )}

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Uploading...</span>
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

