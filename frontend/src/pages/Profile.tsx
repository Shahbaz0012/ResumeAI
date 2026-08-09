import { FormEvent, useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // FETCH PROFILE
  // ==========================================
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data.user;
      setProfile(user);
      setName(user.name || "");
      setEmail(user.email || "");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================================
  // UPDATE PROFILE
  // ==========================================
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const response = await api.put(
        "/auth/profile",
        {
          name: name.trim(),
          email: email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;
      setProfile(updatedUser);
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setSuccess("Profile updated successfully.");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#090b12]">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.04] p-16 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
            <p className="mt-5 text-gray-400">Loading your profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#090b12]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-white">My Profile</h1>
            <p className="mt-3 text-lg text-gray-400">
              Manage your account information.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
              {success}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Summary */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-4xl font-bold text-white shadow-lg shadow-blue-600/20">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
              <h2 className="mt-6 text-center text-2xl font-bold text-white">
                {profile?.name || name}
              </h2>
              <p className="mt-2 break-all text-center text-gray-400">
                {profile?.email || email}
              </p>
              {profile?.createdAt && (
                <p className="mt-6 text-center text-sm text-gray-500">
                  Member since {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Edit Profile */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 lg:col-span-2">
              <h2 className="text-2xl font-bold text-white">
                Account Information
              </h2>
              <p className="mt-2 text-gray-400">
                Update your name and email address.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    Full Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-white/10 bg-[#11131c] px-5 py-4 text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Email (THIS IS WHERE THE FIX WAS APPLIED) */}
                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    Email Address
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-white/10 bg-[#11131c] px-5 py-4 text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>

          {/* Account Details */}
          {profile && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h2 className="text-2xl font-bold text-white">Account Details</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-black/10 p-5">
                  <p className="text-sm text-gray-500">Account ID</p>
                  <p className="mt-2 break-all text-sm text-gray-300">
                    {profile.id}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-black/10 p-5">
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="mt-2 text-gray-300">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-black/10 p-5">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="mt-2 text-gray-300">
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-black/10 p-5">
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="mt-2 font-semibold text-green-400">● Active</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}