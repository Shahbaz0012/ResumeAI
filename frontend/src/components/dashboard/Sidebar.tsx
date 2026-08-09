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
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom"; // useNavigate import kiya
import Logo from "../Logo";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Analyze Resume", icon: FileText, path: "/upload" },
  { title: "History", icon: History, path: "/history" },
  { title: "Job Match", icon: Briefcase, path: "/job-match" },
  { title: "Resume Improvement", icon: Sparkles, path: "/resume-improve" },
  { title: "Cover Letter", icon: Mail, path: "/cover-letter" },
  { title: "My Documents", icon: FolderOpen, path: "/documents" },
  { title: "Profile", icon: User, path: "/profile" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const navigate = useNavigate(); // navigate hook initialize kiya

  // Logout function
  const handleLogout = () => {
    // 1. Yahan aap apna auth token ya user session clear kar sakte hain
    // Example: localStorage.removeItem("token");
    // Example: localStorage.clear();
    
    // 2. User ko login page par redirect karein
    navigate("/login"); 
  };

  return (
    <aside
      className="
        flex
        min-h-screen
        w-72
        flex-col
        border-r
        border-white/10
        bg-[#11131c]
      "
    >
      {/* Logo */}
      <div className="flex items-center justify-center border-b border-white/10 p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-5">
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
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-5">
        <button
          onClick={handleLogout} // onClick event add kiya
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
  );
}