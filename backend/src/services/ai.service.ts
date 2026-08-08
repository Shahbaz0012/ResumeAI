import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface AIAnalysis {
  atsScore: number;
  summary: string;
  skills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  recommendedRoles: string[];
}

// Utility to pause execution
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyzeResume = async (resumeText: string): Promise<AIAnalysis> => {
  // 1. Truncate input to protect your 12,000 TPM limit. 
  // 24,000 chars is roughly 6,000 tokens. This leaves room for the 1,500 max_tokens output
  // and allows you to run at least ~1-2 requests per minute safely.
  const MAX_CHARS = 24000; 
  const safeResumeText = resumeText.length > MAX_CHARS 
    ? resumeText.substring(0, MAX_CHARS) 
    : resumeText;

  const prompt = `You are an expert ATS Resume Analyzer.
Analyze the resume carefully.
Return ONLY valid JSON.
DO NOT write markdown.
DO NOT write explanation.
DO NOT use \`\`\`.

JSON format:
{
"atsScore": 0,
"summary": "",
"skills": [],
"missingSkills": [],
"strengths": [],
"improvements": [],
"recommendedRoles": []
}

Resume:
${safeResumeText}`;

  // Retry logic configuration
  const MAX_RETRIES = 3;
  let attempt = 0;
  let delay = 5000; // Start with a 5-second delay if rate limited

  while (attempt <= MAX_RETRIES) {
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        // Reduced slightly to save tokens, adjust if your JSON gets cut off
        max_tokens: 1200, 
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = completion.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No AI response received.");
      }

      let parsed: AIAnalysis;
      try {
        parsed = JSON.parse(content);
      } catch {
        // Fallback: Sometimes the AI wraps JSON in markdown despite instructions
        const cleanedContent = content.replace(/```json\n?|```/g, "").trim();
        parsed = JSON.parse(cleanedContent);
      }

      return {
        atsScore: typeof parsed.atsScore === "number" ? parsed.atsScore : 0,
        summary: parsed.summary || "No summary generated.",
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
        recommendedRoles: Array.isArray(parsed.recommendedRoles) ? parsed.recommendedRoles : [],
      };

    } catch (error: any) {
      // 2. Handle Rate Limits (429) with Exponential Backoff
      if (error?.status === 429 && attempt < MAX_RETRIES) {
        console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds... (Attempt ${attempt + 1} of ${MAX_RETRIES})`);
        await sleep(delay);
        delay *= 2; // Double the wait time for the next potential failure (Exponential Backoff)
        attempt++;
      } else {
        console.error("========== AI ERROR ==========");
        console.error(error);
        throw new Error(error.message || "AI analysis failed.");
      }
    }
  }

  throw new Error("Failed to analyze resume after maximum retries.");
};