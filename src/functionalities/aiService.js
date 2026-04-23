import { GoogleGenerativeAI } from "@google/generative-ai";
import { getStudents, getStudentById } from "../data/firebaseService";

// Initialize Gemini - teacher should add their own key via env or settings
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Builds a rich context string from Firebase student data
 */
export const buildStudentContext = async () => {
  const students = await getStudents();
  if (!students || students.length === 0) {
    return "No student data is currently available in the database.";
  }

  const classStats = {
    total: students.length,
    avgEngagement: Math.round(
      students.reduce((a, s) => a + (s.engagementScore || 0), 0) / students.length
    ),
    atRisk: students.filter((s) => s.atRisk).length,
    highPerformers: students.filter((s) => s.category === "High").length,
    mediumPerformers: students.filter((s) => s.category === "Medium").length,
    lowPerformers: students.filter((s) => s.category === "Low").length,
  };

  const studentSummaries = students.map((s) => {
    const weekly = Array.isArray(s.weeklyHistory) ? s.weeklyHistory.join(", ") : "N/A";
    const sentiment = Array.isArray(s.sentimentHistory)
      ? s.sentimentHistory.join(", ")
      : s.sentiment || "N/A";
    return `- ${s.name} (ID: ${s.id})
    Engagement: ${s.engagementScore}%, Participation: ${s.participation}%, Quiz Score: ${s.quizScore}%
    Category: ${s.category}, At Risk: ${s.atRisk ? "YES" : "No"}, Sentiment: ${sentiment}
    Weekly History: [${weekly}]`;
  });

  return `CLASS OVERVIEW — CS101
Total Students: ${classStats.total}
Average Engagement: ${classStats.avgEngagement}%
At-Risk Students: ${classStats.atRisk}
High Performers: ${classStats.highPerformers} | Medium: ${classStats.mediumPerformers} | Low (Critical): ${classStats.lowPerformers}

INDIVIDUAL STUDENT DATA:
${studentSummaries.join("\n\n")}`;
};

/**
 * Sends a message to Gemini with full student context injected as system prompt
 */
export const sendMessageToAI = async (userMessage, chatHistory = []) => {
  if (!genAI) {
    return {
      text: "⚠️ **AI not configured.** Please add your `VITE_GEMINI_API_KEY` to a `.env` file in the project root and restart the dev server.\n\nExample:\n```\nVITE_GEMINI_API_KEY=your_key_here\n```\n\nGet a free key at https://aistudio.google.com",
      isError: true,
    };
  }

  try {
    const context = await buildStudentContext();

    const systemPrompt = `You are CogniTrack AI, an intelligent student engagement and performance assistant for teachers.
You have access to real-time data from the Firebase Firestore database for class CS101.
Use this data to answer teacher questions, provide insights, flag concerns, and give actionable recommendations.

Always be helpful, specific, and data-driven. When referencing students, use their actual names and IDs.
When a teacher asks about generating a report, confirm what type (weekly/monthly, student/class) and tell them to use the "Generate Report" button below.

CURRENT DATABASE SNAPSHOT:
${context}

Guidelines:
- Answer questions about specific students using their actual data
- Identify at-risk students and explain why
- Provide engagement trend insights
- Suggest interventions for low-performing students
- Be concise but thorough
- Format responses with markdown (bold, bullet points, etc.) for readability`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
    });

    // Build history in Gemini format
    const formattedHistory = chatHistory
      .filter((_, i) => i < chatHistory.length - 1) // exclude last
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        {
          role: "model",
          parts: [
            {
              text:
                "Understood. I am CogniTrack AI. I have loaded the current student database snapshot and am ready to assist you with student engagement analysis, performance insights, and reports. How can I help you today?",
            },
          ],
        },
        ...formattedHistory,
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return { text: response.text(), isError: false };
  } catch (err) {
    console.error("AI error:", err);
    return {
      text: `❌ Error communicating with AI: ${err.message}. Please check your API key and network connection.`,
      isError: true,
    };
  }
};

/**
 * Returns a student by name or id (case-insensitive search)
 */
export const findStudentByQuery = async (query) => {
  const students = await getStudents();
  const q = query.toLowerCase().trim();
  return students.find(
    (s) =>
      s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
  );
};
