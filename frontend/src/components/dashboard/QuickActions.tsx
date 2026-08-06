import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <button
          onClick={() => navigate("/upload")}
          className="
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            p-5
            text-lg
            font-semibold
            text-white
            transition-all
            hover:scale-105
          "
        >
          📄 Upload Resume
        </button>

        <button
          onClick={() => navigate("/history")}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            p-5
            text-lg
            font-semibold
            text-white
            transition-all
            hover:bg-white/10
          "
        >
          📂 Resume History
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            p-5
            text-lg
            font-semibold
            text-white
            transition-all
            hover:bg-white/10
          "
        >
          👤 Profile
        </button>

      </div>

    </div>
  );
}