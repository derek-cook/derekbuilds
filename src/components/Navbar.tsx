import { getUserAuth } from "~/lib/auth/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { session } = getUserAuth();

  return (
    <nav className="flex max-w-7xl items-center justify-end p-2 transition-all duration-300">
      {/* <h1 className="transition-hover cursor-pointer font-semibold hover:opacity-75">
            <Link href="/">Pools</Link>
          </h1> */}
      <div className="flex items-center space-x-2">
        {session?.user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
