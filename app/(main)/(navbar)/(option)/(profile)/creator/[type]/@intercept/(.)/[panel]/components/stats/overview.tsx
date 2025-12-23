"use client";

import { memo } from "react";

const Overview = () => {
  const data = {
    totalContent: 42,
    totalViews: 12890,
    totalLikes: 2400,
    totalComments: 312,
    growth: "+12.5%",
  };

  return (
    <div
      className="
        p-6 rounded-xl
        bg-white/5
        border border-white/10
        backdrop-blur-sm
      ">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-200 tracking-wide">
          Overview
        </h2>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Content</span>
          <span className="text-lg font-semibold text-gray-200">
            {data.totalContent}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Views</span>
          <span className="text-lg font-semibold text-gray-200">
            {data.totalViews.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Likes</span>
          <span className="text-lg font-semibold text-gray-200">
            {data.totalLikes.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Comments</span>
          <span className="text-lg font-semibold text-gray-200">
            {data.totalComments.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-sm text-gray-400">Growth</span>
          <span className="text-lg font-semibold text-emerald-500">
            {data.growth}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Overview);
