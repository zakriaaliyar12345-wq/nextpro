"use client"
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "../web/them-tagle";
import { useConvexAuth } from "convex/react";
import { Button } from '@/components/ui/button';
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8 ">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-primary">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button onClick={() => authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                toast.success("Logout  successfully");
                router.push("/");
              },
              onError: (error) => {
                toast.error(error.error.message);
                
              },
            }
          })}>Logout</Button>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/sign-up">
              Sign up
            </Link>
            <Link className={buttonVariants()} href="/auth/login">
              Login
            </Link>
          </>
        )}
        <ThemeToggle/>
      
      </div>
    </nav>
  );
}
