import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello from index layout </h1>
      <Link href={"/create"}>Go to create page </Link>
    </div>
  );
}