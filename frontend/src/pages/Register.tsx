import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import API from "../api/axios";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  /**
   * Handle registration
   */
  const handleRegister = useCallback(async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await API.post("/users", {
        email,
        password,
      });

      alert("Registration successful 🎉");

      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  }, [email, password, navigate]);

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your learning journey today"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
          w-full
          mb-4
          p-3
          rounded-lg
          bg-black/30
          border border-white/10
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
        "
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full
          mb-6
          p-3
          rounded-lg
          bg-black/30
          border border-white/10
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
        "
      />

      {/* Register Button */}
      <button
        onClick={handleRegister}
        disabled={loading}
        className="
          w-full
          py-3
          rounded-lg
          bg-gradient-to-r
          from-purple-600
          to-indigo-600
          hover:opacity-90
          transition-all
          duration-200
          font-semibold
          disabled:opacity-50
        "
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

    </AuthLayout>
  );
};

export default React.memo(Register);