import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await generateText({
    model: google("models/gemini-2.0-flash-exp"),
    prompt,
    })

  return Response.json({ result: result.text })
}