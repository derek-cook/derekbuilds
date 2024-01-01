import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const getUserAuth = () => {
  // find out more about setting up 'sessionClaims' (custom sessions) here: https://clerk.com/docs/backend-requests/making/custom-session-token
  const { userId, sessionClaims } = auth();
  if (userId) {
    return {
      session: {
        user: {
          id: userId,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${sessionClaims?.firstName} ${sessionClaims?.lastName}`,
          email: sessionClaims?.email,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth = () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
};
