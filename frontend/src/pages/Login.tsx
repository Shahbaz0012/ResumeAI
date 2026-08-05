import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Input from "../components/ui/Input";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b12] px-6">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-32 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[170px]" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[170px]" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="mb-14 flex justify-center">
          <Logo />
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-blue-900/10 backdrop-blur-3xl">

          <h1 className="text-center text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Sign in to continue your AI career journey.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <form
            className="mt-8 space-y-5"
            onSubmit={handleLogin}
          >

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-3xl transition-all focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/20">

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-0 bg-transparent focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-5 text-gray-400 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-blue-500"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-blue-400 transition hover:text-blue-300"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                py-4
                text-lg
                font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-2xl
                hover:shadow-blue-500/40
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-white/10" />
            <span className="mx-4 text-sm text-gray-500">
              OR
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google */}
          <button
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              py-4
              font-medium
              text-white
              transition-all
              duration-300
              hover:border-blue-500
              hover:bg-white/10
              active:scale-95
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path fill="#FFC107" d="M43.6 20H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4C13 4 4 13 4 24s9 20 20 20s20-9 20-20c0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4C16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.4 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.1 6.9l6.3 5.2C39.8 36.3 44 30.7 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>

            Continue with Google
          </button>

          {/* Register */}
          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}