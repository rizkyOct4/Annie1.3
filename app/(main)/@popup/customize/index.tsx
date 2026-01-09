"use client";

import { profileContext } from "@/app/context";
import { useContext, useState } from "react";

const CustomizePopup = () => {
  const { interest, setInterest } = useContext(profileContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {interest && (
        <>
          <div className="fixed right-6 top-24 z-2000 flex-center">
            <div
              className="
    flex items-center gap-2
    rounded-xl  bg-black/70 border border-white/10 p-1">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="
      group
      flex items-center gap-2
      rounded-lg
      px-3 py-1.5
      text-sm text-gray-200
      hover:bg-white/10
      transition-colors
    ">
                <span className="text-emerald-400">★</span>
                Customize your profile
              </button>

              <span className="h-5 w-px bg-white/10" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomizePopup;
