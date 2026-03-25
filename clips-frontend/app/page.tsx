import ProgressCard from "@/components/ProgressCard";
import Image from "next/image";
import MetricsCards from "./MetricsCards";
import ProcessDashboard from "./components/ProcessDashboard";
import ConnectAccountsSection from "./components/ConnectAccountsSection";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Responsive container with proper breakpoints */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Hero Section with responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          
          {/* Hero Content - Left side on desktop, stacks on top for mobile/tablet */}
          <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
              Transform Your Content with AI-Powered Clips
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Create viral-ready clips from your long-form content in seconds. 
              Our AI analyzes, edits, and optimizes your videos for maximum engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                href="/create"
              >
                Get Started
              </a>
              <a
                className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                href="/learn-more"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Auth Card / Process Dashboard - Right side on desktop, stacks below on mobile/tablet */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
              <ProcessDashboard />
            </div>
          </div>
        </div>

        {/* Progress Card Section */}
        <div className="mb-12">
          <ProgressCard
            percentage={87}
            estimatedTimeRemaining="1 minute 15 seconds"
          />
        </div>

        {/* Connect Accounts Section */}
        <div className="mb-12">
          <ConnectAccountsSection />
        </div>

        {/* Metrics Cards at the bottom */}
        <MetricsCards />
      </main>
    </div>
  );
}
