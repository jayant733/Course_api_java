import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Course {
  id: string | number;
  title: string;
  description: string;
  topicCount?: number;
  subtopicCount?: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="card-tilt workspace-card flex h-full flex-col justify-between rounded-[30px] p-6"
    >
      <div>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="workspace-pill inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
            Course
          </div>
          <div className="text-right text-xs workspace-muted">
            <div>{course.topicCount ?? 0} topics</div>
            <div>{course.subtopicCount ?? 0} lessons</div>
          </div>
        </div>

        <h2 className="display-font text-4xl leading-none tracking-[-0.04em] text-[var(--workspace-text)]">{course.title}</h2>
        <p className="mt-4 line-clamp-4 text-sm leading-7 workspace-muted">
          {course.description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--workspace-cyan)]">
          Structured learning
        </div>
        <Link
          to={`/courses/${course.id}`}
          className="rounded-full bg-[var(--workspace-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          Explore
        </Link>
      </div>
    </motion.article>
  );
};

export default React.memo(CourseCard);
