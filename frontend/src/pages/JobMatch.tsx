import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import api from "../services/api";

interface JobMatchResult {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  summary: string;
}

export default function JobMatch() {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<JobMatchResult | null>(null);

  const analyzeJobMatch = async () => {

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    try {

      setLoading(true);

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

      setResult(response.data.result);

    } catch (error) {

      console.error(error);

      alert("Failed to analyze job match.");

    } finally {

      setLoading(false);

    }

  };  return (
    <div className="flex min-h-screen bg-[#090b12]">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mx-auto max-w-6xl">

          <h1 className="text-5xl font-bold text-white">
            🎯 AI Job Match
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            Compare your resume with any job description using AI.
          </p>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">

            <h2 className="text-2xl font-semibold text-white">
              Job Description
            </h2>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              placeholder="Paste the complete job description here..."
              className="
                mt-6
                h-72
                w-full
                resize-none
                rounded-2xl
                border
                border-white/10
                bg-[#11131c]
                p-5
                text-white
                outline-none
                focus:border-cyan-500
              "
            />

            <button
              onClick={analyzeJobMatch}
              disabled={
                loading ||
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
              {loading
                ? "Analyzing..."
                : "Analyze Job Match"}
            </button>

          </div>          {result && (

            <div className="mt-10 space-y-8">

              <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8 text-center">

                <h2 className="text-2xl font-bold text-white">
                  Match Score
                </h2>

                <p className="mt-4 text-7xl font-bold text-green-400">
                  {result.matchScore}%
                </p>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

                  <h2 className="mb-4 text-xl font-semibold text-green-400">
                    ✅ Matching Skills
                  </h2>

                  <ul className="space-y-2">
                    {result.matchingSkills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-gray-300"
                      >
                        • {skill}
                      </li>
                    ))}
                  </ul>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

                  <h2 className="mb-4 text-xl font-semibold text-red-400">
                    ❌ Missing Skills
                  </h2>

                  <ul className="space-y-2">
                    {result.missingSkills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-gray-300"
                      >
                        • {skill}
                      </li>
                    ))}
                  </ul>

                </div>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

                <h2 className="mb-4 text-xl font-semibold text-cyan-400">
                  💡 AI Suggestions
                </h2>

                <ul className="space-y-2">
                  {result.suggestions.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-300"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

                <h2 className="mb-4 text-xl font-semibold text-white">
                  AI Summary
                </h2>

                <p className="leading-8 text-gray-300">
                  {result.summary}
                </p>

              </div>

            </div>

          )}

          <div className="mt-10 flex justify-center">

            <button
              onClick={() => navigate("/results")}
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
              ← Back to Results
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}