import React, { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

interface Course {
  id: string | number;
  title: string;
  description: string;
}

interface Enrollment {
  enrollmentId: string | number;
  courseId: string | number;
  courseTitle: string;
}

const MyCourses: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Fetch enrollments
   */
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await API.get("/users/me/enrollments");
        setEnrollments(res.data.data || res.data || []);
      } catch (error) {
        console.error("Failed to load enrollments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  /**
   * Memoized enrollment list
   */
  const enrollmentCards = useMemo(() => {
    return enrollments.map((enrollment) => (
      <Link key={enrollment.enrollmentId} to={`/courses/${enrollment.courseId}`}>
        <div
          className="
            group
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            rounded-2xl
            p-6
            transition-all duration-300
            hover:shadow-2xl
            hover:scale-[1.02]
          "
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition">
            {enrollment.courseTitle}
          </h2>

         

          <div className="mt-4 text-indigo-400 text-sm">
            Continue Learning →
          </div>
        </div>
      </Link>
    ));
  }, [enrollments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400">
        Loading your courses...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold">
        My Enrolled Courses
      </h1>

      {enrollments.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-gray-400">
          You have not enrolled in any courses yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollmentCards}
        </div>
      )}

    </div>
  );
};

export default React.memo(MyCourses);