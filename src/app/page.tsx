import { ArrowUp, CircleQuestionMark, Minus, Plus } from "lucide-react";
import { CursorLab } from "~/components/CursorLab";
import { env } from "~/env.mjs";

const experience = [
  {
    company: "Qualia",
    role: "Senior Software Engineer, Full Stack",
    dates: "Mar 2026 — Present",
    summary:
      "Build Clear, an agentic web app and browser extension, including agent actions, workflows, tool calls, tests, prompt evaluations, and Langfuse quality metrics. Reduced email-drafting agent latency by 30% and token use by roughly 40% per execution.",
  },
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

export default function Home() {
  const nexusEmbedUrl =
    env.NEXUS_EMBED_URL ??
    (env.NODE_ENV === "development"
      ? "http://localhost:5173/embed/lax"
      : undefined);

  return (
    <div className="mx-auto w-full max-w-[1800px]" id="top">
      <header className="">
        <div className="flex min-w-0 flex-col justify-center gap-1 px-4 py-3 sm:px-[30px]">
          <a
            className="self-start text-xl font-semibold tracking-tight focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl"
            href="#top"
          >
            Derek Cook
          </a>
        </div>
      </header>
      <main>
        <section
          className="border-b-2 border-ink"
          aria-labelledby="intro-heading"
        >
          <div className="grid min-w-0 grid-cols-1 items-center gap-6 bg-ink px-[22px] py-[clamp(32px,5vw,80px)] text-paper sm:px-[30px] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
            <h1
              id="intro-heading"
              className="max-w-[1200px] break-words font-display text-5xl font-normal uppercase leading-[1.06] tracking-tight sm:text-6xl lg:text-[clamp(80px,7vw,126px)]"
            >
              Live Data,
              <br />
              Live interfaces.
              <br />
            </h1>
            <div className="flex min-w-0 flex-col gap-12 lg:justify-between lg:self-stretch">
              <p className="text-lg leading-[1.35] tracking-[-0.03em] lg:text-2xl">
                I build realtime applications that react to real world changes.
              </p>
              <div>
                <p className="flex items-center gap-2 font-mono text-xs uppercase">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-status"
                    aria-hidden="true"
                  />
                  Open to collaboration
                </p>
                <p className="font-mono text-xs uppercase leading-relaxed ">
                  Software Engineering // AI // Consultation
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="border-b-2 border-ink px-[22px] py-6 sm:px-[30px]">
          <h2 className="font-mono text-xs uppercase leading-relaxed text-muted">
            Experiments
          </h2>
        </div> */}
        <section
          className="grid grid-cols-1 border-b-2 border-ink lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
          id="cursor-lab"
          aria-labelledby="cursor-lab-heading"
        >
          <div className="min-w-0 border-b-2 border-ink px-[22px] py-6 sm:px-[30px] sm:py-7 lg:border-b-0 lg:border-r-2">
            <h2
              id="cursor-lab-heading"
              className="mb-5 font-display text-[clamp(40px,4vw,64px)] font-normal uppercase leading-[1.12] tracking-tight"
            >
              Cursor Chat
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              Click or tap to toggle chat. Multiple users share the same space.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Clients are coordinated with a serverless websocket broker on a
              Cloudflare{" "}
              <a
                className="underline underline-offset-4"
                href="https://developers.cloudflare.com/durable-objects/best-practices/websockets/"
                target="_blank"
                rel="noreferrer"
              >
                Durable Object.
              </a>
            </p>
          </div>
          <CursorLab />
        </section>
        <section
          className="grid grid-cols-1 border-b-2 border-ink lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
          id="flight-tracker"
          aria-labelledby="flight-tracker-heading"
        >
          <div className="min-w-0 border-b-2 border-ink px-[22px] py-6 sm:px-[30px] sm:py-7 lg:border-b-0 lg:border-r-2">
            <h2
              id="flight-tracker-heading"
              className="mb-5 font-display text-[clamp(40px,4vw,64px)] font-normal uppercase leading-[1.12] tracking-tight"
            >
              Flight Tracker
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              Live aircraft around Los Angeles International Airport, powered by
              adsb.lol for data and Cesium for maps and assets.
            </p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              Click an aircraft to select it. Double-click it or click the
              camera button to track it. Use the{" "}
              <span className="inline-flex align-[-0.15em]">
                <CircleQuestionMark aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">question mark</span>
              </span>{" "}
              button on the widget to view the map navigation controls.
            </p>
            {nexusEmbedUrl && (
              <a
                className="mt-5 inline-block text-[15px] underline underline-offset-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent"
                href={nexusEmbedUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open full demo
              </a>
            )}
          </div>
          <div className="h-[400px] min-w-0 overflow-hidden lg:h-[500px]">
            {nexusEmbedUrl ? (
              <iframe
                className="block h-full w-full border-0"
                src={nexusEmbedUrl}
                title="Nexus live flight tracker around LAX"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6">
                <p className="text-sm text-muted">
                  The flight tracker demo is currently unavailable.
                </p>
              </div>
            )}
          </div>
        </section>
        <section
          className="grid grid-cols-1 border-b-2 border-ink lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <div className="min-w-0 border-b-2 border-ink px-[22px] py-6 sm:px-[30px] sm:py-7 lg:border-b-0 lg:border-r-2">
            <h2
              id="experience-heading"
              className="mb-5 font-display text-[clamp(40px,4vw,64px)] font-normal uppercase leading-[1.12] tracking-tight"
            >
              Experience
            </h2>
            <p className="font-mono text-[15px] leading-relaxed text-muted">
              8 years total
            </p>
          </div>
          <div className="min-w-0 divide-y-2 divide-ink">
            {experience.map((job, index) => (
              <details className="group/job" key={job.company}>
                <summary className="group/summary grid min-h-[90px] cursor-pointer list-none grid-cols-[18px_minmax(0,1fr)_24px] items-center gap-3 p-[22px] focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[6px] focus-visible:outline-accent sm:grid-cols-[20px_minmax(0,1fr)_minmax(0,1fr)_24px] sm:gap-4 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <div className="col-span-2 grid min-w-0 grid-cols-[18px_minmax(0,1fr)] items-center gap-x-3 sm:grid-cols-[20px_minmax(0,1fr)] sm:gap-x-4">
                    <span className="font-mono text-[11px] uppercase leading-relaxed text-index">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-[clamp(25px,2.5vw,37px)] font-normal leading-[1.2] tracking-tight">
                      {job.company}
                    </h3>
                    <p className="col-start-2 mt-[7px] text-[13px] text-muted">
                      {job.role}
                    </p>
                  </div>
                  <span className="col-start-2 font-mono text-[11px] uppercase leading-relaxed text-muted sm:col-auto sm:text-right">
                    {job.dates}
                  </span>
                  <span
                    className="relative col-start-3 row-span-2 row-start-1 block h-6 w-6 self-center text-accent sm:col-auto sm:row-auto sm:row-span-1"
                    aria-hidden="true"
                  >
                    <Plus
                      strokeWidth={3}
                      className="h-6 w-6 group-open/job:hidden"
                    />
                    <Minus
                      strokeWidth={3}
                      className="hidden h-6 w-6 group-open/job:block"
                    />
                  </span>
                </summary>
                <p className="max-w-[850px] pb-6 pl-[52px] pr-[22px] text-[17px] leading-[1.7] sm:pb-7 sm:pl-[60px] sm:pr-14">
                  {job.summary}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="grid grid-cols-[minmax(0,1fr)_auto] divide-x-2 divide-ink font-mono text-[11px] uppercase">
        <span className="p-5 sm:px-[30px] sm:py-[26px]">
          © {new Date().getFullYear()} Derek Cook
        </span>
        <a
          className="flex items-center gap-2 whitespace-nowrap bg-accent p-5 font-bold text-ink hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[6px] focus-visible:outline-ink sm:px-[30px] sm:py-[26px]"
          href="#top"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
        </a>
      </footer>
    </div>
  );
}
