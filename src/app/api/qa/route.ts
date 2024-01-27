import { OpenAIStream, StreamingTextResponse } from "ai";
import { type NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export const POST = async (req: NextRequest) => {
  const { prompt } = (await req.json()) as { prompt: string };

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
        You are an assistant that will answer questions about the resume.
        Answer in the first person, keep answers under 200 characters.
        If you don't know the answer, say 'I don't know'.\n\n
        Resume markdown:\n
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
- **Hack Arizona 2015 and 2016**: Projects include a mobile app for nutrition requests with Wolfram API.
\n\n
      `,
      },
      { role: "user", content: prompt },
    ],
    stream: true,
  });
  const stream = OpenAIStream(completion);
  return new StreamingTextResponse(stream);
};
