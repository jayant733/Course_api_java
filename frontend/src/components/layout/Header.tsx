import React, { useState, useCallback, FormEvent, ChangeEvent, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  const token = useMemo(() => localStorage.getItem("token"), []);

  /**
   * Logout handler
   */
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  /**
   * Search submit
   */
  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!query.trim()) return;

      navigate(`/search?q=${query}`);
    },
    [query, navigate]
  );

  /**
   * Input change handler
   */
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0b0f19]/80 border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link
          to={token ? "/dashboard" : "/"}
          className="text-2xl font-semibold tracking-wide text-purple-400 hover:text-purple-300 transition"
        >
          EduSphere
        </Link>

        {/* Search Bar (Only when logged in) */}
        {token && (
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-purple-500 transition"
          >
            <input
              type="text"
              placeholder="Search courses..."
              value={query}
              onChange={handleInputChange}
              className="bg-transparent outline-none text-sm w-56 placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 px-4 py-1.5 text-sm rounded-lg transition"
            >
              Search
            </button>
          </form>
        )}

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">

          {token ? (
            <>
              <Link
                to="/all-courses"
                className="text-gray-300 hover:text-white transition"
              >
                All Courses
              </Link>

              <Link
                to="/my-courses"
                className="text-gray-300 hover:text-white transition"
              >
                My Courses
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-300 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}

        </nav>

      </div>

    </header>
  );
};

export default React.memo(Header);