import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/landingView/Navbar";
import HeroSection from "../components/landingView/HeroSection";

const MetricsSection = lazy(() => import("../components/landingView/MetricsSection"));
const FeaturesSection = lazy(() => import("../components/landingView/FeaturesSection"));
const HowItWorksSection = lazy(() => import("../components/landingView/HowItWorksSection"));
const AISection = lazy(() => import("../components/landingView/AISection"));
const RealtimeSection = lazy(() => import("../components/landingView/RealtimeSection"));
const TestimonialsSection = lazy(() => import("../components/landingView/TestimonialsSection"));
const CTASection = lazy(() => import("../components/landingView/CTASection"));
const FooterSection = lazy(() => import("../components/landingView/FooterSection"));

const LandingView = () => {
  const { data: user } = useAuth();
  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen bg-[#151921] text-slate-200 scroll-smooth">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-indigo-600 focus:text-white focus:text-sm focus:font-semibold"
      >
        Saltar al contenido
      </a>

      <Navbar />
      <main id="main">
        <HeroSection />
        <Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
          <MetricsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <AISection />
          <RealtimeSection />
          <TestimonialsSection />
          <CTASection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>
    </div>
  );
};

export default LandingView;