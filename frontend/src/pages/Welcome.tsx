import Navbar from "../components/Navbar";

function Welcome() {
  return (
    <main className="min-h-screen bg-[#0B0D12] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 text-center mt-24">
        <h2 className="text-6xl font-bold leading-tight">
          Your Career.
          <br />
          Powered by AI.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Create ATS-friendly resumes with intelligent analysis,
          personalized feedback, and AI-powered recommendations.
        </p>

        <button className="mt-10 rounded-full bg-blue-600 px-8 py-4 text-lg font-medium transition hover:bg-blue-500">
          Get Started
        </button>
      </section>
    </main>
  );
}

export default Welcome;