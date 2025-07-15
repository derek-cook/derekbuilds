Derek Cook
Software Engineer - 7 years experience, primarily frontend

Skills
React, Javascript, Typescript, unit testing, integration testing, accessibility, screen reader, i18n, realtime websockets, streaming, performance optimization and caching, HTML, CSS, Tailwind, Node, Next.js, REST, RPC, GraphQL, Cursor/Claude/MCP assisted development.

Experience

Hubspot 2.5 years (Dec 2022 - present)
Senior Software Engineer
- Frontend development for omnichannel features including email, live-chat, calls, forms, calendar, and 3rd party messaging in the Help Desk and Inbox products.
- Realtime feature subject matter expert - created react library tools, documentation, and hosted tech talks for cross-team functionality.
- 1st place in product group AI hackathon, quarterly company-wide award for OOO feature.

Atlassian 1 year (Jun 2021 - Jul 2022)
Software Engineer
- Frontend performance optimization for the Confluence Cloud editor.
- Server-side rendering, bundling optimization, code-splitting, metrics and monitoring.

American Express 3.5 years (Feb 2018 - Jun 2021)
Software Engineer
- Front end development for high traffic Card Account, Flexible Bill Payments, and Credit Limits.
- Lead frontend engineer for new Balance Transfer product.
- Promoted in 2020 based on performance rating in the top 25% of Amex Web engineers.

Education
The University of Arizona, B.S. Computer Science - 2016
Upper Division Courses: Software Engineering, Databases, Algorithms, Compilers

Projects
- Live Cursors
  How it works:
  Each user joins a 'channel'. Cursor positions and text are sent in realtime to the server and broadcasted to all other users in the channel.
  How it was made:
  Live multiplayer cursors, inspired by Figma's cursor chat. I made a simple websocket client on the frontend, similar to Ably. Connections to channels are managed on Cloudflare Durable Objects which supports persistent memory across serverless invocations in a Node isolate runtime.
  Use cases:
  This could be used for collaborative editing, pair programming, or even a multiplayer game. It's a simple and efficient way to share state across clients in real time.

- AI assistant
  How it works:
  A user submits a question and the widget returns an AI-generated answer using a knowledge base. The knowledge base includes details from my resume and projects. 
  How it was made:
  I made a simple generative chatbot using OpenAI's GPT-3.5-turbo model. I originally used langchain to split documents into paragraphs and embed the pieces in a vector db. Then questions could retrieve the most related content and generate an answer with OpenAI. This is overkill for small documents, including the text in a prompt is trivial if the token count is low for the model.
