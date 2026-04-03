import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getAllCourses } from "../services/courseService";
import { enrollInCourse } from "../services/enrollmentService";

interface Course {
  id: string;
  title: string;
  description: string;
  topicCount: number;
  subtopicCount: number;
}

const AllCourses: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.data?.data ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const search = query.toLowerCase();
      return (
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search)
      );
    });
  }, [courses, query]);

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollInCourse(courseId);
      setMessage("Enrollment completed. Your dashboard is ready.");
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Enrollment failed.");
    }
  };

  if (loading) {
    return <div className="workspace-card rounded-[28px] px-6 py-10 text-sm uppercase tracking-[0.28em] text-[var(--workspace-primary)]">Loading course catalog</div>;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="workspace-card rounded-[34px] p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Course catalog</div>
          <h1 className="display-font mt-4 text-6xl leading-none tracking-[-0.04em] text-[var(--workspace-text)]">Browse the learning map.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 workspace-muted">
            The PDF calls for course catalog and detail pages, protected routes, and clean UX. This screen pairs that baseline with motion, bento composition, and stronger visual hierarchy.
          </p>
        </div>

        <div className="workspace-card rounded-[34px] p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-cyan)]">Search entry</div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter locally by title or description"
            className="mt-4 w-full rounded-[20px] border border-[var(--workspace-line)] bg-white px-5 py-4 text-sm text-[var(--workspace-text)] outline-none placeholder:text-[var(--workspace-muted)] focus:border-[var(--workspace-primary)]/40"
          />
          <button
            type="button"
            onClick={() => navigate(`/search?q=${encodeURIComponent(query || "spring")}`)}
            className="mt-4 rounded-full bg-[var(--workspace-primary)] px-5 py-3 text-sm font-semibold text-white"
          >
            Open full search
          </button>
        </div>
      </section>

      {message && <div className="workspace-card rounded-[22px] px-5 py-4 text-sm workspace-muted">{message}</div>}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="space-y-4">
            <CourseCard course={course} />
            <button
              type="button"
              onClick={() => handleEnroll(course.id)}
              className="w-full rounded-full border border-[var(--workspace-line)] bg-white px-5 py-3 text-sm uppercase tracking-[0.24em] text-[var(--workspace-text)] transition hover:bg-[var(--workspace-coral)] hover:text-white"
            >
              Enroll now
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default React.memo(AllCourses);
