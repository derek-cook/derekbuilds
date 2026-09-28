import { auth, currentUser } from "@clerk/nextjs/server";
import Ably from "ably/promises";
import { NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";
import { env } from "~/env.mjs";

const client = new Ably.Rest(env.ABLY_ROOT_API_KEY);

export const GET = async () => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();

  const tokenRequest = await client.auth.createTokenRequest({
    clientId: user?.username ?? generateUsername(),
  });

  return NextResponse.json(tokenRequest);
};
