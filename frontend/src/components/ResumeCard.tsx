interface ResumeAnalysis {
  summary: string;
  skills: string[];
}

interface ResumeCardProps {
  id: string;
  title: string;
  atsScore: number;
  createdAt: string;
  analysis: ResumeAnalysis | null;
  deleting?: boolean;
  onView: () => void;
  onImprove: () => void;
  onDelete: () => void;
}

export default function ResumeCard({
  title,
  atsScore,
  createdAt,
  analysis,
  deleting = false,
  onView,
  onImprove,
  onDelete,
}: ResumeCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-2 text-gray-400">
            Uploaded on{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* ATS Score */}
        <div className="rounded-2xl bg-cyan-500/20 px-8 py-5 text-center">

          <p className="text-sm uppercase tracking-wider text-cyan-300">
            ATS Score
          </p>

          <p className="mt-2 text-4xl font-bold text-cyan-400">
            {atsScore}
          </p>

        </div>

      </div>

      {/* AI Analysis */}
      {analysis && (
        <div className="mt-8">

          <h3 className="mb-3 text-xl font-semibold text-white">
            AI Summary
          </h3>

          <p className="leading-8 text-gray-300">
            {analysis.summary}
          </p>

          {/* Skills */}
          <div className="mt-6 flex flex-wrap gap-2">

            {analysis.skills
              .slice(0, 6)
              .map((skill, index) => (
                <span
                  key={index}
                  className="
                    rounded-full
                    bg-blue-600/20
                    px-3
                    py-1
                    text-sm
                    text-cyan-300
                  "
                >
                  {skill}
                </span>
              ))}

          </div>

        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-4">

        {/* View */}
        <button
          onClick={onView}
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          View Report
        </button>

        {/* Improve */}
        <button
          onClick={onImprove}
          className="
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition-all
            hover:scale-105
            hover:shadow-lg
            hover:shadow-cyan-500/20
          "
        >
          ✨ Improve Resume
        </button>

        {/* Delete */}
        <button
          onClick={onDelete}
          disabled={deleting}
          className="
            rounded-xl
            border
            border-red-500
            px-6
            py-3
            font-semibold
            text-red-400
            transition
            hover:bg-red-500
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>

      </div>

    </div>
  );
}