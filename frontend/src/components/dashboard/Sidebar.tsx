import {
  LayoutDashboard,
  FileText,
  History,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
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
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-[#0b0f19]/95 backdrop-blur-xl">

      {/* Logo */}
      <div className="flex items-center justify-center border-b border-white/10 p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={22} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-5">
        <button
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
          Logout
        </button>
      </div>
    </aside>
  );
}