import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";

interface Document {
  id: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  resume?: {
    id: string;
    title: string;
  } | null;
}

export default function Documents() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get("/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocuments(response.data.documents || []);
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.data?.message || "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/documents/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocuments((prev) =>
        prev.filter((document) => document.id !== documentId)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#090b12]">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white">
                My Documents
              </h1>
              <p className="mt-3 text-lg text-gray-400">
                View and manage your AI-generated documents.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-2xl border border-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
            >
              ← Dashboard
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-16 text-center">
              {/* Fixed: Added closing quote to className */}
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
              <p className="mt-5 text-gray-400">
                Loading your documents...
              </p>
            </div>
          ) : documents.length === 0 ? (
            
            /* Empty State */
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-16 text-center">
              <div className="text-6xl">📁</div>
              <h2 className="mt-6 text-3xl font-bold text-white">
                No Documents Yet
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-400">
                Generate a cover letter or improve your resume and your documents will appear here.
              </p>
            </div>
          ) : (

            /* Documents Grid */
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/[0.06]"
                >
                  
                  {/* Document Type Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
                      {document.type === "COVER_LETTER" ? "✉️" : "✨"}
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      {document.type === "COVER_LETTER" ? "Cover Letter" : "Resume Improvement"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-6 line-clamp-2 text-xl font-bold text-white">
                    {document.title}
                  </h2>

                  {/* Associated Resume */}
                  {document.resume && (
                    <p className="mt-3 text-sm text-gray-500">
                      Resume: {document.resume.title}
                    </p>
                  )}

                  {/* Date */}
                  <p className="mt-2 text-sm text-gray-500">
                    Created {new Date(document.createdAt).toLocaleDateString()}
                  </p>

                  {/* Content Preview */}
                  <p className="mt-5 line-clamp-3 leading-7 text-gray-400">
                    {document.content}
                  </p>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(document.content);
                        alert("Document copied to clipboard!");
                      }}
                      className="flex-1 rounded-xl border border-cyan-500/30 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
                    >
                      📋 Copy
                    </button>
                    
                    <button
                      onClick={() => handleDelete(document.id)}
                      className="flex-1 rounded-xl border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}