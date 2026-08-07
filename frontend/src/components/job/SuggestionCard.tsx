interface SuggestionCardProps {
  suggestions: string[];
}

export default function SuggestionCard({
  suggestions,
}: SuggestionCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Suggestions
      </h2>

      {suggestions.length === 0 ? (
        <p className="text-gray-400">
          No suggestions available.
        </p>
      ) : (
        <div className="space-y-4">

          {suggestions.map(
            (suggestion, index) => (
              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  p-4
                "
              >
                <p className="text-cyan-300">
                  💡 {suggestion}
                </p>
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}