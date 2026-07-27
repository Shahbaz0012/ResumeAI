const steps = [
  {
    icon: "📄",
    title: "Upload Resume",
    description: "Upload your resume in PDF format.",
  },
  {
    icon: "🤖",
    title: "AI Analysis",
    description: "Our AI analyzes your resume in seconds.",
  },
  {
    icon: "📈",
    title: "Get ATS Score",
    description: "Receive your ATS score and improvement tips.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">
          How It Works
        </h2>

        <p className="mt-4 text-center text-gray-400">
          Get professional AI feedback in just three simple steps.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-zinc-800 bg-black p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl">
                {step.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;