import { Link } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        {/* Logo */}
        <Link
          to="/"
          className="transition-transform duration-300 hover:scale-105"
        >
          <Logo />
        </Link>

        {/* Sign In */}
        <Link
          to="/login"
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;