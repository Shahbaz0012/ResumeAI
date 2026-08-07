import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Analysis {
  atsScore: number;
  summary: string;
  skills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  recommendedRoles: string[];
}

interface JobMatchResult {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  summary: string;
}

export default function Results() {
  const navigate = useNavigate();

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [jobMatch, setJobMatch] =
    useState<JobMatchResult | null>(null);

  const [matching, setMatching] =
    useState(false);

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

  const analyzeJobMatch = async () => {

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    try {

      setMatching(true);

      const token =
        localStorage.getItem("token");

      const resumeId =
        localStorage.getItem("resumeId");

      const response =
        await api.post(
          "/job/match",
          {
            resumeId,
            jobDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setJobMatch(
        response.data.result
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to analyze job match."
      );

    } finally {

      setMatching(false);

    }

  };  if (!analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090b12] text-2xl text-white">
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

        </div>        {/* =========================
            AI Job Match
        ========================= */}

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-8">

          <h2 className="text-3xl font-bold text-white">
            🎯 AI Job Match
          </h2>

          <p className="mt-2 text-gray-400">
            Compare your resume with any job description using AI.
          </p>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            placeholder="Paste the complete job description here..."
            className="
              mt-6
              h-56
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
            onClick={analyzeJobMatch}
            disabled={
              matching ||
              !jobDescription.trim()
            }
            className="
              mt-6
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
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {matching
              ? "Analyzing..."
              : "Analyze Job Match"}
          </button>

        </div>

        {jobMatch && (

          <div className="mt-10 space-y-8">

            <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8 text-center">

              <h2 className="text-2xl font-bold text-white">
                Match Score
              </h2>

              <p className="mt-4 text-7xl font-bold text-green-400">
                {jobMatch.matchScore}%
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <Card
                title="✅ Matching Skills"
                items={jobMatch.matchingSkills}
              />

              <Card
                title="❌ Missing Skills"
                items={jobMatch.missingSkills}
              />

            </div>

            <Card
              title="💡 AI Suggestions"
              items={jobMatch.suggestions}
            />

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

              <h2 className="mb-4 text-2xl font-semibold text-white">
                AI Job Match Summary
              </h2>

              <p className="leading-8 text-gray-300">
                {jobMatch.summary}
              </p>

            </div>

          </div>

        )}        <div className="mt-10 flex justify-center">

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