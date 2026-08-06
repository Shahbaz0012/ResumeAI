import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Upload() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("resume", file);
      formData.append("title", title);

      const response = await api.post(
        "/resume/upload",
        formData
      );

      localStorage.setItem(
        "resumeId",
        response.data.resume.id
      );

      localStorage.setItem(
        "analysis",
        JSON.stringify(response.data)
      );

      navigate("/processing");
          } catch (err: any) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Upload failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="mt-8 space-y-6"
    >

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-red-400">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Resume Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.06]
          px-5
          py-4
          text-white
          outline-none
          focus:border-cyan-400
        "
      />

      <div>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.length) {
              setFile(e.target.files[0]);
            }
          }}
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/[0.06]
            p-4
            text-white
            file:mr-4
            file:rounded-xl
            file:border-0
            file:bg-blue-600
            file:px-4
            file:py-2
            file:text-white
            file:cursor-pointer
          "
        />

        {file && (
          <p className="mt-3 text-sm text-green-400">
            Selected File: {file.name}
          </p>
        )}

      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          py-4
          text-lg
          font-semibold
          text-white
          shadow-lg
          shadow-blue-500/20
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-2xl
          hover:shadow-blue-500/40
          active:scale-95
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Uploading..."
          : "Upload Resume"}
      </button>

    </form>
  );
}