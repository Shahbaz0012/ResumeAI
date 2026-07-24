function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-28 px-6">
      <p className="text-blue-400 font-semibold mb-4">
        AI-Powered Resume Analysis
      </p>

      <h1 className="text-6xl font-bold max-w-4xl leading-tight">
        Land Your Dream Job with
        <span className="text-blue-500"> ResumeAI</span>
      </h1>

      <p className="text-gray-400 text-xl max-w-2xl mt-6">
        Upload your resume and get ATS score, AI feedback, and job match
        suggestions in seconds.
      </p>

      <div className="flex gap-4 mt-10">
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
          Upload Resume
        </button>

        <button className="border border-gray-700 px-8 py-4 rounded-xl hover:bg-gray-900">
          Live Demo
        </button>
      </div>
    </section>
  );
}

export default Hero;
