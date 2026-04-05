import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getCurrentUser, updateUser } from "../services/userService";
import { clearSession, getSession, saveSession } from "../services/sessionService";

const inputClass =
  "w-full rounded-[18px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm text-[var(--workspace-text)] outline-none placeholder:text-[var(--workspace-muted)] focus:border-[var(--workspace-primary)]/40";

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const session = getSession();
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCurrentUser().then((response) => {
      const user = response.data?.data;
      setForm((current) => ({
        ...current,
        email: user?.email ?? "",
        phoneNumber: user?.phoneNumber ?? "",
      }));
    });
  }, []);

  const handleSave = async () => {
    if (!session.userId) return;
    const response = await updateUser(session.userId, form);
    const user = response.data?.data;
    saveSession({
      userId: session.userId,
      accessToken: session.token ?? "",
      refreshToken: session.refreshToken ?? "",
      email: user.email,
      role: user.role,
    });
    setMessage("Profile updated successfully.");
    setForm((current) => ({ ...current, currentPassword: "", newPassword: "" }));
  };

  const handleDelete = async () => {
    if (!session.userId) return;
    await deleteUser(session.userId);
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-8">
      <section className="workspace-card rounded-[36px] p-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Account settings</div>
        <h1 className="mt-4 text-5xl font-semibold text-[var(--workspace-text)]">Manage your profile and security.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 workspace-muted">
          Manage identity, profile details, and account security from a dedicated settings surface connected directly to the platform APIs.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="workspace-card rounded-[32px] p-7">
          <div className="space-y-4">
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="Email"
              className={inputClass}
            />
            <input
              value={form.phoneNumber}
              onChange={(event) => setForm((current) => ({ ...current, phoneNumber: event.target.value }))}
              placeholder="Phone number"
              className={inputClass}
            />
            <input
              type="password"
              value={form.currentPassword}
              onChange={(event) => setForm((current) => ({ ...current, currentPassword: event.target.value }))}
              placeholder="Current password"
              className={inputClass}
            />
            <input
              type="password"
              value={form.newPassword}
              onChange={(event) => setForm((current) => ({ ...current, newPassword: event.target.value }))}
              placeholder="New password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-[var(--workspace-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white"
            >
              Save changes
            </button>
          </div>
        </div>

        <div className="workspace-card rounded-[32px] p-7">
          <div className="text-xs uppercase tracking-[0.28em] text-[var(--workspace-coral)]">Danger zone</div>
          <p className="mt-4 text-sm leading-7 workspace-muted">
            Delete your account permanently. This calls the backend delete profile endpoint directly.
          </p>
          <button
            type="button"
            onClick={handleDelete}
            className="mt-6 rounded-full bg-[var(--workspace-coral)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white"
          >
            Delete account
          </button>
          {message && <div className="mt-5 rounded-[18px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm workspace-muted">{message}</div>}
        </div>
      </section>
    </div>
  );
};

export default AccountSettings;
