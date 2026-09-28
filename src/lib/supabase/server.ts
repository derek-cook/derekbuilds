import { createServerClient } from "@supabase/ssr";
import { type cookies } from "next/headers";

export const createClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  supabaseAccessToken?: string,
) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot write cookies. The auth proxy handles
            // refreshes before protected routes reach this client.
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
