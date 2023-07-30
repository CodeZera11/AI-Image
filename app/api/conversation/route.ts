import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { messages } = await body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured!", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required!!!", { status: 400 });
    }

    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages,
    // });
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "what is 2+2",
        },
      ],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    return NextResponse.json(
      { "Internal Server Error!": error },
      { status: 500 }
    );
  }
}
