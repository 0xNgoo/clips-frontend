"use client";

import { useEffect, useState } from "react";

interface ProgressCardProps {
  percentage: number;
  estimatedTimeRemaining: string;
}

export default function ProgressCard({ percentage, estimatedTimeRemaining }: ProgressCardProps) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const step = percentage / 60;
      const interval = setInterval(() => {
        current += step;
        if (current >= percentage) {
          setDisplayed(percentage);
          clearInterval(interval);
        } else {
          setDisplayed(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, [percentage]);

  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (displayed / 100) * circumference;

  return (
    <div
      className="relative flex items-center gap-5 p-5 rounded-2xl mb-8 overflow-hidden"
      style={{
        background: "rgba(34,197,94,0.06)",
        border: "1px solid rgba(34,197,94,0.15)",
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Circular progress */}
      <div className="relative flex-shrink-0 w-[88px] h-[88px]">
        <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
          <circle cx="44" cy="44" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="44"
            cy="44"
            r="40"
            fill="none"
            stroke="url(#greenGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
            {displayed}%
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-white">AI Processing Clips</p>
        <p className="text-xs text-white/40">
          <span className="text-[#22C55E] font-medium">Est. remaining: </span>
          {estimatedTimeRemaining}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            Processing
          </span>
        </div>
      </div>
    </div>
  );
}