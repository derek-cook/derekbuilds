import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type cookies } from "next/headers";

export const createClient = (
  cookieStore: ReturnType<typeof cookies>,
  supabaseAccessToken?: string,
) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value);
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, "");
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      global: {
        headers: supabaseAccessToken
          ? { Authorization: `Bearer ${supabaseAccessToken}` }
          : {},
      },
    },
  );
};
