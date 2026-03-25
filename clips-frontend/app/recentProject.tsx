"use client";

const PROJECTS = [
  {
    id: 1,
    title: "How I Made $10K in 30 Days",
    platform: "YouTube",
    platformColor: "#FF0000",
    clips: 124,
    selected: 18,
    duration: "1h 42m",
    thumbnail: null,
    status: "processing",
    date: "Today",
  },
  {
    id: 2,
    title: "My Morning Routine 2026",
    platform: "TikTok",
    platformColor: "#010101",
    clips: 64,
    selected: 12,
    duration: "18m",
    thumbnail: null,
    status: "ready",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Full React Course for Beginners",
    platform: "YouTube",
    platformColor: "#FF0000",
    clips: 200,
    selected: 34,
    duration: "6h 10m",
    thumbnail: null,
    status: "published",
    date: "3 days ago",
  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  processing: { bg: "rgba(34,197,94,0.1)", color: "#22C55E", label: "Processing" },
  ready: { bg: "rgba(56,189,248,0.1)", color: "#38BDF8", label: "Ready to Post" },
  published: { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", label: "Published" },
};

export default function RecentProjects() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
          Recent Projects
        </h2>
        <button className="text-xs text-white/35 hover:text-white/60 transition-colors duration-150 font-medium">
          View all →
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {PROJECTS.map((p, i) => {
          const statusStyle = STATUS_STYLES[p.status];
          return (
            <div
              key={p.id}
              className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-150 group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              {/* Thumbnail placeholder */}
              <div
                className="w-16 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white/80 truncate group-hover:text-white transition-colors duration-150">
                  {p.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: p.platformColor + "22", color: p.platformColor === "#010101" ? "#fff" : p.platformColor }}
                  >
                    {p.platform}
                  </span>
                  <span className="text-xs text-white/25">{p.duration}</span>
                  <span className="text-xs text-white/25">•</span>
                  <span className="text-xs text-white/25">{p.clips} clips</span>
                </div>
              </div>

              {/* Status + date */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: statusStyle.bg, color: statusStyle.color }}
                >
                  {statusStyle.label}
                </span>
                <span className="text-[10px] text-white/25">{p.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}