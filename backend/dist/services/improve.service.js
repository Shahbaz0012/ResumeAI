"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.improveResume = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
// ==========================================
// PREPARE RESUME TEXT
// ==========================================
const prepareResumeText = (resume) => {
    if (!resume) {
        return "";
    }
    let cleanedText = resume
        .replace(/\r/g, " ")
        .replace(/\n+/g, "\n")
        .replace(/[ \t]+/g, " ")
        .trim();
    /*
     * Groq TPM protection.
     *
     * 20,000 characters keeps the request
     * comfortably below the 12,000 TPM limit
     * for normal resumes.
     */
    const MAX_RESUME_CHARACTERS = 20000;
    if (cleanedText.length >
        MAX_RESUME_CHARACTERS) {
        console.warn(`Resume text too large (${cleanedText.length} characters). ` +
            `Truncating to ${MAX_RESUME_CHARACTERS} characters.`);
        cleanedText =
            cleanedText.substring(0, MAX_RESUME_CHARACTERS);
    }
    return cleanedText;
};
// ==========================================
// RESUME IMPROVEMENT
// ==========================================
const improveResume = async (resume) => {
    try {
        const preparedResume = prepareResumeText(resume);
        if (!preparedResume) {
            throw new Error("Resume text is empty.");
        }
        // ==========================================
        // AI PROMPT
        // ==========================================
        const prompt = `
You are an expert ATS Resume Writer and Career Coach.

Improve the resume professionally while preserving
the candidate's real experience and skills.

Focus on:
- Professional summary
- Stronger skills presentation
- Better experience wording
- Relevant project ideas
- ATS keywords
- Practical final recommendations

Do not invent employment history,
education, certifications, or achievements.

Return ONLY valid JSON.

DO NOT write markdown.
DO NOT write explanations.
DO NOT use code fences.

Use exactly this structure:

{
  "professionalSummary": "",
  "improvedSkills": [],
  "experienceRewrite": "",
  "projectSuggestions": [],
  "atsKeywords": [],
  "finalTips": []
}

All array fields must contain strings.

Resume:

${preparedResume}
`;
        // ==========================================
        // GROQ REQUEST
        // ==========================================
        console.log("Sending resume to Groq for improvement...");
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 1800,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        console.log("Resume improvement response received.");
        const response = completion.choices[0]
            ?.message
            ?.content;
        if (!response) {
            throw new Error("No response received from AI.");
        }
        let result; // ==========================================
        // PARSE AI RESPONSE
        // ==========================================
        try {
            result =
                JSON.parse(response);
        }
        catch {
            const cleaned = response
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();
            try {
                result =
                    JSON.parse(cleaned);
            }
            catch (parseError) {
                console.error("AI returned invalid JSON:");
                console.error(response);
                throw new Error("AI returned invalid JSON.");
            }
        }
        // ==========================================
        // VALIDATE + NORMALIZE RESULT
        // ==========================================
        return {
            professionalSummary: typeof result.professionalSummary ===
                "string"
                ? result.professionalSummary
                : "",
            improvedSkills: Array.isArray(result.improvedSkills)
                ? result.improvedSkills
                : [],
            experienceRewrite: typeof result.experienceRewrite ===
                "string"
                ? result.experienceRewrite
                : "",
            projectSuggestions: Array.isArray(result.projectSuggestions)
                ? result.projectSuggestions
                : [],
            atsKeywords: Array.isArray(result.atsKeywords)
                ? result.atsKeywords
                : [],
            finalTips: Array.isArray(result.finalTips)
                ? result.finalTips
                : [],
        };
    }
    catch (error) {
        console.error("========== RESUME IMPROVEMENT AI ERROR ==========");
        console.error(error);
        throw new Error(error.message ||
            "Resume improvement failed.");
    }
};
exports.improveResume = improveResume;
//# sourceMappingURL=improve.service.js.map