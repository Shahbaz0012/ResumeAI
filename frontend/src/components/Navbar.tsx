function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-800 px-8 py-5">
      {/* Logo */}
      <a href="#" className="text-2xl font-bold text-blue-500">
        ResumeAI 🚀
      </a>

      {/* Navigation Links */}
      <div className="flex gap-8 text-gray-300">
        <a href="#features" className="transition hover:text-white">
          Features
        </a>

        <a href="#pricing" className="transition hover:text-white">
          Pricing
        </a>

        <a href="#about" className="transition hover:text-white">
          About
        </a>
      </div>

      {/* Login Button */}
      <button className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700 transition">
        Login
      </button>
    </nav>
  );
}

export default Navbar;