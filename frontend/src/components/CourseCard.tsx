import React, { useMemo } from "react";
import { Link } from "react-router-dom";

interface Course {
  id: string | number;
  title: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {

  /**
   * Memoize truncated description
   * Prevent recalculation on re-renders
   */
  const shortDescription = useMemo(() => {
    if (!course.description) return "";
    return course.description.length > 120
      ? course.description.slice(0, 120) + "..."
      : course.description;
  }, [course.description]);

  return (
    <div
      className="
        group
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-2xl
        p-6
        transition-all duration-300
        hover:shadow-2xl
        hover:scale-[1.02]
        flex flex-col justify-between
      "
    >
      {/* Course Title */}
      <h2 className="text-lg font-semibold text-white group-hover:text-purple-400 transition">
        {course.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-400 mt-2">
        {shortDescription}
      </p>

      {/* Action */}
      <Link
        to={`/courses/${course.id}`}
        className="
          mt-5
          inline-block
          bg-gradient-to-r
          from-indigo-500
          to-purple-600
          px-4 py-2
          rounded-lg
          text-sm
          font-medium
          text-white
          hover:opacity-90
          transition
          w-fit
        "
      >
        View Course
      </Link>
    </div>
  );
};

export default React.memo(CourseCard);