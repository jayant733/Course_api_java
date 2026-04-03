import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchCourses } from "../services/courseService";

interface SearchMatch {
  subtopicId: string;
  topicTitle: string;
  subtopicTitle: string;
  snippet: string;
}

interface SearchResult {
  courseId: string;
  courseTitle: string;
  matches: SearchMatch[];
}

const Search: React.FC = () => {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        const response = await searchCourses(query);
        setResults(response.data?.results ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[34px] p-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)]">Search results</div>
        <h1 className="display-font mt-4 text-6xl leading-none tracking-[-0.04em]">Query: {query || "No search term"}</h1>
      </section>

      {loading ? (
        <div className="glass-panel rounded-[28px] px-6 py-10 text-sm uppercase tracking-[0.28em] text-[var(--accent-soft)]">Searching across courses</div>
      ) : results.length === 0 ? (
        <div className="glass-panel rounded-[28px] p-8 text-sm text-[var(--muted)]">
          No grouped course matches found for this query.
        </div>
      ) : (
        <section className="space-y-5">
          {results.map((course) => (
            <article key={course.courseId} className="glass-panel rounded-[30px] p-6">
              <Link to={`/courses/${course.courseId}`} className="display-font text-4xl leading-none text-white">
                {course.courseTitle}
              </Link>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {course.matches.map((match) => (
                  <div key={match.subtopicId} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-xs uppercase tracking-[0.28em] text-[var(--teal)]">{match.topicTitle}</div>
                    <h3 className="mt-3 text-lg">{match.subtopicTitle}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{match.snippet}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default Search;
