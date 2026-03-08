import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";

 import { loginUser } from "../services/authService";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  /**
   * Handle login
   */
  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

     

const res = await loginUser(email, password);

      /**
       * Backend returns plain token string
       */
      const token: string = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }, [email, password, navigate]);

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue learning"
      footer={
        <>
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:underline"
          >
            Register
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

      {/* Login Button */}
      <button
        onClick={handleLogin}
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
        {loading ? "Logging in..." : "Login"}
      </button>

    </AuthLayout>
  );
};

export default React.memo(Login);