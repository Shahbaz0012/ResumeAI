import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Upload() {

  const navigate = useNavigate();

  const [file, setFile] =
    useState<File | null>(null);

  const [title, setTitle] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setError("");

    if (
      selectedFile.type !==
      "application/pdf"
    ) {
      setFile(null);

      setError(
        "Please select a PDF file."
      );

      event.target.value = "";

      return;
    }

    setFile(selectedFile);

    if (!title.trim()) {
      setTitle(
        selectedFile.name
          .replace(".pdf", "")
      );
    }
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {

    event.preventDefault();

    if (!file) {
      setError(
        "Please select a PDF resume."
      );

      return;
    }

    try {

      setLoading(true);

      setError("");

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "resume",
        file
      );

      formData.append(
        "title",
        title.trim() ||
          file.name
      );

      const response =
        await api.post(
          "/resume/upload",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const resume =
        response.data.resume;

      const analysis =
        response.data.analysis;

      if (resume?.id) {
        localStorage.setItem(
          "resumeId",
          resume.id
        );
      }

      localStorage.setItem(
        "analysis",
        JSON.stringify({
          resume,
          analysis,
        })
      );

      navigate("/results");

    } catch (error: any) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to upload resume."
      );

    } finally {

      setLoading(false);

    }
  };  return (
    <div className="min-h-screen bg-[#090b12] px-6 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-10 text-center">

          <h1 className="
            text-5xl
            font-bold
            text-white
          ">
            Analyze Your Resume
          </h1>

          <p className="
            mt-4
            text-lg
            text-gray-400
          ">
            Upload your resume and let AI
            analyze it for ATS optimization.
          </p>

        </div>

        {/* Upload Card */}

        <form
          onSubmit={handleSubmit}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-8
            shadow-2xl
            md:p-10
          "
        >

          {/* Title */}

          <div className="mb-8">

            <label
              htmlFor="resume-title"
              className="
                mb-3
                block
                text-sm
                font-semibold
                text-gray-300
              "
            >
              Resume Title
            </label>

            <input
              id="resume-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="e.g. Software Engineer Resume"
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-[#11131c]
                px-5
                py-4
                text-white
                outline-none
                transition
                focus:border-cyan-500/50
                focus:ring-2
                focus:ring-cyan-500/20
              "
            />

          </div>

          {/* PDF Upload */}

          <div>

            <label
              htmlFor="resume-file"
              className="
                flex
                min-h-[280px]
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-3xl
                border-2
                border-dashed
                border-cyan-500/30
                bg-cyan-500/[0.03]
                px-6
                py-12
                text-center
                transition-all
                hover:border-cyan-400/60
                hover:bg-cyan-500/[0.06]
              "
            >

              <div className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-3xl
                bg-cyan-500/10
                text-4xl
              ">
                📄
              </div>

              {file ? (

                <>
                  <h2 className="
                    mt-6
                    max-w-full
                    truncate
                    text-xl
                    font-semibold
                    text-white
                  ">
                    {file.name}
                  </h2>

                  <p className="
                    mt-2
                    text-sm
                    text-cyan-300
                  ">
                    {(file.size / 1024 / 1024)
                      .toFixed(2)}{" "}
                    MB
                  </p>

                  <p className="
                    mt-3
                    text-sm
                    text-gray-400
                  ">
                    Click to choose a
                    different PDF
                  </p>
                </>

              ) : (

                <>
                  <h2 className="
                    mt-6
                    text-2xl
                    font-semibold
                    text-white
                  ">
                    Choose your resume
                  </h2>

                  <p className="
                    mt-2
                    text-gray-400
                  ">
                    Click here to select a PDF
                    from your computer.
                  </p>

                  <p className="
                    mt-4
                    text-sm
                    text-gray-500
                  ">
                    PDF files only
                  </p>
                </>

              )}

            </label>

            <input
              id="resume-file"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

          </div>

          {/* Error */}

          {error && (
            <div className="
              mt-6
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-4
              text-sm
              text-red-400
            ">
              {error}
            </div>
          )}          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading || !file}
            className="
              mt-8
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition-all
              duration-300
              hover:scale-[1.01]
              hover:shadow-cyan-500/20
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:scale-100
            "
          >
            {loading
              ? "Analyzing Resume..."
              : "Upload & Analyze Resume"}
          </button>

          {/* Back Button */}

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            disabled={loading}
            className="
              mt-4
              w-full
              rounded-2xl
              border
              border-white/10
              px-8
              py-4
              font-semibold
              text-gray-300
              transition-all
              hover:bg-white/5
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            ← Back to Dashboard
          </button>

          {/* Info */}

          <div className="
            mt-8
            rounded-2xl
            border
            border-white/5
            bg-black/10
            p-5
          ">

            <div className="
              flex
              flex-col
              gap-3
              text-sm
              text-gray-500
              md:flex-row
              md:items-center
              md:justify-between
            ">
              <span>
                ✓ PDF format supported
              </span>

              <span>
                ✓ AI-powered analysis
              </span>

              <span>
                ✓ ATS optimization
              </span>
            </div>

          </div>

        </form>

      </div>

    </div>
  );
}