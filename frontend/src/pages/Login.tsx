import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { loginUser, persistAuthResponse } from "../services/authService";

const fieldClass =
  "w-full rounded-[20px] border border-[var(--workspace-line)] bg-white px-5 py-4 text-sm text-[var(--workspace-text)] outline-none transition placeholder:text-[var(--workspace-muted)] focus:border-[var(--workspace-primary)]/40";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await loginUser(form.email, form.password);
      const payload = response.data?.data;
      persistAuthResponse(payload);
      navigate(payload.role === "ROLE_ADMIN" ? "/admin" : "/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Secure JWT access, role-based routing, and a polished workspace waiting behind the login wall."
      footer={
        <>
          Need an account?{" "}
          <Link to="/register" className="text-[var(--workspace-primary)] hover:text-[var(--workspace-violet)]">
            Create one here
          </Link>
          {" • "}
          <Link to="/forgot-password" className="text-[var(--workspace-primary)] hover:text-[var(--workspace-violet)]">
            Forgot password
          </Link>
        </>
      }
    >
      <input
        type="email"
        value={form.email}
        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        placeholder="Email address"
        className={fieldClass}
      />
      <input
        type="password"
        value={form.password}
        onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
        placeholder="Password"
        className={fieldClass}
      />

      {error && <div className="rounded-[18px] border border-red-300/40 bg-red-50 px-4 py-3 text-sm text-red-500">{error}</div>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-full bg-[var(--workspace-primary)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Enter workspace"}
      </button>
    </AuthLayout>
  );
};

export default React.memo(Login);
