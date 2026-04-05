import React, { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getSession } from "../../services/sessionService";
import { logoutAndClear } from "../../services/authService";

const navClass = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm transition ${
    active
      ? "bg-[var(--workspace-primary)] text-white shadow-[0_10px_22px_rgba(95,111,255,0.28)]"
      : "text-[var(--workspace-muted)] hover:bg-[rgba(95,111,255,0.08)] hover:text-[var(--workspace-text)]"
  }`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession();
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLogout = async () => {
    setBusy(true);
    await logoutAndClear();
    navigate("/login", { replace: true });
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/all-courses", label: "Catalog" },
    { to: "/my-courses", label: "My Courses" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--workspace-line)] bg-[rgba(246,248,252,0.82)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--workspace-primary)] font-bold text-white shadow-[0_16px_30px_rgba(95,111,255,0.26)]">
              E
            </div>
            <div>
              <div className="text-2xl font-semibold leading-none text-[var(--workspace-text)]">EduSphere</div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--workspace-muted)]">
                Learning Workspace
              </div>
            </div>
          </Link>

          {session.isAdmin && (
            <Link
              to="/admin"
              className="rounded-full border border-[var(--workspace-primary)]/20 bg-[var(--workspace-primary)]/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--workspace-primary)]"
            >
              Admin
            </Link>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 lg:items-center lg:justify-end">
          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={navClass(location.pathname === item.to)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <form onSubmit={handleSearch} className="workspace-card flex rounded-full px-2 py-2 lg:min-w-[360px]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search courses, topics, subtopics"
                className="w-full bg-transparent px-4 text-sm text-[var(--workspace-text)] outline-none placeholder:text-[var(--workspace-muted)]"
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--workspace-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Search
              </button>
            </form>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-[var(--workspace-line)] bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--workspace-muted)] sm:block">
                {session.email}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={busy}
                className="rounded-full border border-[var(--workspace-line)] bg-white px-5 py-2 text-sm text-[var(--workspace-muted)] transition hover:border-[var(--workspace-primary)]/30 hover:text-[var(--workspace-text)] disabled:opacity-60"
              >
                {busy ? "Leaving..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {location.pathname === "/dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mb-4 max-w-[1440px] px-4 sm:px-6 lg:px-10"
          >
            <div className="workspace-card rounded-[28px] px-5 py-4 text-sm leading-7 text-[var(--workspace-muted)]">
              Cleaner dashboard palette, motion-driven widgets, and fully integrated platform flows are now surfaced inside the workspace.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default React.memo(Header);
