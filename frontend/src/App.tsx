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
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg text-slate-400">
        Loading application...
      </div>
    </div>
  );
}