import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "~/lib/auth/utils";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <main>
      <h1 className="my-6 text-3xl font-semibold">Account</h1>
      <div className="space-y-6">
        <UserSettings session={session} />
      </div>
    </main>
  );
}
