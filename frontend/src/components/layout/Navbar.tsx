import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getSession } from "../../services/sessionService";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm transition ${
    isActive
      ? "bg-[var(--workspace-primary)] text-white"
      : "text-[var(--workspace-muted)] hover:bg-[rgba(95,111,255,0.08)] hover:text-[var(--workspace-text)]"
  }`;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const session = getSession();

  const authenticatedLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/all-courses", label: "Catalog" },
    { to: "/my-courses", label: "My Courses" },
    { to: "/search?q=spring", label: "Search" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--workspace-line)] bg-[rgba(251,252,255,0.78)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--workspace-primary)] text-base font-bold text-white shadow-[0_12px_40px_rgba(95,111,255,0.2)]">
            E
          </div>
          <div>
            <div className="text-2xl font-semibold leading-none text-[var(--workspace-text)]">EduSphere</div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--workspace-muted)]">
              Full-Stack Course Platform
            </div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 lg:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {session.isAuthenticated &&
            authenticatedLinks.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          {session.isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
          {!session.isAuthenticated && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className="rounded-full bg-[var(--workspace-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]">
                Register
              </NavLink>
            </>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-[var(--workspace-line)] bg-white px-4 py-2 text-sm text-[var(--workspace-muted)] lg:hidden"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--workspace-line)] px-4 py-4 sm:px-6 lg:hidden">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            {session.isAuthenticated &&
              authenticatedLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
            {session.isAdmin && (
              <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>
                Admin
              </NavLink>
            )}
            {!session.isAuthenticated && (
              <>
                <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-full bg-[var(--workspace-primary)] px-5 py-2 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(Navbar);
