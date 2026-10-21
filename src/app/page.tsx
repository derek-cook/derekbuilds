import { Minus, Plus } from "lucide-react";
import { CursorLab } from "~/components/CursorLab";

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
  return (
    <div className="mx-auto w-full max-w-[1800px] border-2 border-ink" id="top">
      <header className="border-b-2 border-ink">
        <div className="flex min-w-0 flex-col justify-center gap-1 px-4 py-3 sm:px-[30px]">
          <a
            className="self-start text-lg font-semibold tracking-tight focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl"
            href="#top"
          >
            Derek Cook
          </a>
          {/* <p className="font-mono text-xs uppercase leading-relaxed text-muted">
            Software Engineer
          </p> */}
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
            <div className="flex min-w-0 flex-col gap-6">
              <p className="text-lg leading-[1.35] tracking-[-0.03em] lg:text-2xl">
                I build realtime applications that react to real world changes.
              </p>
              <p className="mt-2 flex items-center gap-2 font-mono text-xs uppercase">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-status"
                  aria-hidden="true"
                />
                Open to collaboration
              </p>
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
          <div className="min-w-0 border-b-2 border-ink px-[22px] py-[26px] sm:px-[30px] sm:py-8 lg:border-b-0 lg:border-r-2">
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
          id="experience"
          aria-labelledby="experience-heading"
        >
          <div className="min-w-0 border-b-2 border-ink px-[22px] py-[26px] sm:px-[30px] sm:py-8 lg:border-b-0 lg:border-r-2">
            <h2
              id="experience-heading"
              className="mb-5 font-display text-[clamp(40px,4vw,64px)] font-normal uppercase leading-[1.12] tracking-tight"
            >
              Experience
            </h2>
            <p className="text-[15px] leading-relaxed text-muted">
              Enterprise scale
            </p>
          </div>
          <div className="min-w-0 divide-y-2 divide-ink">
            {experience.map((job, index) => (
              <details className="group/job" key={job.company}>
                <summary className="group/summary grid min-h-[90px] cursor-pointer list-none grid-cols-[18px_minmax(0,1fr)_24px] items-center gap-3 p-[22px] focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[6px] focus-visible:outline-accent sm:grid-cols-[20px_minmax(0,1fr)_minmax(0,1fr)_24px] sm:gap-4 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[11px] uppercase leading-relaxed text-index">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(25px,2.5vw,37px)] font-normal leading-[1.2] tracking-tight">
                      {job.company}
                    </h3>
                    <p className="mt-[7px] text-[13px] text-muted">
                      {job.role}
                    </p>
                  </div>
                  <span className="col-start-2 font-mono text-[11px] uppercase leading-relaxed text-muted sm:col-auto sm:text-right">
                    {job.dates}
                  </span>
                  <span
                    className="relative col-start-3 row-start-1 block h-6 w-6 text-accent sm:col-auto sm:row-auto"
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
      <footer className="grid grid-cols-2 divide-x-2 divide-ink font-mono text-[11px] uppercase">
        <span className="p-5 sm:px-[30px] sm:py-[26px]">
          © {new Date().getFullYear()} Derek Cook
        </span>
        <a
          className="flex w-full items-center justify-between bg-accent p-5 font-bold text-ink hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[6px] focus-visible:outline-ink sm:px-[30px] sm:py-[26px]"
          href="#top"
        >
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}
