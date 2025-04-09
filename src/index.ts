import { Agentica } from "@agentica/core";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import typia from "typia";

import { GmailService } from "@wrtnlabs/connector-gmail";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "Gmail Connector",
      protocol: "class",
      application: typia.llm.application<GmailService, "chatgpt">(),
      execute: new GmailService({
        googleClientId: process.env.GMAIL_CLIENT_ID!,
        googleClientSecret: process.env.GMAIL_CLIENT_SECRET!,
        googleRefreshToken: process.env.GMAIL_REFRESH_TOKEN!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
