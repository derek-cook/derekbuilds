export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-noisyGradientLight bg-cover dark:bg-noisyGradientDark ">
      <div className="mx-auto flex h-screen flex-col justify-items-center">
        {children}
      </div>
    </div>
  );
}
