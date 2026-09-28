"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { DemoAppA, DemoAppB } from "~/lib/realtime/components/DemoApp";

const DemoChat = dynamic(
  () =>
    import("../lib/realtime/components/DemoChat").then((mod) => mod.DemoChat),
  { ssr: false },
);

const experience = [
  {
    company: "HubSpot",
    role: "Senior Software Engineer",
    dates: "Dec 2022 — Jun 2025",
    summary:
      "Built omnichannel Help Desk and Inbox experiences. Became the realtime feature subject-matter expert and created tools, documentation, and talks used across teams.",
  },
  {
    company: "Atlassian",
    role: "Software Engineer",
    dates: "Jun 2021 — Jul 2022",
    summary:
      "Improved the Confluence Cloud editor through server rendering, code splitting, bundle optimization, metrics, and monitoring.",
  },
  {
    company: "American Express",
    role: "Software Engineer",
    dates: "Feb 2018 — Jun 2021",
    summary:
      "Built high-traffic card account experiences and led frontend delivery for a new Balance Transfer product.",
  },
];

function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      className="group inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-[#d8ff48]"
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f4f4ef] selection:bg-[#d8ff48] selection:text-[#111216]">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-5 sm:px-7">
        <nav
          className="flex min-h-14 items-center justify-between border-b border-[#292b30]"
          aria-label="Primary navigation"
        >
          <Link href="/" className="text-sm font-bold tracking-[-0.04em]">
            Derek Cook
          </Link>
          <div className="flex items-center gap-5 text-sm text-zinc-400 sm:gap-7">
            <a
              className="hidden transition-colors hover:text-white sm:inline"
              href="#experience"
            >
              Experience
            </a>
            <a
              className="transition-colors hover:text-[#d8ff48]"
              href="mailto:derekcdev@gmail.com"
            >
              Email <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>

        <header className="grid gap-9 pb-14 pt-16 md:grid-cols-[1.35fr_.65fr] md:pb-16 md:pt-24">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              Software engineer · Los Angeles
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3.4rem,8vw,6.9rem)] font-semibold leading-[0.9] tracking-[-0.068em]">
              I build interfaces that feel{" "}
              <span className="text-[#d8ff48]">fast, clear, and alive.</span>
            </h1>
          </div>
          <div className="max-w-md self-end text-[1.05rem] leading-7 text-zinc-400">
            <p className="mb-5 flex items-center gap-2 font-mono text-xs text-[#d8ff48]">
              <span className="h-2 w-2 rounded-full bg-[#d8ff48] shadow-[0_0_0_4px_rgba(216,255,72,0.12)]" />
              Open to new opportunities
            </p>
            <p>
              Frontend-focused engineer with 7 years of experience building
              realtime systems, accessible products, and high-traffic web apps.
            </p>
          </div>
        </header>

        <main>
          <div className="grid gap-4 lg:grid-cols-[1.12fr_.88fr]">
            <section
              className="signal-card overflow-hidden"
              aria-labelledby="cursor-heading"
            >
              <div className="flex items-center justify-between border-b border-[#292b31] px-5 py-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em]">
                <h2 id="cursor-heading">Live cursor lab</h2>
                <span className="text-zinc-600">Realtime / 01</span>
              </div>
              <div className="relative min-h-[430px] overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(216,255,72,0.1),transparent_34%)] p-3">
                <div className="signal-cursor-grid pointer-events-none absolute inset-0 opacity-20" />
                <p className="relative z-10 px-2 pt-1 text-sm leading-6 text-zinc-400">
                  Move between the two fields. Click or tap to chat.
                </p>
                <div className="relative z-10 mt-4 grid h-[335px] gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border border-[#34363d] bg-[#0e0f13]/90">
                    <div className="border-b border-[#2a2c31] px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-zinc-600">
                      Field A
                    </div>
                    <div className="h-[calc(100%-33px)]">
                      <DemoAppA>
                        <DemoChat />
                      </DemoAppA>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-[#34363d] bg-[#0e0f13]/90">
                    <div className="border-b border-[#2a2c31] px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-zinc-600">
                      Field B
                    </div>
                    <div className="h-[calc(100%-33px)]">
                      <DemoAppB>
                        <DemoChat />
                      </DemoAppB>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="signal-card flex flex-col"
              aria-labelledby="ai-heading"
            >
              <div className="flex items-center justify-between border-b border-[#292b31] px-5 py-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em]">
                <span>Selected AI work</span>
                <span className="text-zinc-600">Applied / 02</span>
              </div>
              <div className="px-6 pb-3 pt-8">
                <h2
                  id="ai-heading"
                  className="max-w-sm text-4xl font-semibold leading-[1.04] tracking-[-0.05em]"
                >
                  Useful AI, grounded in product.
                </h2>
                <p className="mt-4 max-w-md leading-7 text-zinc-400">
                  Experiments that turn retrieval, context, and interface design
                  into something people can actually use.
                </p>
              </div>
              <ol className="mt-auto px-6 pb-6 pt-5">
                <li className="grid grid-cols-[2rem_1fr] gap-2 border-t border-[#292b31] py-4 text-sm leading-6">
                  <span className="font-mono text-xs text-[#d8ff48]">01</span>
                  <span>
                    1st place in a HubSpot AI hackathon for vector search in
                    Help Desk.
                  </span>
                </li>
                <li className="grid grid-cols-[2rem_1fr] gap-2 border-t border-[#292b31] py-4 text-sm leading-6">
                  <span className="font-mono text-xs text-[#d8ff48]">02</span>
                  <span>
                    RAG portfolio assistant backed by Postgres and pgvector.
                  </span>
                </li>
                <li className="grid grid-cols-[2rem_1fr] gap-2 border-t border-[#292b31] py-4 text-sm leading-6">
                  <span className="font-mono text-xs text-[#d8ff48]">03</span>
                  <span>
                    AI-assisted development with Cursor, Claude, and MCP
                    workflows.
                  </span>
                </li>
              </ol>
            </section>
          </div>

          <section
            id="experience"
            className="signal-card mt-4 px-6 pb-3 pt-8"
            aria-labelledby="experience-heading"
          >
            <h2
              id="experience-heading"
              className="mb-7 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              Experience
            </h2>
            {experience.map((job) => (
              <article
                key={job.company}
                className="grid gap-3 border-t border-[#30323a] py-6 md:grid-cols-[1.05fr_.7fr_2fr] md:gap-6"
              >
                <h3 className="text-lg font-semibold">
                  {job.company}
                  <span className="mt-1 block text-sm font-normal text-zinc-500">
                    {job.role}
                  </span>
                </h3>
                <p className="font-mono text-xs leading-5 text-zinc-500">
                  {job.dates}
                </p>
                <p className="max-w-2xl leading-7 text-zinc-400">
                  {job.summary}
                </p>
              </article>
            ))}
          </section>

          <footer className="mt-16 flex items-center justify-between border-t border-[#292b31] px-1 py-7 text-sm md:mt-20">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-600">
              Derek Cook
            </span>
            <div className="flex items-center gap-5">
              <ArrowLink href="https://github.com/derek-cook">GitHub</ArrowLink>
              <ArrowLink href="https://www.linkedin.com/in/derekcook33/">
                LinkedIn
              </ArrowLink>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
