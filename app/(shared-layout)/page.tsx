"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRight, BookOpen, PenLine, Users, Zap } from "lucide-react";

import { useConvexAuth } from "convex/react";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <main className="w-full">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              <span>Welcome to NextPro</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build.
              <span className="text-primary"> Share.</span>
              <br />
              Learn.
              <span className="text-primary"> Grow.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              A modern platform where developers and creators can share their
              ideas, publish useful content, and learn from each other.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {isLoading ? (
                <div className="h-11 w-32 animate-pulse rounded-md bg-muted" />
              ) : isAuthenticated ? (
                <>
                  <Link
                    href="/create"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Create a post
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href="/blog"
                    className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Explore blog
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/sign-up"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href="/blog"
                    className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Explore blog
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-xl">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />

                <div className="ml-4 rounded-md bg-muted px-4 py-1 text-xs text-muted-foreground">
                  nextpro.dev
                </div>
              </div>

              <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
                <div className="space-y-5">
                  <div className="h-4 w-24 rounded bg-primary/20" />

                  <div className="space-y-3">
                    <div className="h-7 w-full rounded bg-muted" />
                    <div className="h-7 w-4/5 rounded bg-muted" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-11/12 rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>

                  <div className="h-10 w-32 rounded-md bg-primary" />
                </div>

                <div className="rounded-xl border bg-muted/40 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20" />

                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-muted" />
                      <div className="h-2 w-16 rounded bg-muted" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-muted" />
                    <div className="h-4 w-full rounded bg-muted" />
                    <div className="h-4 w-4/5 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-t py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What you can do
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need
            </h2>

            <p className="mt-4 text-muted-foreground">
              Create, discover, and share content with the NextPro community.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Feature
              icon={<PenLine className="h-6 w-6" />}
              title="Create"
              description="Write and publish your own posts and share your knowledge with developers around the world."
            />

            <Feature
              icon={<BookOpen className="h-6 w-6" />}
              title="Discover"
              description="Explore useful articles, tutorials, ideas, and experiences from other developers."
            />

            <Feature
              icon={<Users className="h-6 w-6" />}
              title="Connect"
              description="Be part of a growing community of people who love building, sharing, and learning."
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl border bg-muted/30 p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Built for developers
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Turn your knowledge into something useful.
                </h2>

                <p className="mt-5 leading-7 text-muted-foreground">
                  NextPro gives developers and creators a simple place to
                  publish their thoughts, tutorials, experiences, and projects.
                </p>

                <div className="mt-7">
                  <Link
                    href="/blog"
                    className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Read the blog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Fast"
                  text="Built with modern web technologies."
                />

                <InfoCard
                  title="Secure"
                  text="Authentication powered by Better Auth."
                />

                <InfoCard
                  title="Reactive"
                  text="Real-time backend powered by Convex."
                />

                <InfoCard
                  title="Modern"
                  text="Built with Next.js and TypeScript."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to share your ideas?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Start creating content and share your knowledge with the NextPro
              community.
            </p>

            <div className="mt-8">
              {isLoading ? (
                <div className="mx-auto h-11 w-32 animate-pulse rounded-md bg-primary-foreground/20" />
              ) : isAuthenticated ? (
                <Link
                  href="/create"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
                >
                  Create your post
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/auth/sign-up"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
                >
                  Join NextPro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <Link href="/" className="text-xl font-bold">
                Next<span className="text-primary">Pro</span>
              </Link>

              <p className="mt-2 text-sm text-muted-foreground">
                Build. Share. Learn. Grow.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/blog"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Blog
              </Link>

              <Link
                href="/create"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Create
              </Link>

              <a
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                GitHub
              </a>

              <a
                href="https://instagram.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Instagram
              </a>

              <a
                href="https://facebook.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            © 2026 NextPro. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================= FEATURE COMPONENT ================= */

function Feature({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-background p-5">
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
