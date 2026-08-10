import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Loader from "../components/Loader";

import DashboardStats from "../components/dashboard/DashboardStats";
import LatestResume from "../components/dashboard/LatestResume";
import QuickActions from "../components/dashboard/QuickActions";

import api from "../services/api";

interface DashboardData {
  totalResumes: number;
  highestATS: number;
  averageATS: number;

  latestResume: {
    id: string;
    title: string;
    atsScore: number;
    createdAt: string;
  } | null;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.stats);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Dashboard..." />;
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#080b14]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-6 md:p-8 md:pt-8">
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Welcome Back 👋
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              Manage your resumes and AI analysis from one place.
            </p>
          </div>

          {/* Dashboard Statistics */}
          <div className="w-full min-w-0">
            <DashboardStats
              totalResumes={stats?.totalResumes || 0}
              highestATS={stats?.highestATS || 0}
              averageATS={stats?.averageATS || 0}
            />
          </div>

          {/* Latest Resume + Quick Actions */}
          <div className="mt-8 grid min-w-0 grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8">
            <div className="min-w-0">
              <LatestResume
                latestResume={stats?.latestResume || null}
              />
            </div>

            <div className="min-w-0">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}