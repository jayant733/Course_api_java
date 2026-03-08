import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * PageWrapper
 * Provides a consistent layout across pages
 * Includes Navbar, Footer, and main content container
 */

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f19] text-white">

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default React.memo(PageWrapper);