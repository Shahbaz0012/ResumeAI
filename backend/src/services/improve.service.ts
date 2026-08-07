import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const improveResume = async (
  resume: string
) => {

  const prompt = `
You are an expert ATS Resume Writer and Career Coach.

Your task is to improve the resume professionally.

Return ONLY valid JSON.

{
  "professionalSummary": "",
  "improvedSkills": [],
  "experienceRewrite": "",
  "projectSuggestions": [],
  "atsKeywords": [],
  "finalTips": []
}

Resume:

${resume}
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.3,
    });

  const response =
    completion.choices[0]?.message
      ?.content;  if (!response) {
    throw new Error(
      "No response received from AI."
    );
  }

  let result;

  try {

    result = JSON.parse(response);

  } catch {

    const cleaned =
      response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    result = JSON.parse(cleaned);

  }

  if (
    typeof result.professionalSummary !==
    "string"
  ) {
    throw new Error(
      "Invalid AI response."
    );
  }  return {
    professionalSummary:
      result.professionalSummary ?? "",

    improvedSkills:
      Array.isArray(
        result.improvedSkills
      )
        ? result.improvedSkills
        : [],

    experienceRewrite:
      result.experienceRewrite ?? "",

    projectSuggestions:
      Array.isArray(
        result.projectSuggestions
      )
        ? result.projectSuggestions
        : [],

    atsKeywords:
      Array.isArray(
        result.atsKeywords
      )
        ? result.atsKeywords
        : [],

    finalTips:
      Array.isArray(
        result.finalTips
      )
        ? result.finalTips
        : [],
  };
};