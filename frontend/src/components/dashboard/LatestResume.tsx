interface LatestResumeProps {
  latestResume: {
    id: string;
    title: string;
    atsScore: number;
    createdAt: string;
  } | null;
}

export default function LatestResume({
  latestResume,
}: LatestResumeProps) {

  if (!latestResume) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <h2 className="text-2xl font-bold text-white">
          Latest Resume
        </h2>

        <p className="mt-4 text-gray-400">
          No resume uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Latest Resume
      </h2>

      <h3 className="text-xl font-semibold text-white">
        {latestResume.title}
      </h3>

      <p className="mt-2 text-gray-400">
        Uploaded on{" "}
        {new Date(
          latestResume.createdAt
        ).toLocaleDateString()}
      </p>

      <div className="mt-6 inline-flex rounded-2xl bg-cyan-500/20 px-6 py-3">

        <div>

          <p className="text-sm text-cyan-300">
            ATS Score
          </p>

          <p className="text-3xl font-bold text-cyan-400">
            {latestResume.atsScore}
          </p>

        </div>

      </div>

    </div>
  );
}