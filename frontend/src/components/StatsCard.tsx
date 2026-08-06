interface StatsCardProps {
  title: string;
  value: string | number;
  color?: "blue" | "green" | "yellow" | "red";
}

export default function StatsCard({
  title,
  value,
  color = "blue",
}: StatsCardProps) {

  const colors = {
    blue: "text-cyan-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-6
        backdrop-blur-xl
      "
    >
      <p className="text-gray-400">
        {title}
      </p>

      <h2
        className={`mt-3 text-4xl font-bold ${colors[color]}`}
      >
        {value}
      </h2>
    </div>
  );
}