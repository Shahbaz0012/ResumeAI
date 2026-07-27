import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <Logo />

      <button className="rounded-full border border-gray-700 px-5 py-2 text-white transition hover:border-white hover:bg-white hover:text-black">
        Sign In
      </button>
    </nav>
  );
}

export default Navbar;