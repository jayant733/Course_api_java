import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchCourses } from "../services/courseService";

interface Match {
  type: string;
  topicTitle: string;
  subtopicId: string;
  subtopicTitle: string;
  snippet: string;
}

interface SearchResult {
  courseId: string;
  courseTitle: string;
  matches: Match[];
}

const Search: React.FC = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResults = async () => {

      if (!query) {
        setResults([]);
        return;
      }

      try {

        const res = await searchCourses(query);

        // 🔥 IMPORTANT FIX
        setResults(res.data?.results || []);

      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }

    };

    fetchResults();

  }, [query]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Searching...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-semibold">
        Search Results for "{query}"
      </h1>

      {results.length === 0 ? (

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-gray-400">
          No courses found.
        </div>

      ) : (

        <div className="space-y-6">

          {results.map((course) => (

            <div
              key={course.courseId}
              className="bg-white/5 border border-white/10 p-6 rounded-xl"
            >

              <Link
                to={`/courses/${course.courseId}`}
                className="text-lg font-semibold text-indigo-400"
              >
                {course.courseTitle}
              </Link>

              <div className="mt-4 space-y-3">

                {course.matches.map((match) => (

                  <div
                    key={match.subtopicId}
                    className="bg-black/30 p-3 rounded-lg"
                  >

                    <div className="text-sm text-gray-300">
                      <b>{match.topicTitle}</b> → {match.subtopicTitle}
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      {match.snippet}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Search;