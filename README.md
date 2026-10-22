# derekbuilds.ai

Derek Cook's portfolio, built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_WEBSITE_URL` in `.env.local` for metadata, robots, and sitemap URLs.

## Flight tracker demo

The Flight Tracker section embeds Nexus, which runs as a separate app. By
default, it loads `https://nexus-delta-ruby.vercel.app/embed/lax`.

To use another host, set `NEXUS_EMBED_URL` in `.env.local` before building. Nexus
must allow framing from the portfolio's origin. Rebuild the portfolio after
changing the URL because the homepage is prerendered.
