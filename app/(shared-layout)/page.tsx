import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-primary" />
              <span>Share ideas. Discover knowledge.</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to <span className="text-primary">NextPro</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              A simple place to read interesting articles, share your ideas, and
              connect with a growing community of writers and readers.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/blog"
                className={buttonVariants({
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                Explore Blogs
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="/create"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "w-full sm:w-auto",
                })}
              >
                Write an Article
                <PenLine className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why NextPro?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to share knowledge
            </h2>

            <p className="mt-4 text-muted-foreground">
              Read, write, search, and discover content in one simple place.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<BookOpen className="size-6" />}
              title="Discover Articles"
              description="Explore blog posts and discover new ideas, experiences, and useful information."
            />

            <FeatureCard
              icon={<PenLine className="size-6" />}
              title="Share Your Ideas"
              description="Create your own articles and share your thoughts with readers around the world."
            />

            <FeatureCard
              icon={<Search className="size-6" />}
              title="Find What Matters"
              description="Search through articles and quickly find the content you are looking for."
            />

            <FeatureCard
              icon={<Users className="size-6" />}
              title="Growing Community"
              description="Be part of a community where people can share knowledge and learn from each other."
            />

            <FeatureCard
              icon={<ShieldCheck className="size-6" />}
              title="Protected Accounts"
              description="Your account and blog creation features are protected by authentication."
            />

            <FeatureCard
              icon={<Sparkles className="size-6" />}
              title="Simple Experience"
              description="A clean and responsive interface designed to keep reading and writing simple."
            />
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border bg-card p-8 shadow-sm md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="size-7" />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                Ready to discover something new?
              </h2>

              <p className="mt-4 text-lg text-muted-foreground">
                Explore the latest articles from the NextPro community or create
                your own post and share your knowledge.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/blog"
                  className={buttonVariants({
                    size: "lg",
                  })}
                >
                  Browse Articles
                </Link>

                <Link
                  href="/create"
                  className={buttonVariants({
                    size: "lg",
                    variant: "outline",
                  })}
                >
                  Create a Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Start reading. Start writing. Start sharing.
          </p>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
