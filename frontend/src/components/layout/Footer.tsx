import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0b0f19]">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">

        {/* Left Section */}
        <p>
          © {currentYear}{" "}
          <span className="text-indigo-400 font-medium">EduSphere</span>. All rights reserved.
        </p>

        {/* Right Section */}
        <p className="flex items-center gap-1 mt-2 md:mt-0">
          Built with <span className="text-red-400">❤</span> by{" "}
          <span className="text-white font-medium">Jayant</span>
        </p>

      </div>

    </footer>
  );
};

export default React.memo(Footer);