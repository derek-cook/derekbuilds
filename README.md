# derekbuilds.ai

Derek Cook's portfolio, built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_WEBSITE_URL` in `.env.local` for metadata, robots, and sitemap URLs.

## Flight tracker demo

The Flight Tracker section embeds Nexus, which runs as a separate app. Start
Nexus on port 5173 alongside this site's development server; the iframe defaults
to `http://localhost:5173/embed/lax` in development.

To use another host, set `NEXUS_EMBED_URL` in `.env.local`. For production, deploy
Nexus first and set this variable to its HTTPS `/embed/lax` URL before building
and deploying this site. Nexus must allow framing from the portfolio's origin.
Rebuild the portfolio after changing the URL because the homepage is prerendered.
Without a production URL, the section displays an unavailable message.
