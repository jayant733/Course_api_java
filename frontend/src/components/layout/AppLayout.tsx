import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import Header from "./Header";

/**
 * Main application layout
 * Protects routes and renders shared UI (Header)
 */

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    /**
     * Redirect to login if user is not authenticated
     */
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  /**
   * Prevent layout rendering if user is not authenticated
   */
  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <Header />

      <main className="px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default React.memo(AppLayout);