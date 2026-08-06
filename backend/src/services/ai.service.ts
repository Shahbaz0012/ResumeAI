import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface AIAnalysis {
  atsScore: number;
  summary: string;
  skills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  recommendedRoles: string[];
}

export const analyzeResume = async (
  resumeText: string
): Promise<AIAnalysis> => {
  try {

    const prompt = `
You are an expert ATS Resume Analyzer.

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

${resumeText}
`;

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 0.2,

        max_tokens: 1500,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

      });

    const content =
      completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error(
        "No AI response received."
      );
    }
        let parsed: AIAnalysis;

    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("AI returned invalid JSON.");
    }

    return {
      atsScore:
        typeof parsed.atsScore === "number"
          ? parsed.atsScore
          : 0,

      summary:
        parsed.summary || "No summary generated.",

      skills:
        Array.isArray(parsed.skills)
          ? parsed.skills
          : [],

      missingSkills:
        Array.isArray(parsed.missingSkills)
          ? parsed.missingSkills
          : [],

      strengths:
        Array.isArray(parsed.strengths)
          ? parsed.strengths
          : [],

      improvements:
        Array.isArray(parsed.improvements)
          ? parsed.improvements
          : [],

      recommendedRoles:
        Array.isArray(parsed.recommendedRoles)
          ? parsed.recommendedRoles
          : [],
    };

  } catch (error: any) {

    console.error(
      "========== AI ERROR =========="
    );

    console.error(error);

    throw new Error(
      error.message || "AI analysis failed."
    );

  }
};