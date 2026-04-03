import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  addSubtopicToTopic,
  addTopicToCourse,
  createCourse,
  deleteCourse,
  deleteSubtopic,
  deleteTopic,
  updateCourse,
  updateSubtopic,
  updateTopic,
} from "../services/adminCourseService";
import { getAllCourses, getCourseById } from "../services/courseService";
import { getAllEnrollments } from "../services/enrollmentService";
import { deleteUser, getAllUsers, updateUser } from "../services/userService";
import { clearSession, getSession } from "../services/sessionService";

interface CourseSummary {
  id: string;
  title: string;
  description: string;
}

interface Subtopic {
  id: string;
  title: string;
  content: string;
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

interface UserRecord {
  id: number;
  email: string;
  role: string;
  phoneNumber?: string;
}

interface EnrollmentRecord {
  enrollmentId: number;
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
}

const inputClass =
  "w-full rounded-[18px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm text-[var(--workspace-text)] outline-none placeholder:text-[var(--workspace-muted)] focus:border-[var(--workspace-primary)]/40";

const tabs = ["content", "users", "enrollments"] as const;

const AdminDashboard: React.FC = () => {
  const session = getSession();
  const [tab, setTab] = useState<(typeof tabs)[number]>("content");
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [message, setMessage] = useState("");
  const [courseForm, setCourseForm] = useState({ title: "", description: "" });
  const [topicTitle, setTopicTitle] = useState("");
  const [subtopicForm, setSubtopicForm] = useState({ topicId: "", title: "", content: "" });

  const loadCourses = async () => {
    const response = await getAllCourses();
    const data = response.data?.data ?? [];
    setCourses(data);

    if (!selectedCourseId && data.length > 0) {
      setSelectedCourseId(data[0].id);
    }
  };

  const loadSelectedCourse = async (courseId: string) => {
    if (!courseId) return;
    const response = await getCourseById(courseId);
    const data = response.data?.data ?? null;
    setSelectedCourse(data);
    if (data) {
      setCourseForm({ title: data.title, description: data.description });
      setSubtopicForm((current) => ({
        ...current,
        topicId: data.topics[0]?.id ?? "",
      }));
    }
  };

  const loadUsers = async () => {
    const response = await getAllUsers();
    setUsers(response.data?.data ?? []);
  };

  const loadEnrollments = async () => {
    const response = await getAllEnrollments();
    setEnrollments(response.data?.data ?? []);
  };

  useEffect(() => {
    Promise.all([loadCourses(), loadUsers(), loadEnrollments()]).catch(() =>
      setMessage("Could not load admin data.")
    );
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      loadSelectedCourse(selectedCourseId).catch(() => setMessage("Could not load course editor."));
    }
  }, [selectedCourseId]);

  const handleCreateCourse = async () => {
    await createCourse(courseForm);
    setMessage("Course created.");
    await loadCourses();
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourseId) return;
    await updateCourse(selectedCourseId, courseForm);
    setMessage("Course updated.");
    await loadSelectedCourse(selectedCourseId);
    await loadCourses();
  };

  const handleDeleteCourse = async (courseId: string) => {
    await deleteCourse(courseId);
    setMessage("Course deleted.");
    setSelectedCourseId("");
    setSelectedCourse(null);
    await loadCourses();
  };

  const handleAddTopic = async () => {
    if (!selectedCourseId || !topicTitle.trim()) return;
    await addTopicToCourse(selectedCourseId, { title: topicTitle });
    setTopicTitle("");
    setMessage("Topic added.");
    await loadSelectedCourse(selectedCourseId);
  };

  const handleAddSubtopic = async () => {
    if (!subtopicForm.topicId || !subtopicForm.title.trim()) return;
    await addSubtopicToTopic(subtopicForm.topicId, {
      title: subtopicForm.title,
      content: subtopicForm.content,
    });
    setSubtopicForm((current) => ({ ...current, title: "", content: "" }));
    setMessage("Subtopic added.");
    await loadSelectedCourse(selectedCourseId);
  };

  const handleUserUpdate = async (user: UserRecord) => {
    await updateUser(user.id, {
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    setMessage("User updated.");
    await loadUsers();
  };

  const handleUserDelete = async (userId: number) => {
    await deleteUser(userId);
    if (session.userId === userId) {
      clearSession();
    }
    setMessage("User deleted.");
    await loadUsers();
  };

  const handleTopicRename = async (topicId: string, title: string) => {
    await updateTopic(topicId, { title });
    setMessage("Topic updated.");
    await loadSelectedCourse(selectedCourseId);
  };

  const handleSubtopicUpdate = async (subtopicId: string, title: string, content: string) => {
    await updateSubtopic(subtopicId, { title, content });
    setMessage("Subtopic updated.");
    await loadSelectedCourse(selectedCourseId);
  };

  if (!session.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-8">
      <section className="workspace-card rounded-[36px] p-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Admin management</div>
        <h1 className="mt-4 text-5xl font-semibold text-[var(--workspace-text)]">Platform control center.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 workspace-muted">
          Frontend now exposes the missing backend features: user management, enrollment oversight, and editable topic and subtopic controls.
        </p>
        {message && <div className="mt-5 rounded-[18px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm workspace-muted">{message}</div>}
      </section>

      <section className="flex flex-wrap gap-3">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] ${
              tab === item
                ? "bg-[var(--workspace-primary)] text-white"
                : "workspace-card workspace-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      {tab === "content" && (
        <section className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="workspace-card rounded-[36px] p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Course editor</div>
              <div className="mt-5 space-y-4">
                <input
                  value={courseForm.title}
                  onChange={(event) => setCourseForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Course title"
                  className={inputClass}
                />
                <textarea
                  value={courseForm.description}
                  onChange={(event) => setCourseForm((current) => ({ ...current, description: event.target.value }))}
                  rows={6}
                  placeholder="Course description"
                  className={inputClass}
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={handleCreateCourse} className="rounded-full bg-[var(--workspace-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    Create course
                  </button>
                  <button type="button" onClick={handleUpdateCourse} className="rounded-full border border-[var(--workspace-line)] bg-white px-5 py-3 text-sm uppercase tracking-[0.22em] workspace-muted">
                    Update selected
                  </button>
                </div>
              </div>
            </div>

            <div className="workspace-card rounded-[36px] p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-cyan)]">Course selector</div>
              <select
                value={selectedCourseId}
                onChange={(event) => setSelectedCourseId(event.target.value)}
                className="mt-4 w-full rounded-[18px] border border-[var(--workspace-line)] bg-white px-4 py-3 text-sm text-[var(--workspace-text)]"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <div className="mt-4 grid gap-3">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between rounded-[20px] border border-[var(--workspace-line)] bg-white px-4 py-3">
                    <div className="text-sm text-[var(--workspace-text)]">{course.title}</div>
                    <button
                      type="button"
                      onClick={() => handleDeleteCourse(course.id)}
                      className="rounded-full border border-red-300/40 bg-red-50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="workspace-card rounded-[32px] p-7">
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-cyan)]">Add topic</div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={topicTitle}
                    onChange={(event) => setTopicTitle(event.target.value)}
                    placeholder="Topic title"
                    className={inputClass}
                  />
                  <button type="button" onClick={handleAddTopic} className="rounded-full bg-[var(--workspace-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    Add topic
                  </button>
                </div>
              </div>

              <div className="workspace-card rounded-[32px] p-7">
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-cyan)]">Add subtopic</div>
                <div className="mt-5 space-y-4">
                  <select
                    value={subtopicForm.topicId}
                    onChange={(event) => setSubtopicForm((current) => ({ ...current, topicId: event.target.value }))}
                    className={inputClass}
                  >
                    <option value="">Choose topic</option>
                    {(selectedCourse?.topics ?? []).map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.title}
                      </option>
                    ))}
                  </select>
                  <input
                    value={subtopicForm.title}
                    onChange={(event) => setSubtopicForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Subtopic title"
                    className={inputClass}
                  />
                  <textarea
                    value={subtopicForm.content}
                    onChange={(event) => setSubtopicForm((current) => ({ ...current, content: event.target.value }))}
                    rows={5}
                    placeholder="Subtopic content"
                    className={inputClass}
                  />
                  <button type="button" onClick={handleAddSubtopic} className="rounded-full bg-[var(--workspace-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    Add subtopic
                  </button>
                </div>
              </div>
            </div>

            <div className="workspace-card rounded-[32px] p-7">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Current structure</div>
              <div className="mt-5 space-y-4">
                {(selectedCourse?.topics ?? []).length === 0 ? (
                  <div className="rounded-[20px] border border-[var(--workspace-line)] bg-white p-4 text-sm workspace-muted">
                    Select a course to inspect and edit its structure.
                  </div>
                ) : (
                  selectedCourse?.topics.map((topic) => (
                    <div key={topic.id} className="rounded-[22px] border border-[var(--workspace-line)] bg-white p-4">
                      <div className="flex items-center gap-3">
                        <input
                          defaultValue={topic.title}
                          onBlur={(event) => handleTopicRename(topic.id, event.target.value)}
                          className="flex-1 rounded-[14px] border border-[var(--workspace-line)] px-3 py-2 text-sm text-[var(--workspace-text)]"
                        />
                        <button
                          type="button"
                          onClick={() => deleteTopic(topic.id).then(() => loadSelectedCourse(selectedCourseId))}
                          className="rounded-full border border-red-300/40 bg-red-50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="mt-4 space-y-3">
                        {topic.subtopics.map((subtopic) => (
                          <div key={subtopic.id} className="rounded-[18px] border border-[var(--workspace-line)] bg-[#f8faff] p-3">
                            <input
                              defaultValue={subtopic.title}
                              onBlur={(event) => handleSubtopicUpdate(subtopic.id, event.target.value, subtopic.content)}
                              className="w-full rounded-[12px] border border-[var(--workspace-line)] px-3 py-2 text-sm text-[var(--workspace-text)]"
                            />
                            <textarea
                              defaultValue={subtopic.content}
                              onBlur={(event) => handleSubtopicUpdate(subtopic.id, subtopic.title, event.target.value)}
                              rows={3}
                              className="mt-3 w-full rounded-[12px] border border-[var(--workspace-line)] px-3 py-2 text-sm text-[var(--workspace-text)]"
                            />
                            <button
                              type="button"
                              onClick={() => deleteSubtopic(subtopic.id).then(() => loadSelectedCourse(selectedCourseId))}
                              className="mt-3 rounded-full border border-red-300/40 bg-red-50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-500"
                            >
                              Delete subtopic
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === "users" && (
        <section className="workspace-card rounded-[34px] p-7">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">User management</div>
          <div className="mt-5 space-y-4">
            {users.map((user) => (
              <div key={user.id} className="grid gap-3 rounded-[22px] border border-[var(--workspace-line)] bg-white p-4 lg:grid-cols-[1fr_0.8fr_auto_auto]">
                <input
                  value={user.email}
                  onChange={(event) =>
                    setUsers((current) =>
                      current.map((entry) => (entry.id === user.id ? { ...entry, email: event.target.value } : entry))
                    )
                  }
                  className="rounded-[14px] border border-[var(--workspace-line)] px-3 py-2 text-sm text-[var(--workspace-text)]"
                />
                <input
                  value={user.phoneNumber ?? ""}
                  onChange={(event) =>
                    setUsers((current) =>
                      current.map((entry) => (entry.id === user.id ? { ...entry, phoneNumber: event.target.value } : entry))
                    )
                  }
                  className="rounded-[14px] border border-[var(--workspace-line)] px-3 py-2 text-sm text-[var(--workspace-text)]"
                />
                <div className="flex items-center rounded-[14px] border border-[var(--workspace-line)] px-3 py-2 text-sm workspace-muted">
                  {user.role.replace("ROLE_", "")}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleUserUpdate(user)} className="rounded-full bg-[var(--workspace-primary)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white">
                    Save
                  </button>
                  <button type="button" onClick={() => handleUserDelete(user.id)} className="rounded-full border border-red-300/40 bg-red-50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-red-500">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "enrollments" && (
        <section className="workspace-card rounded-[34px] p-7">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--workspace-primary)]">Enrollment oversight</div>
          <div className="mt-5 grid gap-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment.enrollmentId} className="flex flex-col gap-2 rounded-[22px] border border-[var(--workspace-line)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-lg text-[var(--workspace-text)]">{enrollment.courseTitle}</div>
                  <div className="text-sm workspace-muted">
                    Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="workspace-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">
                  {enrollment.courseId}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
