import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";

export default function Settings() {

  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState(true);

  const [saved, setSaved] =
    useState(false);

  // ==========================================
  // LOAD SETTINGS
  // ==========================================

  useEffect(() => {

    const storedNotifications =
      localStorage.getItem(
        "notificationsEnabled"
      );

    if (
      storedNotifications !== null
    ) {
      setNotifications(
        storedNotifications === "true"
      );
    }

  }, []);

  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  const savePreferences = () => {

    localStorage.setItem(
      "notificationsEnabled",
      String(notifications)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("resumeId");
    localStorage.removeItem("analysis");

    navigate("/login", {
      replace: true,
    });
  };  // ==========================================
  // SETTINGS UI
  // ==========================================

  return (
    <div className="flex min-h-screen bg-[#090b12]">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mx-auto max-w-5xl">

          {/* Header */}

          <div className="mb-10">

            <h1 className="
              text-5xl
              font-bold
              text-white
            ">
              Settings
            </h1>

            <p className="
              mt-3
              text-lg
              text-gray-400
            ">
              Manage your ResumeAI preferences and account.
            </p>

          </div>

          {/* Success */}

          {saved && (
            <div className="
              mb-6
              rounded-2xl
              border
              border-green-500/20
              bg-green-500/10
              p-4
              text-green-400
            ">
              Settings saved successfully.
            </div>
          )}

          <div className="space-y-6">

            {/* ==========================
                ACCOUNT
            ========================== */}

            <section className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
            ">

              <div className="
                flex
                items-center
                gap-4
              ">

                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-500/10
                  text-2xl
                ">
                  👤
                </div>

                <div>

                  <h2 className="
                    text-2xl
                    font-bold
                    text-white
                  ">
                    Account
                  </h2>

                  <p className="
                    mt-1
                    text-gray-400
                  ">
                    Manage your personal account information.
                  </p>

                </div>

              </div>

              <div className="
                mt-6
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-white/5
                bg-black/10
                p-5
                md:flex-row
                md:items-center
                md:justify-between
              ">

                <div>

                  <p className="
                    font-semibold
                    text-white
                  ">
                    Profile
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    text-gray-500
                  ">
                    Update your name and email address.
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate("/profile")
                  }
                  className="
                    rounded-xl
                    border
                    border-blue-500/30
                    px-5
                    py-3
                    font-semibold
                    text-blue-300
                    transition
                    hover:bg-blue-500/10
                  "
                >
                  Open Profile
                </button>

              </div>

            </section>


            {/* ==========================
                PREFERENCES
            ========================== */}

            <section className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
            ">

              <div className="
                flex
                items-center
                gap-4
              ">

                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-500/10
                  text-2xl
                ">
                  ⚙️
                </div>

                <div>

                  <h2 className="
                    text-2xl
                    font-bold
                    text-white
                  ">
                    Preferences
                  </h2>

                  <p className="
                    mt-1
                    text-gray-400
                  ">
                    Control how ResumeAI behaves.
                  </p>

                </div>

              </div>

              {/* Notifications */}

              <div className="
                mt-6
                flex
                items-center
                justify-between
                gap-6
                rounded-2xl
                border
                border-white/5
                bg-black/10
                p-5
              ">

                <div>

                  <p className="
                    font-semibold
                    text-white
                  ">
                    Notifications
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    text-gray-500
                  ">
                    Receive application and AI analysis notifications.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                  className={`
                    relative
                    h-7
                    w-14
                    rounded-full
                    transition
                    ${
                      notifications
                        ? "bg-cyan-500"
                        : "bg-gray-700"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-1
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      transition
                      ${
                        notifications
                          ? "left-8"
                          : "left-1"
                      }
                    `}
                  />

                </button>

              </div>

              <button
                onClick={
                  savePreferences
                }
                className="
                  mt-6
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:scale-[1.01]
                "
              >
                Save Preferences
              </button>

            </section>            {/* ==========================
                SECURITY
            ========================== */}

            <section className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
            ">

              <div className="
                flex
                items-center
                gap-4
              ">

                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-purple-500/10
                  text-2xl
                ">
                  🔐
                </div>

                <div>

                  <h2 className="
                    text-2xl
                    font-bold
                    text-white
                  ">
                    Security
                  </h2>

                  <p className="
                    mt-1
                    text-gray-400
                  ">
                    Manage your account security.
                  </p>

                </div>

              </div>

              <div className="
                mt-6
                rounded-2xl
                border
                border-white/5
                bg-black/10
                p-5
              ">

                <div className="
                  flex
                  flex-col
                  gap-4
                  md:flex-row
                  md:items-center
                  md:justify-between
                ">

                  <div>

                    <p className="
                      font-semibold
                      text-white
                    ">
                      Password
                    </p>

                    <p className="
                      mt-1
                      text-sm
                      text-gray-500
                    ">
                      Change your account password.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Password change will be added in the next security update."
                      )
                    }
                    className="
                      rounded-xl
                      border
                      border-purple-500/30
                      px-5
                      py-3
                      font-semibold
                      text-purple-300
                      transition
                      hover:bg-purple-500/10
                    "
                  >
                    Change Password
                  </button>

                </div>

              </div>

            </section>


            {/* ==========================
                DANGER ZONE
            ========================== */}

            <section className="
              rounded-3xl
              border
              border-red-500/20
              bg-red-500/[0.03]
              p-8
            ">

              <div className="
                flex
                items-center
                gap-4
              ">

                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-500/10
                  text-2xl
                ">
                  ⚠️
                </div>

                <div>

                  <h2 className="
                    text-2xl
                    font-bold
                    text-white
                  ">
                    Danger Zone
                  </h2>

                  <p className="
                    mt-1
                    text-gray-400
                  ">
                    Actions that affect your current session.
                  </p>

                </div>

              </div>

              <div className="
                mt-6
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-red-500/10
                bg-black/10
                p-5
                md:flex-row
                md:items-center
                md:justify-between
              ">

                <div>

                  <p className="
                    font-semibold
                    text-white
                  ">
                    Logout
                  </p>

                  <p className="
                    mt-1
                    text-sm
                    text-gray-500
                  ">
                    Sign out of your ResumeAI account.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    rounded-xl
                    border
                    border-red-500/30
                    px-5
                    py-3
                    font-semibold
                    text-red-400
                    transition
                    hover:bg-red-500/10
                  "
                >
                  Logout
                </button>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  );
}