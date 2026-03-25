"use client";

import { useState } from "react";

const STEPS = [
  { id: 1, label: "Upload / Link", status: "done", desc: "YouTube link fetched" },
  { id: 2, label: "AI Analysis", status: "done", desc: "Viral moments detected" },
  { id: 3, label: "Clip Generation", status: "active", desc: "87 of 124 clips created" },
  { id: 4, label: "Preview & Select", status: "pending", desc: "Choose your best clips" },
  { id: 5, label: "Auto-Publish", status: "pending", desc: "Post to 7 platforms" },
];

const CONNECTED_PLATFORMS = [
  { name: "TikTok", color: "#010101", icon: "TT" },
  { name: "YouTube", color: "#FF0000", icon: "YT" },
  { name: "Instagram", color: "#E1306C", icon: "IG" },
];

export default function ProcessDashboard() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div
      className="w-full max-w-xl rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
            Processing Pipeline
          </h2>
          <p className="text-xs text-white/35 mt-0.5">Current job • Started 3 mins ago</p>
        </div>
        <span
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
          style={{ background: "rgba(34,197,94,0.10)", color: "#22C55E" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          Live
        </span>
      </div>

      {/* Steps */}
      <ol className="relative flex flex-col gap-0">
        {STEPS.map((step, idx) => {
          const isHovered = hoveredStep === step.id;
          return (
            <li
              key={step.id}
              className="flex items-start gap-4 cursor-default group"
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 text-xs font-bold"
                  style={
                    step.status === "done"
                      ? { background: "#22C55E", color: "#fff" }
                      : step.status === "active"
                      ? {
                          background: "rgba(34,197,94,0.15)",
                          border: "2px solid #22C55E",
                          color: "#22C55E",
                          boxShadow: isHovered ? "0 0 12px rgba(34,197,94,0.35)" : "none",
                        }
                      : { background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.2)" }
                  }
                >
                  {step.status === "done" ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className="w-[2px] h-8"
                    style={{
                      background:
                        step.status === "done"
                          ? "rgba(34,197,94,0.4)"
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-4 flex-1 min-w-0">
                <p
                  className="text-sm font-semibold leading-7 transition-colors duration-150"
                  style={{
                    color:
                      step.status === "done"
                        ? "rgba(255,255,255,0.8)"
                        : step.status === "active"
                        ? "#fff"
                        : "rgba(255,255,255,0.3)",
                  }}
                >
                  {step.label}
                </p>
                <p className="text-xs text-white/30 -mt-0.5">{step.desc}</p>
                {step.status === "active" && (
                  <div
                    className="mt-2 h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "70%",
                        background: "linear-gradient(90deg,#22C55E,#86EFAC)",
                        animation: "pulse 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Connected platforms */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
        <span className="text-xs text-white/25 mr-1">Publishing to:</span>
        {CONNECTED_PLATFORMS.map((p) => (
          <span
            key={p.name}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
            title={p.name}
            style={{ background: p.color, border: "2px solid rgba(255,255,255,0.1)" }}
          >
            {p.icon}
          </span>
        ))}
        <span className="text-xs text-white/20 ml-1">+4 more</span>
      </div>
    </div>
  );
}