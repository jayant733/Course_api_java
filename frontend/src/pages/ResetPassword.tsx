import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { resetPassword } from "../services/authService";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    await resetPassword(token, password);
    setMessage("Password reset successful. You can sign in now.");
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Paste the reset token and create a new password."
      footer={
        <>
          Return to <Link to="/login" className="text-[var(--accent-soft)] hover:text-white">login</Link>
        </>
      }
    >
      <input
        value={token}
        onChange={(event) => setToken(event.target.value)}
        placeholder="Reset token"
        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm outline-none placeholder:text-[var(--muted)]"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="New password"
        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm outline-none placeholder:text-[var(--muted)]"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-full bg-[var(--accent)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-black"
      >
        Reset password
      </button>
      {message && <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[var(--muted)]">{message}</div>}
    </AuthLayout>
  );
};

export default ResetPassword;
