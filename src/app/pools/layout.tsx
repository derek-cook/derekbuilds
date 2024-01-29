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
      <div className="bg-noisyGradient bg-cover">
        <div className="mx-auto flex h-screen flex-col justify-items-center">
          {children}
        </div>
      </div>
    </DynamicAblyProvider>
  );
}
