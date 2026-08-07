interface MatchScoreCardProps {
  score: number;
}

export default function MatchScoreCard({
  score,
}: MatchScoreCardProps) {
  const getColor = () => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
      <h2 className="text-2xl font-bold text-white">
        Match Score
      </h2>

      <div className="mt-8 flex justify-center">
        <div className="text-center">
          <h1 className={`text-7xl font-bold ${getColor()}`}>
            {score}%
          </h1>

          <p className="mt-4 text-gray-400">
            Resume Match
          </p>

          <p className={`mt-6 text-lg font-semibold ${getColor()}`}>
            {score >= 80
              ? "Excellent Match 🚀"
              : score >= 60
              ? "Good Match 👍"
              : "Needs Improvement 📈"}
          </p>
        </div>
      </div>
    </div>
  );
}