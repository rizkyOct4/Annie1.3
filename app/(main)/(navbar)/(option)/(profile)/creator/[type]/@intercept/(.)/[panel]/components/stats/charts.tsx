"use client";

import { memo } from "react";

// Dummy data: views per hari selama seminggu
const chartData = [
  { day: "Mon", views: 1200 },
  { day: "Tue", views: 1500 },
  { day: "Wed", views: 1000 },
  { day: "Thu", views: 1800 },
  { day: "Fri", views: 900 },
  { day: "Sat", views: 2000 },
  { day: "Sun", views: 1700 },
];

const Charts = () => {
  // Hitung max untuk skala
  const maxViews = Math.max(...chartData.map((d) => d.views));

  return (
    <div
      className="
        p-6 rounded-xl
        bg-white/5
        border border-white/10
        backdrop-blur-sm
      "
    >
      <h2 className="font-semibold text-lg text-gray-200 mb-5 tracking-wide">
        Weekly Views
      </h2>

      <div className="flex items-end justify-between h-36 gap-3">
        {chartData.map((data) => {
          const heightPercent = (data.views / maxViews) * 100;
          return (
            <div
              key={data.day}
              className="flex flex-col items-center justify-end flex-1"
            >
              {/* Bar */}
              <div
                className="
                  w-3
                  rounded-t-md
                  bg-emerald-500/80
                  transition-all duration-300
                  hover:bg-emerald-500
                "
                style={{ height: `${heightPercent}%` }}
              />

              {/* Label */}
              <span className="text-xs text-gray-400 mt-2">
                {data.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Charts);
