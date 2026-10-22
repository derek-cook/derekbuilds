"use client";

import dynamic from "next/dynamic";
import { DemoAppA, DemoAppB } from "~/lib/realtime/components/DemoApp";

const DemoChat = dynamic(
  () =>
    import("~/lib/realtime/components/DemoChat").then((mod) => mod.DemoChat),
  {
    ssr: false,
    loading: () => (
      <p className="p-5 text-sm text-muted">Loading cursor lab…</p>
    ),
  },
);

export function CursorLab() {
  return (
    <div className="grid w-full min-w-0 grid-cols-2 items-start divide-x-2 divide-ink self-start">
      <div className="relative aspect-square w-full min-w-0 overflow-clip bg-[radial-gradient(circle,theme(colors.accent)_1px,transparent_1px)] bg-[size:20px_20px]">
        <p className="pointer-events-none absolute left-0 top-0 z-10 border-b-2 border-r-2 border-ink bg-accent px-3 py-2 font-mono text-xs font-bold uppercase text-ink">
          User A
        </p>
        <DemoAppA>
          <DemoChat label="Field A: move your cursor or click to chat" />
        </DemoAppA>
      </div>
      <div className="relative aspect-square w-full min-w-0 overflow-clip bg-[radial-gradient(circle,theme(colors.accent)_1px,transparent_1px)] bg-[size:20px_20px]">
        <p className="pointer-events-none absolute left-0 top-0 z-10 border-b-2 border-r-2 border-ink bg-accent px-3 py-2 font-mono text-xs font-bold uppercase text-ink">
          User B
        </p>
        <DemoAppB>
          <DemoChat label="Field B: move your cursor or click to chat" />
        </DemoAppB>
      </div>
    </div>
  );
}
