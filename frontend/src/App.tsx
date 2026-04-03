import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Suspense fallback={<AppLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;

/**
 * Global fallback loader
 * Used when lazy loaded pages are loading
 */
function AppLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505]">
      <div className="glass-panel rounded-[28px] px-8 py-6 text-sm uppercase tracking-[0.3em] text-[var(--accent-soft)]">
        Loading learning workspace
      </div>
    </div>
  );
}
