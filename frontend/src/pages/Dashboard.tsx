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

  const [stats, setStats] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setStats(
        response.data.stats
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090b12] flex items-center justify-center">

        <Loader text="Loading Dashboard..." />

      </div>
    );
  }
    return (
    <div className="flex min-h-screen bg-[#090b12]">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your resumes and AI analysis from one place.
          </p>

        </div>

        <DashboardStats
          totalResumes={
            stats?.totalResumes || 0
          }
          highestATS={
            stats?.highestATS || 0
          }
          averageATS={
            stats?.averageATS || 0
          }
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <LatestResume
            latestResume={
              stats?.latestResume || null
            }
          />

          <QuickActions />

        </div>

      </main>

    </div>
  );
}