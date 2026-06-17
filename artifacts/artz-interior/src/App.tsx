import { Router, Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
// Lazy load heavy pages for performance
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const CalculatorIndexPage = lazy(() => import("@/pages/CalculatorIndexPage"));
const LivspaceCalculatorPage = lazy(() => import("@/pages/LivspaceCalculatorPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));


import FloatingChatbot from "@/components/FloatingChatbot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { initGA, trackPageView } from "@/lib/analytics";

const queryClient = new QueryClient();

/** Vite base path without trailing slash (empty string when deployed at domain root). */
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function AppRoutes() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location);
    // Scroll to top of the page when navigating to a new route
    window.scrollTo(0, 0);
  }, [location]);



  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><span className="text-gray-500">Loading...</span></div>}>
        <Switch>
          <Route path="/livspace-calculator" component={LivspaceCalculatorPage} />
          <Route path="/livspace-calculator/:type" component={LivspaceCalculatorPage} />
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/portfolio" component={PortfolioPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/calculator" component={CalculatorIndexPage} />
          <Route path="/calculator/:type" component={LivspaceCalculatorPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize Google Analytics on mount
    initGA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router base={routerBase}>
        <AppRoutes />
      </Router>
      <FloatingChatbot />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
