import { Brain, FileText, Target } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Brain className="h-9 w-9 text-blue-400" />,
    title: "AI Resume Analysis",
    description:
      "Receive intelligent feedback and improve your resume instantly.",
  },
  {
    icon: <FileText className="h-9 w-9 text-cyan-400" />,
    title: "ATS Optimization",
    description:
      "Increase your chances of passing Applicant Tracking Systems.",
  },
  {
    icon: <Target className="h-9 w-9 text-emerald-400" />,
    title: "Interview Ready",
    description:
      "Get personalized suggestions to impress recruiters.",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-28 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[160px]" />

      {/* Secondary Glow */}
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/5 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-24 text-center">

        {/* Badge */}
        <div className="mb-8 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 backdrop-blur-xl">
          🚀 AI Powered Resume Platform
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-8xl">
          Your Career.
          <br />
          Powered by AI.
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
          Analyze your resume, improve your ATS score, receive personalized AI
          career insights, and land more interviews with confidence.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <Link
            to="/login"
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="rounded-full border border-white/10 bg-white/5 px-10 py-4 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:bg-white/10 active:scale-95"
          >
            Create Account
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid w-full max-w-6xl gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="mb-6 flex justify-center transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="leading-8 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p className="mt-14 text-sm text-gray-500">
          Trusted by students, professionals, and job seekers worldwide.
        </p>
      </div>
    </section>
  );
}