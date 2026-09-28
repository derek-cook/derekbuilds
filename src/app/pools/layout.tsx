import AblyClientProvider from "~/components/realtime/DynamicAblyProvider";
import { checkAuth } from "~/lib/auth/utils";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <AblyClientProvider>
      <div className="flex h-full flex-col justify-items-center bg-noisyGradient bg-cover">
        {children}
      </div>
    </AblyClientProvider>
  );
}
