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
import CoverLetter from "./pages/CoverLetter";
import Documents from "./pages/Documents";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <Routes>

      {/* =====================================
          PUBLIC ROUTES
      ====================================== */}

      <Route
        path="/"
        element={<Welcome />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =====================================
          PROTECTED ROUTES
      ====================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />

        <Route
          path="/processing"
          element={<Processing />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/job-match"
          element={<JobMatch />}
        />

        <Route
          path="/resume-improve"
          element={<ResumeImprove />}
        />

        <Route
          path="/cover-letter"
          element={<CoverLetter />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

    </Routes>

  );
}


export default App;