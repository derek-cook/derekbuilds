"use client";

import dynamic from "next/dynamic";
import { DemoAppA, DemoAppB } from "~/lib/realtime/components/DemoApp";

const DemoChat = dynamic(
  () =>
    import("../lib/realtime/components/DemoChat").then((mod) => mod.DemoChat),
  { ssr: false },
);

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

const capabilities = [
  {
    title: "Advanced frontends",
    tags: "Interfaces / Performance / Accessibility",
    description:
      "Clear, responsive interfaces for complex products. Eight years building enterprise web apps, from high-traffic account experiences to editors and omnichannel help desks.",
  },
  {
    title: "Realtime systems",
    tags: "Presence / Collaboration / Messaging",
    description:
      "Shared experiences that respond in the moment. Custom channel-based communication, live cursors, and realtime product features built to feel immediate.",
  },
  {
    title: "Applied AI",
    tags: "Agents / Workflows / Evaluations",
    description:
      "AI that does useful work. Agent actions, retrieval, prompt evaluations, and quality metrics, with attention to latency and token efficiency.",
  },
];

export default function Home() {
  return (
    <div className="portfolio" id="top">
      <header className="masthead">
        <a className="wordmark" href="#top">
          Derek Cook
        </a>
        <a
          className="availability mono"
          href="https://www.linkedin.com/in/derekcook33/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="status-dot" />
          Open to new opportunities <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main>
        <section className="intro-grid" aria-labelledby="intro-heading">
          <div className="intro-title cell">
            <p className="mono">01 / Software engineer</p>
            <h1 id="intro-heading">
              A thinker.
              <br />A builder.
            </h1>
            <p className="mono">
              Los Angeles / Available for remote collaboration
            </p>
          </div>
          <div className="intro-copy cell">
            <p className="statement">
              I build interfaces that feel fast, clear, and alive.
            </p>
            <div className="intro-bottom">
              <p>
                Eight years building enterprise web apps. My practice moves
                between advanced frontends, realtime systems, and practical AI —
                always with a bias toward simplicity and structure.
              </p>
              <a className="mono text-link" href="#work">
                Explore the work ↓
              </a>
            </div>
          </div>
        </section>
        <section
          className="capability-grid"
          aria-labelledby="capabilities-heading"
        >
          <div className="cell section-label">
            <p className="mono">02 / Capabilities</p>
            <h2 id="capabilities-heading">
              From idea
              <br />
              to interface.
            </h2>
            <p className="muted">Thoughtful systems. Tangible results.</p>
          </div>
          <div className="capability-list">
            {capabilities.map((item, index) => (
              <details className="capability" key={item.title}>
                <summary>
                  <span className="mono index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <span className="mono tags">{item.tags}</span>
                  <span className="toggle" aria-hidden="true" />
                </summary>
                <p className="capability-description">{item.description}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="work" aria-labelledby="work-heading">
          <div className="section-bar">
            <h2 id="work-heading">03 / Selected work</h2>
            <span className="mono">Live experiments / Applied AI</span>
          </div>
          <div className="work-grid">
            <details className="work-cell cursor-work">
              <summary>
                <div className="work-art dark-art">
                  <div className="art-meta mono">
                    <span>Realtime / Interactive experiment</span>
                    <span>01</span>
                  </div>
                  <div className="poster-title">
                    Live /<br />
                    Together.
                  </div>
                  <div className="cursor-symbol" aria-hidden="true">
                    ↖
                  </div>
                  <p className="mono">Two fields. One shared moment.</p>
                </div>
                <div className="work-caption">
                  <h3>Live cursor lab</h3>
                  <span className="toggle" aria-hidden="true" />
                  <p className="mono">Custom realtime / Presence & messaging</p>
                </div>
              </summary>
              <div className="work-content">
                <p>
                  Move between the fields to see your cursor mirrored. Click or
                  tap a field to chat.
                </p>
                <div className="demo-fields">
                  <div className="demo-field">
                    <p className="mono field-label">Field A / Local</p>
                    <div className="demo-canvas">
                      <DemoAppA>
                        <DemoChat />
                      </DemoAppA>
                    </div>
                  </div>
                  <div className="demo-field">
                    <p className="mono field-label">Field B / Connected</p>
                    <div className="demo-canvas">
                      <DemoAppB>
                        <DemoChat />
                      </DemoAppB>
                    </div>
                  </div>
                </div>
              </div>
            </details>
            <details className="work-cell ai-work">
              <summary>
                <div className="work-art red-art">
                  <div className="art-meta mono">
                    <span>Applied AI / Selected outcomes</span>
                    <span>02</span>
                  </div>
                  <div className="poster-title">
                    Less wait.
                    <br />
                    More work.
                  </div>
                  <div className="metrics">
                    <span>
                      −30%<small className="mono">Agent latency</small>
                    </span>
                    <span>
                      −40%<small className="mono">Token use</small>
                    </span>
                  </div>
                </div>
                <div className="work-caption">
                  <h3>Practical AI</h3>
                  <span className="toggle" aria-hidden="true" />
                  <p className="mono">Agents / Retrieval / Evaluation</p>
                </div>
              </summary>
              <div className="work-content ai-results">
                <p className="statement">Useful outcomes, measured.</p>
                <ol>
                  <li>
                    <span className="mono index">01</span>
                    <p>
                      1st place in a HubSpot AI hackathon for vector search in
                      Help Desk.
                    </p>
                  </li>
                  <li>
                    <span className="mono index">02</span>
                    <p>
                      RAG portfolio assistant backed by Postgres and pgvector.
                    </p>
                  </li>
                  <li>
                    <span className="mono index">03</span>
                    <p>
                      At Qualia, reduced email-drafting agent latency by 30% and
                      token use by roughly 40% per execution.
                    </p>
                  </li>
                </ol>
              </div>
            </details>
          </div>
        </section>
        <section
          className="experience-grid"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <div className="cell section-label">
            <p className="mono">04 / Experience</p>
            <h2 id="experience-heading">
              Built with
              <br />
              good teams.
            </h2>
            <p className="muted">Enterprise scale. Attention to detail.</p>
          </div>
          <div className="experience-list">
            {experience.map((job, index) => (
              <details className="job" key={job.company}>
                <summary>
                  <span className="mono index">0{index + 1}</span>
                  <div>
                    <h3>{job.company}</h3>
                    <p className="job-role">{job.role}</p>
                  </div>
                  <span className="mono job-dates">{job.dates}</span>
                  <span className="toggle" aria-hidden="true" />
                </summary>
                <p className="job-description">{job.summary}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-grid" aria-labelledby="contact-heading">
          <a
            className="contact-banner cell"
            href="https://www.linkedin.com/in/derekcook33/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="mono">05 / Next chapter</p>
            <h2 id="contact-heading">
              Let’s build
              <br />
              something that
              <br />
              matters.
            </h2>
            <span className="contact-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          <div className="contact-info cell">
            <p className="mono">Have something in mind?</p>
            <p className="contact-copy">
              Good work starts
              <br />
              with a conversation.
            </p>
            <p className="muted">
              Let’s talk about what you’re building and where I can help.
            </p>
            <div className="social-links mono">
              <a
                href="https://www.linkedin.com/in/derekcook33/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/derek-cook"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer mono">
        <span>© {new Date().getFullYear()} Derek Cook</span>
        <span>Built on a grid. Made to connect.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
