import React, { useMemo } from "react";
import { Link } from "react-router-dom";

interface Stat {
  label: string;
  value: string | number;
  color: string;
}

const Dashboard: React.FC = () => {
  const userEmail = localStorage.getItem("userEmail") || "Learner";

  /**
   * Memoize stats data
   */
  const stats: Stat[] = useMemo(
    () => [
      {
        label: "Enrolled Courses",
        value: 2,
        color: "hover:border-purple-500",
      },
      {
        label: "Completed Lessons",
        value: 14,
        color: "hover:border-indigo-500",
      },
      {
        label: "Learning Streak",
        value: "5 days",
        color: "hover:border-blue-500",
      },
    ],
    []
  );

  return (
    <div className="space-y-10">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back 👋
        </h1>

        <p className="text-white/90 text-lg">
          Continue building your knowledge and track your progress.
        </p>

        <p className="text-white/70 text-sm mt-2">
          Logged in as: {userEmail}
        </p>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`
              bg-white/5
              backdrop-blur-lg
              p-6
              rounded-2xl
              border border-white/10
              transition
              ${stat.color}
            `}
          >
            <p className="text-gray-400 text-sm">{stat.label}</p>

            <h2 className="text-3xl font-semibold mt-2">
              {stat.value}
            </h2>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to="/all-courses"
            className="
              group
              p-6
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-indigo-600
              hover:opacity-90
              transition
              shadow-lg
            "
          >
            <h3 className="text-xl font-semibold">
              Browse All Courses
            </h3>

            <p className="text-white/80 mt-2">
              Discover new structured learning paths.
            </p>
          </Link>

          <Link
            to="/my-courses"
            className="
              group
              p-6
              rounded-2xl
              bg-gradient-to-r
              from-emerald-500
              to-green-600
              hover:opacity-90
              transition
              shadow-lg
            "
          >
            <h3 className="text-xl font-semibold">
              My Enrollments
            </h3>

            <p className="text-white/80 mt-2">
              Continue where you left off.
            </p>
          </Link>

        </div>
      </section>

      {/* Platform Insight */}
      <section className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold mb-4">
          Platform Insight
        </h3>

        <p className="text-gray-400">
          EduSphere is built for structured progression — complete lessons,
          track progress, and build consistent learning habits.
        </p>
      </section>

    </div>
  );
};

export default React.memo(Dashboard);