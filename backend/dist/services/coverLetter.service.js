"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCoverLetter = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
const generateCoverLetter = async (resume, jobDescription) => {
    const prompt = `
You are an expert career coach and professional
cover letter writer.

Create a professional, concise and personalized
cover letter based on the candidate's resume and
the provided job description.

Rules:
- Do not invent experience.
- Use only information supported by the resume.
- Highlight skills relevant to the job.
- Keep the tone professional and confident.
- Avoid generic filler.
- Return ONLY the cover letter text.
- Do not use markdown code blocks.

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
        temperature: 0.4,
    });
    const response = completion.choices[0]?.message?.content;
    if (!response) {
        throw new Error("No response received from AI.");
    }
    return response.trim();
};
exports.generateCoverLetter = generateCoverLetter;
//# sourceMappingURL=coverLetter.service.js.map