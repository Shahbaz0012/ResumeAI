const features = [
  {
    title: "ATS Score",
    description:
      "Analyze how well your resume performs in Applicant Tracking Systems.",
    icon: "📊",
  },
  {
    title: "AI Feedback",
    description:
      "Receive AI-powered suggestions to improve every section of your resume.",
    icon: "🤖",
  },
  {
    title: "Job Match",
    description:
      "Compare your resume with any job description and get a match score.",
    icon: "🎯",
  },
  {
    title: "Fast Analysis",
    description:
      "Get complete resume analysis in just a few seconds.",
    icon: "⚡",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Why Choose ResumeAI?
        </h2>

        <p className="mt-4 text-center text-gray-400">
          Everything you need to build a resume that gets interviews.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-400 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;