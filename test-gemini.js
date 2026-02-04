import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

async function run() {
  const result = await model.generateContent("Say hello in one sentence.");
  console.log(result.response.text());
}

run();
