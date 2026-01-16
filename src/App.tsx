import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Home from "./pages/Home";
import { StagingBanner } from "./components/StagingBanner";

// Lazy load secondary pages (not on critical path)
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Privacy = lazy(() => import("./pages/Privacy"));

const queryClient = new QueryClient();

const AppContent = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple scroll methods to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <>
      <StagingBanner />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
