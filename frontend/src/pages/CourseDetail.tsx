import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { markLessonComplete } from "../services/progressService";
import { getCourseReviews, addCourseReview } from "../services/reviewService";

interface Subtopic {
  id: string | number;
  title: string;
}

interface Topic {
  id: string | number;
  title: string;
  subtopics: Subtopic[];
}

interface Course {
  id: string | number;
  title: string;
  topics: Topic[];
}

interface Review {
  id: string | number;
  rating: number;
  comment: string;
  userEmail?: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  /**
   * Fetch course
   */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;

        const res = await getCourseById(id);

        // FIX: backend returns { success, data, message }
        setCourse(res.data?.data || null);

      } catch (error) {
        console.error("Failed to fetch course", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  /**
   * Fetch reviews
   */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!id) return;

        const res = await getCourseReviews(id);

        setReviews(res.data?.data || []);

      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, [id]);

  /**
   * Mark lesson complete
   */
  const handleComplete = useCallback(async (lessonId: string | number) => {
    try {
      await markLessonComplete(lessonId);
      alert("Lesson marked complete ✅");
    } catch (error) {
      console.error("Failed to mark lesson complete", error);
    }
  }, []);

  /**
   * Submit review
   */
  const handleReviewSubmit = useCallback(async () => {
    try {
      if (!id) return;

      await addCourseReview(id, rating, comment);

      const res = await getCourseReviews(id);

      setReviews(res.data?.data || []);

      setComment("");
      setRating(5);

    } catch (error) {
      console.error("Failed to submit review", error);
    }
  }, [id, rating, comment]);

  /**
   * Render topics and lessons
   */
  const topicSections = useMemo(() => {
    if (!course || !course.topics) return null;

    return course.topics.map((topic) => (
      <div key={topic.id} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {topic.title}
        </h2>

        <div className="space-y-3">
          {(topic.subtopics || []).map((sub) => (
            <div
              key={sub.id}
              className="
                flex items-center justify-between
                bg-white/5
                backdrop-blur-lg
                border border-white/10
                p-4
                rounded-xl
                transition
                hover:border-indigo-500
              "
            >
              <span className="text-sm">
                {sub.title}
              </span>

              <button
                onClick={() => handleComplete(sub.id)}
                className="text-green-400 text-sm hover:text-green-300 transition"
              >
                Mark Complete
              </button>
            </div>
          ))}
        </div>
      </div>
    ));
  }, [course, handleComplete]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-red-400">
        Course not found.
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Course Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">
          {course.title}
        </h1>

        <p className="text-white/80">
          Complete lessons and track your progress.
        </p>
      </div>

      {/* Topics */}
      <div>
        {topicSections}
      </div>

      {/* Reviews Section */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Course Reviews
        </h2>

        {/* Review Form */}
        <div className="mb-6 space-y-3">

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="bg-black/30 border border-white/10 p-2 rounded-lg"
          >
            {[5,4,3,2,1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-black/30 border border-white/10 p-3 rounded-lg"
          />

          <button
            onClick={handleReviewSubmit}
            className="bg-indigo-600 px-4 py-2 rounded-lg hover:opacity-90"
          >
            Submit Review
          </button>

        </div>

        {/* Reviews */}
        <div className="space-y-4">

          {reviews.length === 0 && (
            <p className="text-gray-400">
              No reviews yet.
            </p>
          )}

          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-black/30 border border-white/10 p-4 rounded-lg"
            >

              <div className="flex justify-between mb-2">

                <span className="text-yellow-400">
                  {"⭐".repeat(review.rating)}
                </span>

                <span className="text-gray-400 text-sm">
                  {review.userEmail || "Student"}
                </span>

              </div>

              <p className="text-gray-300 text-sm">
                {review.comment}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default React.memo(CourseDetail);