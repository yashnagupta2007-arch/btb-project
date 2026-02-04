import { GoogleGenerativeAI } from "@google/generative-ai";

// 👇 FORCE API VERSION TO v1
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1",
});

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});
