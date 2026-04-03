import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyEnrollments, unenrollFromCourse } from "../services/enrollmentService";
import { getSession } from "../services/sessionService";

interface Enrollment {
  enrollmentId: number;
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
}

const MyCourses: React.FC = () => {
  const session = getSession();
  const [courses, setCourses] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEnrollments = async () => {
    try {
      const response = await getMyEnrollments();
      setCourses(response.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleUnenroll = async (courseId: string) => {
    if (!session.userId) return;
    await unenrollFromCourse(session.userId, courseId);
    await loadEnrollments();
  };

  if (loading) {
    return <div className="workspace-card rounded-[28px] px-6 py-10 text-sm uppercase tracking-[0.28em] text-[var(--workspace-primary)]">Loading enrolled courses</div>;
  }

  return (
    <div className="space-y-8">
      <section className="workspace-card rounded-[34px] p-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Learner dashboard</div>
        <h1 className="display-font mt-4 text-6xl leading-none tracking-[-0.04em] text-[var(--workspace-text)]">Your active learning queue.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 workspace-muted">
          This screen maps directly to the PDF’s enrolled courses dashboard flow and adds a cleaner continue or unenroll experience.
        </p>
      </section>

      {courses.length === 0 ? (
        <div className="workspace-card rounded-[30px] p-8 text-sm workspace-muted">
          No enrollments yet. Start from the catalog and build your first learning path.
        </div>
      ) : (
        <section className="grid gap-5 lg:grid-cols-2">
          {courses.map((course) => (
            <article key={course.enrollmentId} className="workspace-card rounded-[30px] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-[var(--workspace-cyan)]">Enrolled</div>
                  <h2 className="display-font mt-3 text-4xl leading-none text-[var(--workspace-text)]">{course.courseTitle}</h2>
                  <p className="mt-4 text-sm workspace-muted">
                    Joined {new Date(course.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="workspace-pill rounded-full px-3 py-2 text-xs uppercase tracking-[0.24em]">
                  Active
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/courses/${course.courseId}`}
                  className="rounded-full bg-[var(--workspace-primary)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white"
                >
                  Continue
                </Link>
                <button
                  type="button"
                  onClick={() => handleUnenroll(course.courseId)}
                  className="rounded-full border border-[var(--workspace-line)] bg-white px-5 py-3 text-sm uppercase tracking-[0.22em] workspace-muted transition hover:border-[var(--workspace-primary)]/25"
                >
                  Unenroll
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default React.memo(MyCourses);
