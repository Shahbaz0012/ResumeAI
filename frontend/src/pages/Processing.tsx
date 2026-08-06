import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Processing() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(
    "Uploading your resume..."
  );

  useEffect(() => {
    const resumeId = localStorage.getItem("resumeId");

    if (!resumeId) {
      navigate("/dashboard");
      return;
    }

    let polling: ReturnType<typeof setInterval>;

    const fetchResult = async () => {
      try {
        setStatus("AI is analyzing your resume...");

        const token = localStorage.getItem("token");

        const response = await api.get(
          `/resume/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {

          clearInterval(polling);

          localStorage.setItem(
            "analysis",
            JSON.stringify(response.data)
          );

          navigate("/results");

          return;
        }

      } catch (error) {

        console.error(error);

        setStatus(
          "Still analyzing your resume..."
        );
      }
    };

    fetchResult();

    polling = setInterval(
      fetchResult,
      2000
    );
        return () => {
      clearInterval(polling);
    };

  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090b12] px-6">

      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-3xl">

        <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

        <h1 className="mt-8 text-4xl font-bold text-white">
          AI is Analyzing Your Resume
        </h1>

        <p className="mt-4 text-gray-400">
          {status}
        </p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">

          <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>

        </div>

        <div className="mt-8 space-y-2 text-sm text-gray-500">

          <p>✓ Extracting resume text</p>

          <p>✓ Calculating ATS score</p>

          <p>✓ Finding skills</p>

          <p>✓ Generating AI suggestions</p>

          <p>✓ Preparing your report</p>

        </div>

        <p className="mt-8 text-xs text-gray-600">
          Please wait... this usually takes 5–15 seconds.
        </p>

      </div>

    </div>
  );
}