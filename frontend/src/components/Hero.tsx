import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
        Your Career.
        <br />
        Powered by AI.
      </h1>

      <p className="mt-8 max-w-2xl text-xl leading-8 text-gray-400">
        Analyze your resume, improve your ATS score, and receive
        AI-powered career insights in minutes.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/login"
          className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Link>

        <Link
          to="/register"
          className="rounded-full border border-gray-700 px-8 py-4 text-lg font-medium transition-all duration-300 hover:border-white"
        >
          Create Account
        </Link>
      </div>

      <div className="mt-20 grid w-full gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-800 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
          <div className="mb-4 text-3xl">⚡</div>

          <h3 className="text-xl font-semibold">
            AI Resume Analysis
          </h3>

          <p className="mt-2 text-gray-400">
            Receive intelligent feedback and improve your resume instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
          <div className="mb-4 text-3xl">📄</div>

          <h3 className="text-xl font-semibold">
            ATS Optimization
          </h3>

          <p className="mt-2 text-gray-400">
            Increase your chances of passing Applicant Tracking Systems.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
          <div className="mb-4 text-3xl">🎯</div>

          <h3 className="text-xl font-semibold">
            Interview Ready
          </h3>

          <p className="mt-2 text-gray-400">
            Get personalized suggestions to impress recruiters.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;