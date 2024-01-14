import { currentUser } from "@clerk/nextjs";
import Ably from "ably/promises";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env.mjs";

const client = new Ably.Realtime(env.ABLY_ROOT_API_KEY);

export const GET = async (_req: NextRequest) => {
  const user = await currentUser();

  const tokenRequest = await client.auth.createTokenRequest({
    clientId: user?.username ?? "anonymous",
  });

  return NextResponse.json(tokenRequest);
};