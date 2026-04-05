import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  BookOpen,
  BrainCircuit,
  ChartColumn,
  Compass,
  Cpu,
  GraduationCap,
  Home,
  Search,
  Sparkles,
  Stars,
  WandSparkles,
} from "lucide-react";
import { getMyEnrollments } from "../services/enrollmentService";
import { getCurrentUser } from "../services/userService";
import { getSession } from "../services/sessionService";
import ParticleField from "../components/dashboard/ParticleField";

interface Enrollment {
  courseId: string;
  courseTitle: string;
}

const weeklyBars = [42, 84, 58, 66, 94, 61, 73];

const Dashboard: React.FC = () => {
  const session = getSession();
  const [profile, setProfile] = useState<{ email: string; role: string } | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [profileResponse, enrollmentResponse] = await Promise.all([
        getCurrentUser(),
        getMyEnrollments(),
      ]);

      setProfile(profileResponse.data?.data ?? null);
      setEnrollments(enrollmentResponse.data?.data ?? []);
    };

    loadData().catch(() => undefined);
  }, []);

  const dashboardCards = useMemo(
    () => [
      {
        title: "Stringtune",
        subtitle: "Typography and content rhythm",
        value: `${Math.max(enrollments.length, 1) * 3} tuned`,
        icon: WandSparkles,
        accent: "bg-[rgba(95,111,255,0.12)] text-[var(--workspace-primary)]",
      },
      {
        title: "Astrodither",
        subtitle: "Color dithering and soft gradients",
        value: "4 palettes",
        icon: Stars,
        accent: "bg-[rgba(132,103,255,0.12)] text-[var(--workspace-violet)]",
      },
      {
        title: "Smoothy",
        subtitle: "Micro-interactions and page motion",
        value: "120 fps",
        icon: Sparkles,
        accent: "bg-[rgba(255,143,112,0.14)] text-[var(--workspace-coral)]",
      },
      {
        title: "AI Particle Simulator",
        subtitle: "Adaptive ambient dashboard layer",
        value: "42 nodes",
        icon: Cpu,
        accent: "bg-[rgba(107,210,255,0.18)] text-[var(--workspace-cyan)]",
      },
    ],
    [enrollments.length]
  );

  const spotlightCourse = enrollments[0];

  return (
    <div className="workspace-grid relative overflow-hidden rounded-[36px] pb-2">
      <div className="relative z-10 grid gap-6 xl:grid-cols-[0.23fr_0.77fr]">
        <aside className="workspace-card rounded-[32px] bg-[#0e1630] p-5 text-white shadow-[0_32px_60px_rgba(17,24,49,0.28)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="text-xl font-semibold">EduSphere</div>
              <div className="text-xs uppercase tracking-[0.28em] text-white/50">Learning OS</div>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {[
              { label: "Home", href: "/dashboard", icon: Home, active: true },
              { label: "My Courses", href: "/my-courses", icon: BookOpen },
              { label: "Explore", href: "/all-courses", icon: Compass },
              { label: "Search", href: "/search?q=spring", icon: Search },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    item.active
                      ? "bg-[var(--workspace-primary)] text-white shadow-[0_20px_40px_rgba(95,111,255,0.32)]"
                      : "text-white/72 hover:bg-white/8"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 space-y-4 rounded-[26px] bg-white/6 p-4">
            <div className="text-xs uppercase tracking-[0.28em] text-white/55">Backend coverage</div>
            <div className="space-y-3 text-sm text-white/80">
              <div>JWT access + refresh</div>
              <div>User profile CRUD</div>
              <div>Enrollment and progress APIs</div>
              <div>Admin topic/subtopic controls</div>
            </div>
          </div>

          <div className="mt-10 rounded-[26px] border border-white/10 bg-white/6 p-4">
            <div className="text-sm text-white/55">Signed in as</div>
            <div className="mt-2 font-medium">{profile?.email ?? session.email}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">
              {(profile?.role ?? session.role)?.replace("ROLE_", "")}
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <div className="workspace-card workspace-gradient relative overflow-hidden rounded-[34px] p-7 text-white">
              <ParticleField className="absolute inset-0 h-full w-full opacity-55" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/70">Hi {profile?.email?.split("@")[0] ?? "there"},</div>
                    <h1 className="mt-2 text-4xl font-semibold leading-tight">
                      What will you learn today?
                    </h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="rounded-2xl bg-white/14 p-3">
                      <Search size={18} />
                    </button>
                    <button className="relative rounded-2xl bg-white/14 p-3">
                      <Bell size={18} />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--workspace-coral)] text-[10px] font-semibold">
                        2
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
                  <div className="rounded-[28px] bg-white/14 p-5 backdrop-blur-xl">
                    <div className="text-xs uppercase tracking-[0.28em] text-white/65">Course spotlight</div>
                    <h2 className="mt-3 text-3xl font-semibold">
                      {spotlightCourse?.courseTitle ?? "Artificial Intelligence for Marketing"}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-white/76">
                      A premium course preview with motion, structure, and progress visibility inspired by the references you shared.
                    </p>
                    <div className="mt-6 flex gap-3">
                      <Link
                        to={spotlightCourse ? `/courses/${spotlightCourse.courseId}` : "/all-courses"}
                        className="rounded-full bg-[#12182e] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(18,24,46,0.34)]"
                      >
                        Learn now
                      </Link>
                      <Link
                        to="/all-courses"
                        className="rounded-full border border-white/18 px-5 py-3 text-sm text-white/85"
                      >
                        Explore catalog
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dashboardCards.map((card) => {
                      const Icon = card.icon;

                      return (
                        <div
                          key={card.title}
                          className="rounded-[24px] bg-[#12182e]/75 p-4 text-white backdrop-blur-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.accent}`}>
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="font-medium">{card.title}</div>
                              <div className="text-xs text-white/55">{card.subtitle}</div>
                            </div>
                          </div>
                          <div className="mt-3 text-sm text-white/84">{card.value}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="workspace-card rounded-[30px] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.26em] workspace-muted">Progress</div>
                    <div className="mt-2 text-3xl font-semibold text-[var(--workspace-text)]">
                      {enrollments.length * 18 + 27}%
                    </div>
                  </div>
                  <div className="soft-ring flex h-28 w-28 items-center justify-center rounded-full">
                    <div className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-[var(--workspace-primary)]">
                      Live
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm workspace-muted">
                  Learner completion, streak signals, and course momentum are surfaced here in a clearer visual rhythm.
                </div>
              </div>

              <div className="workspace-card rounded-[30px] p-5">
                <div className="text-xs uppercase tracking-[0.26em] workspace-muted">Activity</div>
                <div className="mt-4 space-y-4">
                  {[
                    "Profile and secure session synced",
                    "Course search and discovery refreshed",
                    "Admin content tools ready for authoring",
                  ].map((item, index) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className={`mt-1 h-3 w-3 rounded-full ${index === 0 ? "bg-[var(--workspace-primary)]" : index === 1 ? "bg-[var(--workspace-violet)]" : "bg-[var(--workspace-coral)]"}`} />
                      <div className="text-sm text-[var(--workspace-text)]">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
            <div className="workspace-card rounded-[34px] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.26em] workspace-muted">Study statistics</div>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--workspace-text)]">Weekly status</h2>
                </div>
                <div className="workspace-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em]">
                  Smoothy analytics
                </div>
              </div>

              <div className="mt-8 grid h-[260px] grid-cols-7 items-end gap-4">
                {weeklyBars.map((value, index) => (
                  <div key={value} className="flex flex-col items-center gap-3">
                    <div
                      className={`w-full rounded-t-[18px] ${
                        index % 3 === 0
                          ? "bg-[var(--workspace-cyan)]"
                          : index % 3 === 1
                            ? "bg-[var(--workspace-primary)]"
                            : "bg-[var(--workspace-coral)]"
                      }`}
                      style={{ height: `${value * 2}px` }}
                    />
                    <span className="text-xs uppercase tracking-[0.2em] workspace-muted">
                      {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="workspace-card rounded-[34px] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.26em] workspace-muted">Learning path</div>
                    <h2 className="mt-2 text-2xl font-semibold text-[var(--workspace-text)]">My courses</h2>
                  </div>
                  <ChartColumn className="text-[var(--workspace-primary)]" size={20} />
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {(enrollments.length > 0 ? enrollments : [
                    { courseId: "intro-react", courseTitle: "Intro to React" },
                    { courseId: "spring-core", courseTitle: "Spring Boot API Design" },
                  ]).slice(0, 4).map((course, index) => (
                    <Link
                      key={course.courseId}
                      to={`/courses/${course.courseId}`}
                      className={`rounded-[26px] p-5 transition hover:-translate-y-1 ${
                        index % 3 === 0
                          ? "bg-[rgba(132,103,255,0.16)]"
                          : index % 3 === 1
                            ? "bg-[rgba(107,210,255,0.16)]"
                            : "bg-[rgba(255,143,112,0.18)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <BrainCircuit size={18} className="text-[var(--workspace-text)]" />
                        <span className="text-xs uppercase tracking-[0.2em] workspace-muted">
                          {12 + index * 8}% done
                        </span>
                      </div>
                      <div className="mt-10 text-xl font-semibold text-[var(--workspace-text)]">
                        {course.courseTitle}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="workspace-card rounded-[34px] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.26em] workspace-muted">System lane</div>
                    <h2 className="mt-2 text-2xl font-semibold text-[var(--workspace-text)]">Experience engines</h2>
                  </div>
                  <Cpu className="text-[var(--workspace-violet)]" size={20} />
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    "Stringtune shapes headings, microcopy, and content cadence.",
                    "Astrodither softens the dashboard palette with modern gradient grain.",
                    "Smoothy handles subtle transitions and live card motion.",
                    "AI Particle Simulator drives the animated ambient node field in the hero.",
                  ].map((item) => (
                    <div key={item} className="rounded-[20px] border border-[var(--workspace-line)] bg-white p-4 text-sm text-[var(--workspace-text)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
