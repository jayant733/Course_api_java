import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex bg-[#0B1120] text-white">

      {/* Left Branding Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 items-center justify-center p-16">
        <div>
          <h1 className="text-5xl font-bold mb-6">EduSphere</h1>
          <p className="text-lg opacity-90">
            A modern learning platform built for structured growth.
          </p>
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10">
          <h2 className="text-3xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-400 mb-6">{subtitle}</p>

          {children}

          {footer && (
            <div className="mt-6 text-sm text-gray-400 text-center">
              {footer}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}