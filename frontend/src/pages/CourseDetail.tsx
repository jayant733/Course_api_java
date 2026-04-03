import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { getCourseProgress, markLessonComplete, resetCourseProgress } from "../services/progressService";
import { addCourseReview, getCourseReviews } from "../services/reviewService";
import { getSession } from "../services/sessionService";

interface Subtopic {
  id: string;
  title: string;
  content?: string;
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

interface ProgressSubtopic {
  subtopicId: string;
  completed: boolean;
}

interface ProgressResponse {
  completionPercentage: number;
  completedSubtopics: number;
  totalSubtopics: number;
  topics: Array<{
    topicId: string;
    completedSubtopics: number;
    totalSubtopics: number;
    subtopics: ProgressSubtopic[];
  }>;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  userEmail?: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const session = getSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<ProgressResponse | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const loadCourseData = async () => {
    if (!id) return;

    const requests = [getCourseById(id), getCourseReviews(id)];
    if (session.userId) {
      requests.push(getCourseProgress(session.userId, id));
    }

    const [courseResponse, reviewResponse, progressResponse] = await Promise.all(requests as any);
    setCourse(courseResponse.data?.data ?? null);
    setReviews(reviewResponse.data?.data ?? []);
    setProgress(progressResponse?.data?.data ?? null);
  };

  useEffect(() => {
    loadCourseData()
      .catch(() => setMessage("Could not load course data."))
      .finally(() => setLoading(false));
  }, [id]);

  const completionBySubtopic = useMemo(() => {
    const lookup = new Set<string>();
    progress?.topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic) => {
        if (subtopic.completed) lookup.add(subtopic.subtopicId);
      });
    });
    return lookup;
  }, [progress]);

  const handleComplete = async (subtopicId: string) => {
    try {
      await markLessonComplete(subtopicId);
      await loadCourseData();
      setMessage("Subtopic marked as complete.");
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Unable to update progress.");
    }
  };

  const handleReset = async () => {
    if (!session.userId || !id) return;
    await resetCourseProgress(session.userId, id);
    await loadCourseData();
    setMessage("Course progress reset.");
  };

  const handleReview = async () => {
    if (!id) return;
    await addCourseReview(id, rating, comment);
    setComment("");
    setRating(5);
    await loadCourseData();
    setMessage("Review submitted.");
  };

  if (loading) {
    return <div className="workspace-card rounded-[28px] px-6 py-10 text-sm uppercase tracking-[0.28em] text-[var(--workspace-primary)]">Loading course detail</div>;
  }

  if (!course) {
    return <div className="workspace-card rounded-[28px] p-8 text-sm workspace-muted">Course not found.</div>;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="workspace-card rounded-[38px] p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Course detail</div>
          <h1 className="display-font mt-4 text-6xl leading-none tracking-[-0.04em] text-[var(--workspace-text)]">{course.title}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 workspace-muted">{course.description}</p>
          {message && <div className="mt-5 rounded-[20px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm workspace-muted">{message}</div>}
        </div>

        <div className="grid gap-4">
          <div className="workspace-card rounded-[28px] p-6">
            <div className="text-xs uppercase tracking-[0.28em] text-[var(--workspace-cyan)]">Completion</div>
            <div className="mt-4 display-font text-5xl leading-none text-[var(--workspace-text)]">
              {Math.round(progress?.completionPercentage ?? 0)}%
            </div>
            <p className="mt-3 text-sm workspace-muted">
              {progress?.completedSubtopics ?? 0} of {progress?.totalSubtopics ?? course.topics.reduce((total, topic) => total + topic.subtopics.length, 0)} lessons complete
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-[var(--workspace-line)] bg-white px-5 py-4 text-sm uppercase tracking-[0.22em] workspace-muted transition hover:border-[var(--workspace-primary)]/25"
          >
            Reset progress
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {course.topics.map((topic) => (
            <article key={topic.id} className="workspace-card rounded-[30px] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-[var(--workspace-primary)]">Topic</div>
                  <h2 className="mt-3 text-2xl text-[var(--workspace-text)]">{topic.title}</h2>
                </div>
                <div className="rounded-full border border-[var(--workspace-line)] bg-white px-4 py-2 text-xs uppercase tracking-[0.22em] workspace-muted">
                  {topic.subtopics.length} lessons
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {topic.subtopics.map((subtopic) => {
                  const completed = completionBySubtopic.has(subtopic.id);

                  return (
                    <div
                      key={subtopic.id}
                      className="flex flex-col gap-4 rounded-[24px] border border-[var(--workspace-line)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="text-lg text-[var(--workspace-text)]">{subtopic.title}</h3>
                        {subtopic.content && (
                          <p className="mt-2 text-sm leading-7 workspace-muted">{subtopic.content}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        disabled={completed}
                        onClick={() => handleComplete(subtopic.id)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                          completed
                            ? "bg-[var(--workspace-cyan)] text-[var(--workspace-text)]"
                            : "bg-[var(--workspace-primary)] text-white hover:scale-[1.02]"
                        }`}
                      >
                        {completed ? "Completed" : "Mark complete"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-5">
          <section className="workspace-card rounded-[30px] p-6">
            <div className="text-xs uppercase tracking-[0.28em] text-[var(--workspace-primary)]">Write a review</div>
            <div className="mt-5 space-y-4">
              <select
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                className="w-full rounded-[18px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm text-[var(--workspace-text)]"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} stars
                  </option>
                ))}
              </select>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={5}
                placeholder="Share the learning experience"
                className="w-full rounded-[18px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm text-[var(--workspace-text)] outline-none placeholder:text-[var(--workspace-muted)]"
              />
              <button
                type="button"
                onClick={handleReview}
                className="rounded-full bg-[var(--workspace-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white"
              >
                Submit review
              </button>
            </div>
          </section>

          <section className="workspace-card rounded-[30px] p-6">
            <div className="text-xs uppercase tracking-[0.28em] text-[var(--workspace-primary)]">Student feedback</div>
            <div className="mt-5 space-y-4">
              {reviews.length === 0 ? (
                <div className="rounded-[22px] border border-[var(--workspace-line)] bg-white p-4 text-sm workspace-muted">
                  No reviews yet.
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="rounded-[22px] border border-[var(--workspace-line)] bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm uppercase tracking-[0.2em] text-[var(--workspace-cyan)]">{review.rating} / 5</div>
                      <div className="text-xs workspace-muted">{review.userEmail ?? "Learner"}</div>
                    </div>
                    <p className="mt-3 text-sm leading-7 workspace-muted">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default React.memo(CourseDetail);
