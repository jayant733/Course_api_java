import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>Production-grade learning platform with a polished Spring Boot API and immersive React experience.</p>
        <p>Built for Jayant Sharma • Spring Boot API • React + TypeScript frontend</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
