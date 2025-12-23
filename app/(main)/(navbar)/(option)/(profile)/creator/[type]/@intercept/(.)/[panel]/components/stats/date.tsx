"use client";

import { memo } from "react";

const Date = () => {
  // Array tanggal 1-31 dengan nilai productCount dummy
  const dates = Array.from({ length: 31 }, (_, i) => ({
    date: i + 1,
    productCount: 14, // dummy product count
  }));

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {dates.map((d) => (
        <div
          key={d.date}
          className="
            flex flex-col items-center justify-center
            w-[5.5%] h-12
            rounded-lg
            bg-black/30
            border border-white/10
            cursor-pointer
            transition
            hover:bg-black/40
          ">
          <span className="text-sm font-semibold text-gray-200">{d.date}</span>
          <span className="text-xs text-gray-400">{d.productCount}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(Date);
