import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Loader from "../components/Loader";
import ResumeCard from "../components/ResumeCard";
import StatsCard from "../components/StatsCard";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

interface ResumeHistory {
  id: string;
  title: string;
  atsScore: number;
  createdAt: string;
  analysis: {
    summary: string;
    skills: string[];
    missingSkills: string[];
    strengths: string[];
    improvements: string[];
    recommendedRoles: string[];
  } | null;
}

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<ResumeHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ResumeHistory | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/resume/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(response.data.history);
      } catch (err) {
        console.error(err);
        setError("Failed to load resume history. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async () => {
    if (!selectedResume) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await api.delete(`/resume/${selectedResume.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory((prev) => prev.filter((resume) => resume.id !== selectedResume.id));
      setSelectedResume(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete resume.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Resume History..." />;
  }

  // Error State with Dark Background
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-center">
        <h2 className="mb-2 text-2xl font-bold text-white">Oops! Something went wrong.</h2>
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl bg-white/10 px-6 py-2 font-medium text-white hover:bg-white/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  const highestATS =
    history.length > 0
      ? Math.max(...history.map((resume) => resume.atsScore || 0))
      : 0;

  const averageATS =
    history.length > 0
      ? Math.round(
          history.reduce((sum, resume) => sum + (resume.atsScore || 0), 0) / history.length
        )
      : 0;

  return (
    /* ADDED: min-h-screen and bg-gray-900 to ensure the background is dark so the white text is visible */
    <div className="min-h-screen bg-gray-900 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white">My Resume History</h1>
            <p className="mt-3 text-gray-400">
              View and manage all your AI analyzed resumes.
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
          >
            + Upload Resume
          </button>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <StatsCard title="Total Resumes" value={history.length} />
          <StatsCard title="Highest ATS" value={highestATS} color="green" />
          <StatsCard title="Average ATS" value={averageATS} color="yellow" />
        </div>

        {history.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-16 text-center">
            <h2 className="text-3xl font-bold text-white">No Resume Found</h2>
            <p className="mt-4 text-gray-400">
              Upload your first resume to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((resume) => (
              <ResumeCard
                key={resume.id}
                id={resume.id}
                title={resume.title}
                atsScore={resume.atsScore}
                createdAt={resume.createdAt}
                analysis={resume.analysis}
                deleting={deleteLoading && selectedResume?.id === resume.id}
                onView={() => {
                  navigate("/processing", { state: { resumeId: resume.id } });
                }}
                onImprove={() => {
                  navigate("/resume-improve", { state: { resumeId: resume.id } });
                }}
                onDelete={() => setSelectedResume(resume)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={selectedResume !== null}
        loading={deleteLoading}
        title={selectedResume?.title || ""}
        onCancel={() => setSelectedResume(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}