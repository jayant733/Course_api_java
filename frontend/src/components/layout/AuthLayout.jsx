import { motion } from "framer-motion";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbfcff_0%,#eef2f8_100%)] text-[var(--workspace-text)]">
      <div className="absolute inset-0 workspace-grid opacity-60" />
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(95,111,255,0.14)_0%,_transparent_62%)]" />
      <div className="absolute right-0 top-8 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(255,143,112,0.12)_0%,_transparent_62%)]" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hidden px-10 py-14 lg:flex lg:flex-col lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="workspace-pill inline-flex rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em]">
              Course Platform API
            </span>
            <h1 className="mt-8 text-7xl font-semibold leading-[0.92] tracking-[-0.05em] text-[var(--workspace-text)]">
              Product-grade learning with a cleaner visual system.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--workspace-muted)]">
              Secure auth, enrollment flows, admin tooling, and progress visibility
              wrapped in a softer, brighter interface that now matches the dashboard and app workspace.
            </p>
          </motion.div>

          <div className="grid max-w-xl grid-cols-2 gap-4">
            {[
              "JWT access + refresh flow",
              "Role-aware dashboards",
              "Course depth + progress tracking",
              "Admin authoring workspace",
            ].map((item) => (
              <div key={item} className="workspace-card rounded-[28px] p-5 text-sm text-[var(--workspace-muted)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 md:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="workspace-card w-full max-w-xl rounded-[32px] border border-[var(--workspace-line)] p-8 shadow-[0_24px_80px_rgba(31,37,64,0.12)] md:p-10"
          >
            <div className="mb-8">
              <div className="workspace-pill mb-3 inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em]">
                EduSphere
              </div>
              <h2 className="text-5xl font-semibold leading-none tracking-[-0.04em] text-[var(--workspace-text)]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--workspace-muted)]">{subtitle}</p>
            </div>

            <div className="space-y-4">{children}</div>

            {footer && (
              <div className="mt-8 border-t border-[var(--workspace-line)] pt-5 text-sm text-[var(--workspace-muted)]">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
