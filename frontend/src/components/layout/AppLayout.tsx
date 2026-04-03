import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import { getSession } from "../../services/sessionService";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (!session.token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, session.token]);

  if (!session.token) return null;

  return (
    <div className="app-shell thin-scrollbar">
      <Header />
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default React.memo(AppLayout);
