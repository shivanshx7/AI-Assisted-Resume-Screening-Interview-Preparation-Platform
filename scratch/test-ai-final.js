import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function test() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  console.log("Testing with verified model: gemini-2.0-flash...");
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hello, respond with 'System Online' if you can read this.");
    console.log("✅ API Success! Response:", result.response.text());
  } catch (err) {
    console.error("❌ API Error:", err.message);
  }
}

test();
