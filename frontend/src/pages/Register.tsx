import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { registerUser } from "../services/authService";

const fieldClass =
  "w-full rounded-[20px] border border-[var(--workspace-line)] bg-white px-5 py-4 text-sm text-[var(--workspace-text)] outline-none transition placeholder:text-[var(--workspace-muted)] focus:border-[var(--workspace-primary)]/40";

const roleOptions = [
  {
    value: "USER",
    label: "Learner account",
    description: "Browse courses, enroll, and track learning progress.",
  },
  {
    value: "ADMIN",
    label: "Admin account",
    description: "Create and manage courses, topics, subtopics, and platform data.",
  },
] as const;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    if (form.role === "ADMIN" && !form.phoneNumber) {
      setError("Admin registration needs a phone number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await registerUser(form.email, form.password, form.role, form.phoneNumber || undefined);
      navigate("/login", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Set up a learner or admin identity and move directly into the assignment-ready product flow."
      footer={
        <>
          Already registered?{" "}
          <Link to="/login" className="text-[var(--workspace-primary)] hover:text-[var(--workspace-violet)]">
            Sign in
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

      <div className="rounded-[24px] border border-[var(--workspace-line)] bg-[#f9fbff] p-2">
        <div className="mb-2 px-3 pt-2 text-xs uppercase tracking-[0.22em] text-[var(--workspace-primary)]">
          Choose account type
        </div>
        <div className="grid gap-2">
          {roleOptions.map((option) => {
            const active = form.role === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setForm((current) => ({ ...current, role: option.value }))}
                className={`rounded-[18px] border px-4 py-4 text-left transition ${
                  active
                    ? "border-[var(--workspace-primary)] bg-[rgba(95,111,255,0.08)] shadow-[0_12px_30px_rgba(95,111,255,0.1)]"
                    : "border-[var(--workspace-line)] bg-white hover:border-[var(--workspace-primary)]/20 hover:bg-[#f8faff]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm font-semibold ${active ? "text-[var(--workspace-text)]" : "text-[var(--workspace-text)]"}`}>
                      {option.label}
                    </div>
                    <div className="mt-1 text-xs leading-6 text-[var(--workspace-muted)]">
                      {option.description}
                    </div>
                  </div>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      active ? "border-[var(--workspace-primary)] bg-[var(--workspace-primary)]" : "border-[var(--workspace-line)]"
                    }`}
                  >
                    <div className={`h-2 w-2 rounded-full ${active ? "bg-white" : "bg-transparent"}`} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {form.role === "ADMIN" && (
        <input
          type="text"
          value={form.phoneNumber}
          onChange={(event) => setForm((current) => ({ ...current, phoneNumber: event.target.value }))}
          placeholder="Admin phone number"
          className={fieldClass}
        />
      )}

      {error && <div className="rounded-[18px] border border-red-300/40 bg-red-50 px-4 py-3 text-sm text-red-500">{error}</div>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-full bg-[var(--workspace-primary)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Launch account"}
      </button>
    </AuthLayout>
  );
};

export default React.memo(Register);
