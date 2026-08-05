import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Input from "../components/ui/Input";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b12] px-6">

      <div className="absolute left-1/2 top-32 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[170px]" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[170px]" />

      <div className="relative w-full max-w-md">

        <div className="mb-14 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-blue-900/10 backdrop-blur-3xl">

          <h1 className="text-center text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Start your AI-powered career journey today.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <form
            className="mt-8 space-y-5"
            onSubmit={handleRegister}
          >

            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-3xl transition-all focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/20">

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-white/10" />
            <span className="mx-4 text-sm text-gray-500">
              OR
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

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
            Continue with Google
          </button>

          <p className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Sign In
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}