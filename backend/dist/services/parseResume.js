"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResume = void 0;
const fs_1 = __importDefault(require("fs"));
const pdf_mjs_1 = require("pdfjs-dist/legacy/build/pdf.mjs");
const parseResume = async (filePath) => {
    try {
        console.log("Reading PDF:", filePath);
        const data = new Uint8Array(fs_1.default.readFileSync(filePath));
        const loadingTask = (0, pdf_mjs_1.getDocument)({ data });
        const pdf = await loadingTask.promise;
        let text = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const pageText = content.items
                .map((item) => item.str)
                .join(" ");
            text += pageText + "\n";
        }
        console.log("PDF parsed successfully.");
        return text.trim();
    }
    catch (error) {
        console.error("PDF Parse Error:", error);
        throw new Error(error.message);
    }
};
exports.parseResume = parseResume;
//# sourceMappingURL=parseResume.js.map