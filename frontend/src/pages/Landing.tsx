import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Navigate to courses
   */
  const handleExplore = useCallback(() => {
    navigate("/all-courses");
  }, [navigate]);

  return (
    <PageWrapper>
      <section className="text-center mt-24 space-y-10">

        {/* Hero */}
        <div className="space-y-6">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn Smarter with
            <span className="text-indigo-400"> Modern Courses</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A premium learning experience built with cutting-edge technology.
            Master modern skills, track your progress, and grow your career.
          </p>

          {/* CTA */}
          <div className="flex justify-center gap-4 pt-4">

            <Button onClick={handleExplore}>
              Explore Courses
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>

          </div>

        </div>

        {/* Feature Section */}
        <div className="grid md:grid-cols-3 gap-8 pt-20">

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">
              Structured Learning
            </h3>
            <p className="text-gray-400 text-sm">
              Follow well-organized course paths designed by experts.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">
              Track Progress
            </h3>
            <p className="text-gray-400 text-sm">
              Monitor lesson completion and maintain learning streaks.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">
              Modern Tech Stack
            </h3>
            <p className="text-gray-400 text-sm">
              Courses built with real-world tools used in the industry.
            </p>
          </div>

        </div>

      </section>
    </PageWrapper>
  );
};

export default React.memo(Landing);