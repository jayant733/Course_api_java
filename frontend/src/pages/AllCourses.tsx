import React, { useEffect, useState, useCallback } from "react";
import { getAllCourses } from "../services/courseService";
import { enrollInCourse } from "../services/enrollmentService";
import CourseCard from "../components/CourseCard";

interface Course {
  id: string | number;
  title: string;
  description: string;
}

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Fetch courses
   */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("hello");
        const res = await getAllCourses();
        console.log(res);
        setCourses(res.data.data || []);
      } catch (error) {
        console.error("Failed to load courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /**
   * Enroll handler
   */
  const handleEnroll = useCallback(async (id: string | number) => {
    try {
      await enrollInCourse(id);
      alert("Enrolled successfully 🚀");
    } catch (error) {
      console.error("Enrollment failed", error);
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold">
        All Courses
      </h1>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {courses.map((course) => (
          <div key={course.id} className="relative">

            <CourseCard course={course} />

            {/* Enroll Button */}
            <button
              onClick={() => handleEnroll(course.id)}
              className="
                mt-3
                bg-emerald-500
                hover:bg-emerald-400
                px-4
                py-2
                rounded-lg
                text-sm
                transition
              "
            >
              Enroll
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default React.memo(AllCourses);