"use client";
// import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
//   NavigationMenuContent,
// } from "~/components/ui/navigation-menu";

export const Navbar = () => {
  return (
    <div className="flex w-full max-w-5xl items-center justify-between justify-self-start px-4 py-6 md:py-8">
      <span className="text-sm font-medium">Derek Cook</span>
      {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Ask</NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
    </div>
  );
};
