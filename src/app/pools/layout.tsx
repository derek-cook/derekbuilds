import dynamic from "next/dynamic";

const DynamicAblyProvider = dynamic(
  () => import("~/components/realtime/ClientProviders"),
  {
    ssr: false,
  },
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicAblyProvider>
      <div className="flex h-full flex-col justify-items-center bg-noisyGradient bg-cover">
        {children}
      </div>
    </DynamicAblyProvider>
  );
}
