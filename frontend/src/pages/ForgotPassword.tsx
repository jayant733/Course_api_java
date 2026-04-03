import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { forgotPassword } from "../services/authService";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    await forgotPassword(email);
    setMessage("Reset flow initiated. Use the issued token to complete reset.");
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Request a password reset token from the backend."
      footer={
        <>
          Back to <Link to="/login" className="text-[var(--accent-soft)] hover:text-white">login</Link>
        </>
      }
    >
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm outline-none placeholder:text-[var(--muted)]"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-full bg-[var(--accent)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-black"
      >
        Send reset request
      </button>
      {message && <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[var(--muted)]">{message}</div>}
    </AuthLayout>
  );
};

export default ForgotPassword;
