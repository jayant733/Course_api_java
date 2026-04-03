import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

const floatingOrbs = [
  "left-[10%] top-28 h-24 w-24",
  "right-[14%] top-44 h-16 w-16",
  "left-[30%] top-[22rem] h-12 w-12",
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <section className="relative overflow-hidden rounded-[40px] border border-[var(--workspace-line)] bg-[rgba(255,255,255,0.82)] px-6 py-10 shadow-[0_30px_80px_rgba(31,37,64,0.08)] sm:px-8 lg:px-12 lg:py-16">
        {floatingOrbs.map((className, index) => (
          <motion.div
            key={className}
            animate={{ y: [0, -14, 0], rotate: [0, 8, -4, 0] }}
            transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
            className={`hero-orb opacity-70 ${className}`}
          />
        ))}

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="workspace-pill mb-6 inline-flex rounded-full px-4 py-2 text-xs uppercase tracking-[0.34em]">
                Spring Boot + React Platform
              </div>
              <h1 className="max-w-5xl text-[clamp(3.4rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--workspace-text)]">
                Full-stack course delivery with cleaner product UI and complete backend coverage.
              </h1>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-[var(--workspace-muted)]">
                JWT auth, role-aware routing, course exploration, enrollment, progress
                tracking, search, admin authoring, user management, and password reset
                flows presented in a lighter dashboard-inspired interface.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => navigate("/all-courses")}
                className="rounded-full bg-[var(--workspace-primary)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:scale-[1.02]"
              >
                Explore catalog
              </button>
              <Link
                to="/register"
                className="rounded-full border border-[var(--workspace-line)] bg-white px-7 py-4 text-sm uppercase tracking-[0.24em] text-[var(--workspace-text)] transition hover:bg-[#f7f9ff]"
              >
                Create account
              </Link>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-tilt workspace-card rounded-[32px] p-6 sm:col-span-2">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Product panel</div>
              <div className="mt-4 text-5xl font-semibold leading-none tracking-[-0.04em] text-[var(--workspace-text)]">Search. Learn. Manage.</div>
              <p className="mt-4 text-sm leading-7 text-[var(--workspace-muted)]">
                The landing section now follows the brighter reference direction, with softer cards, product-grade spacing, and less visual heaviness.
              </p>
            </div>
            {[
              ["JWT", "Access + refresh token loop"],
              ["RBAC", "USER and ADMIN experiences"],
              ["Search", "Course, topic, and subtopic discovery"],
              ["Admin", "Course, user, and enrollment management"],
            ].map(([label, copy]) => (
              <div key={label} className="card-tilt workspace-card rounded-[28px] p-5">
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-cyan)]">{label}</div>
                <p className="mt-4 text-sm leading-7 text-[var(--workspace-muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="workspace-card rounded-[34px] p-7">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Bento architecture</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              "Responsive catalog and detail views",
              "Protected learner dashboard routes",
              "Admin authoring and moderation tools",
              "Progress and enrollment API integration",
            ].map((item, index) => (
              <div key={item} className={`rounded-[26px] border border-[var(--workspace-line)] p-5 ${index === 0 ? "bg-[rgba(95,111,255,0.08)]" : "bg-white"}`}>
                <div className="text-sm leading-7 text-[var(--workspace-muted)]">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="workspace-card rounded-[34px] p-7">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Platform capabilities</div>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--workspace-muted)]">
            <li>Authentication, refresh-token handling, and secure session persistence</li>
            <li>Course discovery, search, enrollment, and structured progress tracking</li>
            <li>Admin management for content, users, subtopics, and platform enrollments</li>
            <li>Profile settings, recovery flows, and role-aware learner or admin experiences</li>
          </ul>
        </div>
      </section>
    </PageWrapper>
  );
};

export default React.memo(Landing);
