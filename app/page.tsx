import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <h1>Welcome to Kid Management App</h1>

        <Link href="/register">
          Register
        </Link>
    </main>
  );
}
