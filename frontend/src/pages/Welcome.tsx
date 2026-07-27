import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Welcome() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-32 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Navbar />

      <Hero />
    </main>
  );
}

export default Welcome;