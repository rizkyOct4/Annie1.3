"use client";

import { Search } from "lucide-react";
import { memo } from "react";

const SearchFolder = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="w-full max-w-xs">
      <div
        className="
          relative flex items-center
          rounded-xl
          bg-white/5
          border border-white/10
          backdrop-blur-sm
          transition
          focus-within:border-emerald-500/60
        ">
        <Search
          size={16}
          className="
            absolute left-3
            text-gray-400
            pointer-events-none
          "
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            w-full
            pl-9 pr-3 py-2.5
            bg-transparent
            text-sm text-gray-200
            placeholder-gray-500
            focus:outline-none
          "
        />
      </div>
    </div>
  );
};

export default memo(SearchFolder);
