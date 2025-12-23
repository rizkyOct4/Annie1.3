"use client";

import { memo } from "react";

// Dummy milestone data
const milestones = [
  {
    id: 1,
    title: "Reach 1000 followers",
    status: "complete",
    date: "2025-10-15",
    progress: 100,
  },
  {
    id: 2,
    title: "Post 50 videos",
    status: "in-progress",
    date: "2025-11-20",
    progress: 60,
  },
  {
    id: 3,
    title: "Engagement rate > 5%",
    status: "in-progress",
    date: "2025-12-05",
    progress: 40,
  },
  {
    id: 4,
    title: "Upload 200 photos",
    status: "complete",
    date: "2025-11-10",
    progress: 100,
  },
];

const Milestones = () => {
  return (
    <div
      className="
        flex flex-col gap-4
        p-6 rounded-xl
        bg-white/5
        border border-white/10
        backdrop-blur-sm
      "
    >
      {milestones.map((m) => (
        <div
          key={m.id}
          className="
            flex flex-col gap-2
            p-4 rounded-lg
            bg-black/30
            border border-white/10
            transition
            hover:bg-black/40
          "
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-200">
              {m.title}
            </span>
            <span
              className={`text-xs font-semibold uppercase tracking-wide ${
                m.status === "complete"
                  ? "text-emerald-500"
                  : "text-amber-400"
              }`}
            >
              {m.status}
            </span>
          </div>

          <div className="text-xs text-gray-400">{m.date}</div>

          <div className="w-full bg-white/10 h-2 rounded mt-1 overflow-hidden">
            <div
              className="
                h-2 rounded
                bg-blue-500/80
                transition-all duration-300
              "
              style={{ width: `${m.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Milestones);
