import { Dispatch, SetStateAction } from "react";

interface JobDescriptionBoxProps {
  jobDescription: string;

  setJobDescription: Dispatch<
    SetStateAction<string>
  >;

  onAnalyze: () => void;

  loading: boolean;
}

export default function JobDescriptionBox({
  jobDescription,
  setJobDescription,
  onAnalyze,
  loading,
}: JobDescriptionBoxProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Job Description
      </h2>

      <textarea
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(
            e.target.value
          )
        }
        placeholder="Paste the complete job description here..."
        className="
          h-72
          w-full
          rounded-2xl
          border
          border-white/10
          bg-[#11131c]
          p-5
          text-white
          outline-none
          resize-none
        "
      />
            <button
        onClick={onAnalyze}
        disabled={
          loading ||
          !jobDescription.trim()
        }
        className="
          mt-6
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          px-6
          py-4
          text-lg
          font-semibold
          text-white
          transition-all
          hover:scale-[1.02]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Analyzing..."
          : "Analyze Match"}
      </button>

    </div>
  );
}