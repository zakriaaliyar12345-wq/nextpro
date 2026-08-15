import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<"posts">;
  }>;
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postId } = await params;
  const post = await fetchQuery(api.post.getPostById, { postId: postId });
  

  if (!post) {
    return (
      <div>
        <h1
          className="
                text-6xl font-extrabold
                text-red-500 p-20 
                "
        >
          No post found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in  duration-500 relative">
      <Link className={buttonVariants({ className: "mb-4" })} href="/blog">
        <ArrowLeft className="size-4" /> Back to blog
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1786173071061-e47b0df235c9?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col ">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Posted on :{new Date(post._creationTime).toLocaleDateString("de-US")}
        </p>
      </div>
      <Separator className="my-8" />

      <p className="text-lg  leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {post.body}
      </p>
      <CommentSection />
    </div>
  );
}
