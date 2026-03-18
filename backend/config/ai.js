import OpenAI from "openai";

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

console.log("AI Config initialized with Key:", process.env.OPENAI_API_KEY ? "FOUND" : "MISSING");

export default ai;
