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

  // Currently opened document
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

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

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (documentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

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

      // Close modal if the deleted document was currently open.
      if (selectedDocument?.id === documentId) {
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete document.");
    }
  };

  // Helper to format the preview text on the card
  const getPreviewText = (document: Document) => {
    if (document.type === "RESUME_IMPROVEMENT") {
      try {
        const parsed = JSON.parse(document.content);
        return parsed.professionalSummary || "Resume improvement suggestions...";
      } catch {
        return "Resume improvement suggestions...";
      }
    }
    return document.content;
  };

  // Helper to nicely render the content inside the modal
  const renderDocumentContent = (document: Document) => {
    if (document.type === "RESUME_IMPROVEMENT") {
      try {
        const parsed = JSON.parse(document.content);
        return (
          <div className="space-y-6 text-gray-200">
            {parsed.professionalSummary && (
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Professional Summary</h3>
                <p className="leading-7">{parsed.professionalSummary}</p>
              </div>
            )}
            
            {parsed.experienceRewrite && (
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Experience Rewrite</h3>
                <p className="leading-7">{parsed.experienceRewrite}</p>
              </div>
            )}

            {parsed.improvedSkills && parsed.improvedSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Improved Skills</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {parsed.improvedSkills.map((skill: string, i: number) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {parsed.atsKeywords && parsed.atsKeywords.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">ATS Keywords to Add</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {parsed.atsKeywords.map((keyword: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {parsed.projectSuggestions && parsed.projectSuggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Project Suggestions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {parsed.projectSuggestions.map((proj: string, i: number) => (
                    <li key={i}>{proj}</li>
                  ))}
                </ul>
              </div>
            )}

            {parsed.finalTips && parsed.finalTips.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Final Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  {parsed.finalTips.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      } catch {
        // Fallback if parsing fails
        return <div className="whitespace-pre-wrap leading-8 text-gray-200">{document.content}</div>;
      }
    }

    // Default renderer for Cover Letters (Plain text)
    return (
      <div className="whitespace-pre-wrap leading-8 text-gray-200">
        {document.content}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#090b12]">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white">My Documents</h1>
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

          {/* Error */}
          {error && (
            <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
              <p className="mt-5 text-gray-400">Loading your documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-16 text-center">
              <div className="text-6xl">📁</div>
              <h2 className="mt-6 text-3xl font-bold text-white">
                No Documents Yet
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-400">
                Generate a cover letter or improve your resume and your
                documents will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/[0.06]"
                >
                  {/* Type */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
                      {document.type === "COVER_LETTER" ? "✉️" : "✨"}
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      {document.type === "COVER_LETTER"
                        ? "Cover Letter"
                        : "Resume Improvement"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-6 line-clamp-2 text-xl font-bold text-white">
                    {document.title}
                  </h2>

                  {/* Resume */}
                  {document.resume && (
                    <p className="mt-3 text-sm text-gray-500">
                      Resume: {document.resume.title}
                    </p>
                  )}

                  {/* Date */}
                  <p className="mt-2 text-sm text-gray-500">
                    Created {new Date(document.createdAt).toLocaleDateString()}
                  </p>

                  {/* Preview */}
                  <p className="mt-5 line-clamp-3 leading-7 text-gray-400">
                    {getPreviewText(document)}
                  </p>

                  {/* Actions */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setSelectedDocument(document)}
                      className="rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      👁 View
                    </button>

                    <button
                      onClick={() => {
                        // Extract plain text for copying
                        const copyText = document.type === "RESUME_IMPROVEMENT" 
                          ? getPreviewText(document) // Or map the JSON into a clean string if preferred
                          : document.content;
                          
                        navigator.clipboard.writeText(copyText);
                        alert("Document copied to clipboard!");
                      }}
                      className="rounded-xl border border-cyan-500/30 px-3 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
                    >
                      📋 Copy
                    </button>

                    <button
                      onClick={() => handleDelete(document.id)}
                      className="rounded-xl border border-red-500/30 px-3 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
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

      {/* ==============================
          DOCUMENT VIEWER MODAL
      =============================== */}

      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#11131c] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {selectedDocument.type === "COVER_LETTER" ? "✉️" : "✨"}
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    {selectedDocument.title}
                  </h2>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedDocument.type === "COVER_LETTER"
                    ? "AI Generated Cover Letter"
                    : "AI Resume Improvement"}
                </p>
              </div>

              <button
                onClick={() => setSelectedDocument(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-xl text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Document Content */}
            <div className="overflow-y-auto px-6 py-8 md:px-10">
              <div className="rounded-2xl border border-white/5 bg-black/20 p-6 text-base">
                {renderDocumentContent(selectedDocument)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 px-6 py-5">
              <button
                onClick={() => {
                  const copyText = selectedDocument.type === "RESUME_IMPROVEMENT" 
                    ? getPreviewText(selectedDocument) 
                    : selectedDocument.content;

                  navigator.clipboard.writeText(copyText);
                  alert("Document copied to clipboard!");
                }}
                className="rounded-xl border border-cyan-500/30 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
              >
                📋 Copy Document
              </button>

              <button
                onClick={() => setSelectedDocument(null)}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}