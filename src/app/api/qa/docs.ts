export const resume = `
# Derek Cook
**Email**: derekcdev@gmail.com  
**Availability**: Open to relocation, on-site or remote

## Summary

I have 6 years of professional experience primarily with building performant, accessible, and fully tested React-based front ends.

## Education

**The University of Arizona**  
_B.S. Computer Science - 2016_  
Upper Division Courses: Software Engineering, Databases, Algorithms, Compilers

## Skills

- **Front End**
  - React, Javascript (Typescript), Jest, react-testing-library, Mocha integration testing, Accessibility, i18n, real-time performance optimization (caching, code-splitting, bundling), HTML/CSS
- **Back End**
  - Node, NextJS, PostgresQL, Prisma, REST, RPC, serverless, CI/CD

## Professional Experience

**Senior Software Engineer** - HubSpot (Remote/Los Angeles CA, Dec 2022 - present)

- Front-end web development for routing livechat messages and Helpdesk tickets to our customers' teams.
- Both full and collaborative ownership of high-traffic real-time features and libraries.
- Led the frontend development of Skills-based Routing for Helpdesk enterprise (greenfield).

**Software Engineer** - Atlassian (Remote/Phoenix AZ, June 2021 - July 2022)

- Front-end development on the Performance and Platform team for Confluence Cloud.
- Implement performance optimizations and metrics for the React SSR-enabled web app.

**Software Engineer** - American Express (Phoenix AZ, Feb 2018 - June 2021)

- Develop and test card account products including Flexible Payments, Credit Limits, and Balance Transfer.
- Implemented performant form validation, a11y analytics, and financial compliance across 12 locales.
- Promoted in 2020 based on performance rating in the top 25% of Amex Web engineers.

**Software Engineer and Co-founder** - Coins (Los Angeles CA, Feb 2017 - Dec 2017)

- Coins (coins-app.netlify.app - decommissioned) is a web and mobile app for tracking cryptocurrency portfolios.
- Full ownership of implementing the React front end for the web app, supporting hundreds of currencies.

## Projects

- **Nutrition Label**: Alexa skill for requesting nutritional info using Wolfram Alpha API and Node.js, individually developed and published on the Alexa skill store in March 2017.
- **Amazon Coding Competition 2016**: 3rd place team; we built an Alexa skill that tracks nutritional info with Node.js on an AWS Lambda function.
- **Hack Arizona 2015 and 2016**: Projects include a mobile app for nutrition requests with Wolfram API.`;

export const projectDetails = {
  pools: `
  \n\nProject: Pools
  
  \n\nHow it works:
  \nTopic similarity is determined by comparing the embedding of a
  topic in a vector database using dot-product comparison. If
  the result is greater than the threshold, the most similar
  topic is joined instead. Otherwise, a new conversation is
  created.

  \n\n How it was made:
  \n I used OpenAI to generate embeddings for topic and a Supabase pgvector database to store the embeddings.
  Langchain was used to facilitate the retrieval of the most similar topic.

  \n\nUse cases:
  \n One use case is a student discussion board. Normally you'd create a new discussion on a lecture topic and others would search for it and join.
  This would eliminate the need to manage and curate discussions. 
  Students can simply enter the topic and be joined with others, whether if they enter 'CS finals' or 'CS 101 final exams'.
  People often post duplicate questions. This embedding retrieval strategy could be used to deduplicate questions.`,
  liveCursors: `
  \n\nProject: Live Cursors
  
  \n\nHow it works:
  \n Each user joins a 'channel'. Cursor positions and text are sent in realtime to the server and broadcasted to all other users in the channel.

  \n\n How it was made:
  \n Live multiplayer cursors, inspired by Figma's cursor chat. I made a simple websocket client on the frontend, similar to Ably. Connections to channels are managed on Cloudflare Durable Objects which supports persistent memory across serverless invocations in a Node isolate runtime.

  \n\nUse cases:
  \n This could be used for collaborative editing, pair programming, or even a multiplayer game. It's a simple and efficient way to share state across clients in real time.`,
  qaWidget: `
  \n\nProject: QA Widget - Ask about my work
  \n\nHow it works:
  \n A user submits a question and the widget returns an AI-generated answer using a knowledge base. The knowledge base includes details from my resume and projects. 
  
  \n\nHow it was made:
  \nI made a simple generative chatbot using OpenAI's GPT-3.5-turbo model. I originally used langchain to split documents into paragraphs and embed the pieces in a vector db. Then questions could retrieve the most related content and generate an answer with OpenAI. This is overkill for small documents, including the text in a prompt is trivial if the token count is low for the model.
  \n\n
  `,
  other: ``,
};
