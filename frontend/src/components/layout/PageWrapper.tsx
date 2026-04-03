import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbfcff_0%,#eef2f8_100%)] text-[var(--workspace-text)]">
      <div className="absolute inset-0 workspace-grid opacity-60" />
      <div className="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(95,111,255,0.14)_0%,_transparent_62%)]" />
      <div className="absolute right-0 top-8 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(255,143,112,0.12)_0%,_transparent_62%)]" />
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default React.memo(PageWrapper);
