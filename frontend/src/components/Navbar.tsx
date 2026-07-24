function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-500">
        ResumeAI 🚀
      </h1>

      {/* Navigation Links */}
      <div className="flex gap-8 text-gray-300">
        <a href="#" className="hover:text-white">Features</a>
        <a href="#" className="hover:text-white">Pricing</a>
        <a href="#" className="hover:text-white">About</a>
      </div>

      {/* Login Button */}
      <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
        Login
      </button>
    </nav>
  );
}

export default Navbar;