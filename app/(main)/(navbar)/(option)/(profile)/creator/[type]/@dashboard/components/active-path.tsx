"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";

const ActivePath = ({ currentPath }: { currentPath: string }) => {
  const router = useRouter();
  const typeBtn = ["photo", "video"];

  return (
    <div
      className="
        flex items-center gap-6
        px-4 py-2
        rounded-xl
        bg-white/5
        border border-white/10
      ">
      {typeBtn.map((name, idx) => {
        const isActive = currentPath === name;

        return (
          <button
            key={idx}
            onClick={() => router.push(`/creator/${name}`)}
            className={`
              relative
              px-3 py-1.5
              text-sm font-semibold capitalize
              transition-all duration-300
              ${
                isActive ? "text-gray-200" : "text-gray-400 hover:text-gray-200"
              }
            `}>
            {name}

            {/* underline */}
            <span
              className={`
                absolute left-0 -bottom-1
                h-0.5 w-full
                rounded-full
                bg-emerald-500
                transition-transform duration-300
                origin-left
                ${isActive ? "scale-x-100" : "scale-x-0"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default memo(ActivePath);
