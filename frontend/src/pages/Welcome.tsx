import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Welcome() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-white">
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main Glow */}
        <div className="absolute left-1/2 top-40 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[180px]" />

        {/* Top Left Glow */}
        <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[150px]" />

        {/* Bottom Right Glow */}
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[170px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />
    </main>
  );
}

export default Welcome;