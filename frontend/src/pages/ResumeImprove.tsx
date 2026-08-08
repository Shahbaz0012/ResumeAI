import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import api from "../services/api";

interface Improvement {
  professionalSummary: string;
  improvedSkills: string[];
  experienceRewrite: string;
  projectSuggestions: string[];
  atsKeywords: string[];
  finalTips: string[];
}

export default function ResumeImprove() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [improvement, setImprovement] =
    useState<Improvement | null>(null);

  const [resumeId, setResumeId] =
    useState("");

  useEffect(() => {

    const id =
      localStorage.getItem("resumeId");

    if (!id) {
      navigate("/history");
      return;
    }

    setResumeId(id);

  }, [navigate]);

  const improveResume = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await api.post(
          "/improve/resume",
          {
            resumeId,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setImprovement(
        response.data.improvement
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to improve resume."
      );

    } finally {

      setLoading(false);

    }

  };  return (
    <div className="flex min-h-screen bg-[#090b12]">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mx-auto max-w-6xl">

          <h1 className="text-5xl font-bold text-white">
            ✨ AI Resume Improvement
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            Let AI improve your resume professionally for better ATS score and interview chances.
          </p>

          <div className="mt-10">

            <button
              onClick={improveResume}
              disabled={loading}
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Improving Resume..."
                : "✨ Improve Resume"}
            </button>

          </div>

          {improvement && (

            <div className="mt-10 space-y-8">

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

                <h2 className="mb-4 text-2xl font-bold text-cyan-400">
                  Professional Summary
                </h2>

                <p className="leading-8 text-gray-300">
                  {improvement.professionalSummary}
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

                <h2 className="mb-4 text-2xl font-bold text-green-400">
                  Improved Skills
                </h2>

                <ul className="space-y-2">

                  {improvement.improvedSkills.map(
                    (skill, index) => (
                      <li
                        key={index}
                        className="text-gray-300"
                      >
                        • {skill}
                      </li>
                    )
                  )}

                </ul>

              </div>              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

                <h2 className="mb-4 text-2xl font-bold text-yellow-400">
                  Experience Rewrite
                </h2>

                <p className="leading-8 text-gray-300">
                  {improvement.experienceRewrite}
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

                <h2 className="mb-4 text-2xl font-bold text-purple-400">
                  Project Suggestions
                </h2>

                <ul className="space-y-2">

                  {improvement.projectSuggestions.map(
                    (project, index) => (
                      <li
                        key={index}
                        className="text-gray-300"
                      >
                        • {project}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

                <h2 className="mb-4 text-2xl font-bold text-orange-400">
                  ATS Keywords
                </h2>

                <div className="flex flex-wrap gap-3">

                  {improvement.atsKeywords.map(
                    (keyword, index) => (
                      <span
                        key={index}
                        className="
                          rounded-full
                          bg-cyan-500/20
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-cyan-300
                        "
                      >
                        {keyword}
                      </span>
                    )
                  )}

                </div>

              </div>              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

                <h2 className="mb-4 text-2xl font-bold text-blue-400">
                  Final Tips
                </h2>

                <ul className="space-y-3">

                  {improvement.finalTips.map(
                    (tip, index) => (
                      <li
                        key={index}
                        className="text-gray-300"
                      >
                        • {tip}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

          )}

          <div className="mt-10 flex justify-center gap-4">

            <button
              onClick={() => navigate("/history")}
              className="
                rounded-2xl
                border
                border-white/10
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                hover:bg-white/5
              "
            >
              ← Back to History
            </button>

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
              Dashboard
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}