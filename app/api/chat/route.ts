/* eslint-disable @typescript-eslint/no-explicit-any */
import { openai } from '@ai-sdk/openai';
import { DataAPIClient } from "@datastax/astra-db-ts";
import { streamText } from 'ai';
import "dotenv/config";
import { NextRequest} from "next/server";
import OpenAI from 'openai';

const {
  OPENAI_API_KEY,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_KEYSPACE_NAME,
  ASTRA_DB_COLLECTION_NAME,
} = process.env;

const Openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT || "HJ", {
  keyspace: ASTRA_DB_KEYSPACE_NAME,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = "";

    const embedding = await Openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION_NAME || "hg");
      const cursor = collection.find({}, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 10,
      });

      const documents = await cursor.toArray();

      const docsMap = documents?.map((doc: any) => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch (error) {
      console.error("db error", error);
    }

    const template = {
      role: "system",
      content: `
        You are an AI Assistant who knows everything about home automation with bluetooth, wifi and other means of controls (whetehr short range or long range). Use the below context to augument what you know about Home automation. the context would provide you with the most recent data from a couple of websites talking about home automation and how to's. If the context doesn't include the information you need, answer based on your own knowledge and don't mention the source of your information or what the context does or does not include. format responses using markdown where applicable and you can return images.
        -------------
        START CONTEXT
    
        ${docContext}
    
        END CONTEXT
        -------------
    
        QUESTION: ${latestMessage}
    
    ---------------
        `,
    };

    const response = streamText({
        model: openai('gpt-4'),
        messages: [template, ...messages]
    })

    return response.toDataStreamResponse();
  } catch (error: any) {
    console.error(error);
  }
}
