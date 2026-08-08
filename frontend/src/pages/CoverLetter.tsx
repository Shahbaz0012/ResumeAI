import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";

export default function CoverLetter() {
  const navigate = useNavigate();

  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] =
    useState("");

  const [coverLetter, setCoverLetter] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
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

  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      setError(
        "Please enter the job description."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      const response =
        await api.post(
          "/cover-letter/generate",
          {
            resumeId,
            jobDescription,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setCoverLetter(
        response.data.coverLetter
      );

    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to generate cover letter."
      );

    } finally {
      setLoading(false);
    }
  };  return (
    <div className="flex min-h-screen bg-[#090b12]">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mx-auto max-w-6xl">

          {/* Header */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold text-white">
              ✉️ AI Cover Letter Generator
            </h1>

            <p className="mt-3 text-lg text-gray-400">
              Create a personalized cover letter
              tailored to your target job.
            </p>

          </div>

          {/* Job Description */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

            <h2 className="mb-3 text-2xl font-bold text-white">
              Job Description
            </h2>

            <p className="mb-6 text-gray-400">
              Paste the job description you are
              applying for.
            </p>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              placeholder="Paste the job description here..."
              rows={12}
              className="
                w-full
                resize-none
                rounded-2xl
                border
                border-white/10
                bg-black/20
                p-5
                text-white
                outline-none
                placeholder:text-gray-600
                focus:border-cyan-400
              "
            />

            {error && (
              <div className="
                mt-4
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                p-4
                text-red-400
              ">
                {error}
              </div>
            )}

            <div className="mt-6">

              <button
                onClick={generateCoverLetter}
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
                  ? "Generating..."
                  : "✨ Generate Cover Letter"}
              </button>

            </div>

          </div>          {/* Generated Cover Letter */}

          {coverLetter && (
            <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-white/[0.04] p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    ✨ Generated Cover Letter
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Your AI-generated personalized cover letter.
                  </p>

                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      coverLetter
                    );

                    alert(
                      "Cover letter copied to clipboard!"
                    );
                  }}
                  className="
                    rounded-xl
                    border
                    border-cyan-500/40
                    px-5
                    py-3
                    font-semibold
                    text-cyan-300
                    transition
                    hover:bg-cyan-500/10
                  "
                >
                  📋 Copy
                </button>

              </div>

              <div className="
                mt-8
                rounded-2xl
                border
                border-white/10
                bg-black/20
                p-8
              ">

                <p className="
                  whitespace-pre-wrap
                  leading-8
                  text-gray-300
                ">
                  {coverLetter}
                </p>

              </div>

            </div>
          )}          {/* Navigation */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

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
                transition
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