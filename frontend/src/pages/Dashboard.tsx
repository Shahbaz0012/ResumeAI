import Sidebar from "../components/dashboard/Sidebar";
import Upload from "./Upload";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#090b12]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your resumes and AI analysis from one place.
          </p>
        </div>

        {/* Upload Component */}
        <Upload />

      </main>

    </div>
  );
}