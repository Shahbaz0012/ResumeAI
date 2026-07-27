import { Link } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/">
          <Logo />
        </Link>

        <Link
          to="/login"
          className="rounded-full border border-gray-700 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;