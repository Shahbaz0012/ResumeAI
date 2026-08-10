import { useState } from "react";

import {
  LayoutDashboard,
  FileText,
  History,
  Briefcase,
  Sparkles,
  Mail,
  FolderOpen,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../Logo";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Analyze Resume",
    icon: FileText,
    path: "/upload",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
  {
    title: "Job Match",
    icon: Briefcase,
    path: "/job-match",
  },
  {
    title: "Resume Improvement",
    icon: Sparkles,
    path: "/resume-improve",
  },
  {
    title: "Cover Letter",
    icon: Mail,
    path: "/cover-letter",
  },
  {
    title: "My Documents",
    icon: FolderOpen,
    path: "/documents",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsMobileOpen(false);

    navigate("/login");
  };

  const handleNavigation = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* =====================================
          MOBILE MENU BUTTON
      ====================================== */}

      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="
          fixed
          left-4
          top-4
          z-50
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-[#0d111c]/95
          text-white
          shadow-xl
          backdrop-blur-md
          transition
          hover:bg-white/10
          md:hidden
        "
        aria-label="Open navigation menu"
      >
        <Menu size={24} />
      </button>

      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}

      {isMobileOpen && (
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-[2px]
            md:hidden
          "
          aria-label="Close navigation menu"
        />
      )}

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          border-r
          border-white/10
          bg-[#0d111c]
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out

          md:static
          md:z-auto
          md:translate-x-0
          md:shadow-none

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =====================================
            LOGO HEADER
        ====================================== */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <Logo />

          {/* Mobile Close Button */}

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-400
              transition
              hover:bg-white/10
              hover:text-white
              md:hidden
            "
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* =====================================
            NAVIGATION
        ====================================== */}

        <nav className="flex-1 space-y-2 overflow-y-auto p-5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  text-base
                  font-medium
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                  `
                }
              >
                <Icon size={22} />

                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* =====================================
            LOGOUT
        ====================================== */}

        <div className="border-t border-white/10 p-5">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-4
              rounded-2xl
              px-5
              py-4
              text-gray-400
              transition-all
              duration-300
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <LogOut size={22} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}