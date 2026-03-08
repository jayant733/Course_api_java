import React, { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  /**
   * Read token on mount
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const navItemClass =
    "text-gray-300 hover:text-white transition-colors duration-200";

  const activeClass = "text-indigo-400";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-[#0b0f19]/80">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-semibold tracking-wide text-indigo-400 hover:text-indigo-300 transition"
        >
          EduSphere
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : ""}`
            }
          >
            Home
          </NavLink>

          {/* Show only if logged in */}
          {token && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? activeClass : ""}`
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Show only if logged OUT */}
          {!token && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? activeClass : ""}`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? activeClass : ""}`
                }
              >
                Register
              </NavLink>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white transition"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : ""}`
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>

          {token && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? activeClass : ""}`
              }
              onClick={toggleMenu}
            >
              Dashboard
            </NavLink>
          )}

          {!token && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? activeClass : ""}`
                }
                onClick={toggleMenu}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? activeClass : ""}`
                }
                onClick={toggleMenu}
              >
                Register
              </NavLink>
            </>
          )}

        </div>
      )}

    </nav>
  );
};

export default React.memo(Navbar);