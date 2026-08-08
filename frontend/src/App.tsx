import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Results from "./pages/Results";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import JobMatch from "./pages/JobMatch";
import ResumeImprove from "./pages/ResumeImprove";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/results" element={<Results />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/job-match" element={<JobMatch />} />
      <Route path="/resume-improve" element={<ResumeImprove />} />
    </Routes>
  );
}

export default App;