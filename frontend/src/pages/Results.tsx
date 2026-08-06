import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Analysis {
  atsScore: number;
  summary: string;
  skills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  recommendedRoles: string[];
}

export default function Results() {
  const navigate = useNavigate();

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  useEffect(() => {
    const stored =
      localStorage.getItem("analysis");

    if (!stored) {
      navigate("/dashboard");
      return;
    }

    const data = JSON.parse(stored);

    setAnalysis(data.analysis);

  }, [navigate]);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090b12] text-white">
        Loading...
      </div>
    );
  }

  const Card = ({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) => (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="mb-4 text-xl font-semibold text-white">
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-gray-300"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#090b12] px-6 py-10">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-center text-5xl font-bold text-white">
          Resume Analysis
        </h1>

        <p className="mb-10 text-center text-gray-400">
          Your AI-powered resume report
        </p>

        <div className="mb-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 p-8 text-center">

          <h2 className="text-2xl font-semibold text-white">
            ATS Score
          </h2>

          <p className="mt-4 text-7xl font-bold text-cyan-400">
            {analysis.atsScore}
          </p>

          <p className="mt-3 text-gray-300">
            out of 100
          </p>

        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">

          <h2 className="mb-4 text-2xl font-semibold text-white">
            AI Summary
          </h2>

          <p className="leading-8 text-gray-300">
            {analysis.summary}
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <Card
            title="Skills"
            items={analysis.skills}
          />

          <Card
            title="Missing Skills"
            items={analysis.missingSkills}
          />

          <Card
            title="Strengths"
            items={analysis.strengths}
          />

          <Card
            title="Improvements"
            items={analysis.improvements}
          />

          <Card
            title="Recommended Roles"
            items={analysis.recommendedRoles}
          />

        </div>

        <div className="mt-10 flex justify-center">

          <button
            onClick={() => navigate("/dashboard")}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              hover:scale-105
            "
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}