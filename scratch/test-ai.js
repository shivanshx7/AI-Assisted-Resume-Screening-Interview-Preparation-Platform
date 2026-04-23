import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function test() {
  if (!API_KEY || API_KEY.includes("your_gemini")) {
    console.error("❌ No valid API key found in .env");
    return;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  console.log("Testing with model: gemini-1.5-flash...");
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello, are you working?");
    console.log("✅ Success! AI Response:", result.response.text());
  } catch (err) {
    console.error("❌ API Error:", err.message);
    if (err.message.includes("404")) {
      console.log("\nAttempting fallback to 'gemini-1.5-flash-latest'...");
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Hello?");
        console.log("✅ Fallback Success! Use 'gemini-1.5-flash-latest' in your code.");
      } catch (err2) {
        console.error("❌ Fallback failed too:", err2.message);
      }
    }
  }
}

test();
