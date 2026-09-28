import { getUserAuth } from "~/lib/auth/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const { session } = await getUserAuth();

  return (
    <nav className="flex max-w-7xl items-center justify-end p-2 transition-all duration-300">
      <div className="flex items-center space-x-2">
        {session?.user ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
