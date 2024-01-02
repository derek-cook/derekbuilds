import { getUserAuth } from "~/lib/auth/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const { session } = await getUserAuth();

  return (
    <div className="bg-popover w-full px-4 md:p-0">
      <nav className="mx-auto flex max-w-3xl items-center justify-end py-2 transition-all duration-300">
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
    </div>
  );
}
