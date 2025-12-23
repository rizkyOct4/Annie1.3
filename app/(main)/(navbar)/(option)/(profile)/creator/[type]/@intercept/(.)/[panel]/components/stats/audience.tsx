"use client";

import React, { memo } from "react";

// Dummy audience data
const audienceData = {
  totalUsers: 1250,
  newUsersToday: 34,
  gender: {
    male: 650,
    female: 600,
  },
  ageGroups: [
    { range: "18-24", count: 400 },
    { range: "25-34", count: 500 },
    { range: "35-44", count: 250 },
    { range: "45+", count: 100 },
  ],
  topLocations: [
    { country: "USA", count: 450 },
    { country: "UK", count: 200 },
    { country: "Germany", count: 150 },
    { country: "Indonesia", count: 100 },
  ],
};

const Audience = () => {
  return (
    <div
      className="
        flex flex-col gap-5
        p-6 rounded-xl
        bg-white/5
        border border-white/10
        backdrop-blur-sm
      "
    >
      {/* Summary */}
      <div
        className="
          flex justify-between items-center
          p-4 rounded-lg
          bg-black/30
          border border-white/10
        "
      >
        <div>
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="text-2xl font-semibold text-gray-200">
            {audienceData.totalUsers}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">New Today</p>
          <p className="text-lg font-semibold text-emerald-500">
            +{audienceData.newUsersToday}
          </p>
        </div>
      </div>

      {/* Gender */}
      <div className="flex gap-3">
        {Object.entries(audienceData.gender).map(([gender, count]) => (
          <div
            key={gender}
            className="
              flex-1 p-3 rounded-lg
              bg-black/30
              border border-white/10
              flex flex-col items-center
            "
          >
            <p className="text-sm capitalize text-gray-400">{gender}</p>
            <p className="text-lg font-semibold text-gray-200">{count}</p>
          </div>
        ))}
      </div>

      {/* Age Groups */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-300">Age Groups</p>
        <div className="flex gap-3">
          {audienceData.ageGroups.map((group) => (
            <div
              key={group.range}
              className="
                flex-1 p-3 rounded-lg
                bg-black/30
                border border-white/10
                flex flex-col items-center
              "
            >
              <p className="text-xs text-gray-400">{group.range}</p>
              <p className="text-lg font-semibold text-gray-200">
                {group.count}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Locations */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-300">Top Locations</p>
        <div className="flex flex-col gap-2">
          {audienceData.topLocations.map((loc) => (
            <div
              key={loc.country}
              className="
                flex justify-between items-center
                p-3 rounded-lg
                bg-black/30
                border border-white/10
              "
            >
              <span className="text-sm text-gray-300">{loc.country}</span>
              <span className="font-semibold text-gray-200">
                {loc.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Audience);
