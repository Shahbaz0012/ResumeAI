import fs from "fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const parseResume = async (
  filePath: string
): Promise<string> => {
  try {
    console.log("Reading PDF:", filePath);

    const data = new Uint8Array(fs.readFileSync(filePath));

    const loadingTask = getDocument({ data });

    const pdf = await loadingTask.promise;

    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item: any) => item.str)
        .join(" ");

      text += pageText + "\n";
    }

    console.log("PDF parsed successfully.");

    return text.trim();

  } catch (error: any) {
    console.error("PDF Parse Error:", error);
    throw new Error(error.message);
  }
};