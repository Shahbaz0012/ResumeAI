import StatsCard from "../StatsCard";

interface DashboardStatsProps {
  totalResumes: number;
  highestATS: number;
  averageATS: number;
}

export default function DashboardStats({
  totalResumes,
  highestATS,
  averageATS,
}: DashboardStatsProps) {
  return (
    <div className="mb-10 grid gap-6 md:grid-cols-3">

      <StatsCard
        title="Total Resumes"
        value={totalResumes}
      />

      <StatsCard
        title="Highest ATS"
        value={highestATS}
        color="green"
      />

      <StatsCard
        title="Average ATS"
        value={averageATS}
        color="yellow"
      />

    </div>
  );
}