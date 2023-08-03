import { checkApiLimit, increaseApiLimit } from "@/lib/api_limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const { prompt } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
          num_outputs: 4,
          width: 1024,
          height: 1024,
          refine: "expert_ensemble_refiner",
        },
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
