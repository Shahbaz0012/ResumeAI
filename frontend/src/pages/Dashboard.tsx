import Sidebar from "../components/dashboard/Sidebar";

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

        {/* Upload Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl">

          <h2 className="text-2xl font-semibold text-white">
            Upload Resume
          </h2>

          <p className="mt-2 text-gray-400">
            Upload your latest resume and receive AI-powered feedback.
          </p>

          <div className="mt-8 flex h-64 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-white/15 transition-all duration-300 hover:border-blue-500 hover:bg-white/5">

            <div className="text-center">

              <p className="text-xl font-semibold text-white">
                Drag & Drop Resume
              </p>

              <p className="mt-2 text-gray-500">
                PDF or DOCX • Max 10MB
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}