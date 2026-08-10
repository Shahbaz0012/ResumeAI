"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchResumeWithJob = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
const matchResumeWithJob = async (resume, jobDescription) => {
    const prompt = `
You are an ATS Resume Matching AI.

Compare the resume with the job description.

Return ONLY valid JSON.

{
  "matchScore": number,
  "matchingSkills": [],
  "missingSkills": [],
  "suggestions": [],
  "summary": ""
}

Resume:

${resume}

Job Description:

${jobDescription}
`;
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.2,
    });
    const response = completion.choices[0]?.message
        ?.content;
    if (!response) {
        throw new Error("No response received from AI.");
    }
    let result;
    try {
        result = JSON.parse(response);
    }
    catch {
        const cleaned = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        result = JSON.parse(cleaned);
    }
    if (typeof result.matchScore !==
        "number") {
        throw new Error("Invalid AI response.");
    }
    return {
        matchScore: result.matchScore ?? 0,
        matchingSkills: Array.isArray(result.matchingSkills)
            ? result.matchingSkills
            : [],
        missingSkills: Array.isArray(result.missingSkills)
            ? result.missingSkills
            : [],
        suggestions: Array.isArray(result.suggestions)
            ? result.suggestions
            : [],
        summary: result.summary ??
            "No summary available.",
    };
};
exports.matchResumeWithJob = matchResumeWithJob;
//# sourceMappingURL=jobMatch.service.js.map