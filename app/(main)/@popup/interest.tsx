"use client";

import { profileContext } from "@/app/context";
import { useContext, useState } from "react";
import InterestOnboardingModal from "../(navbar)/(interest)/content";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const InterestPopup = () => {
  const { data: getData } = useContext(profileContext);
  const interest = getData?.interest;
  console.log(interest)

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
                Choose Interest
              </button>

              {/* DIVIDER */}
              <span className="h-5 w-px bg-white/10" />

              {/* CLOSE */}
              <button
                type="button"
                className="
      p-2
      rounded-lg
      text-gray-400
      hover:text-gray-200
      hover:bg-white/10
      transition-colors
    "
                aria-label="Close interest popup">
                ✕
              </button>
              <button
                type="button"
                className="
      p-2
      rounded-lg
      text-gray-400
      hover:text-gray-200
      hover:bg-white/10
      transition-colors
    "
                aria-label="Close interest popup">
                <BiRightArrow />
              </button>
            </div>
          </div>

          {/* MODAL OVERLAY */}
          {/* {isOpen && <InterestOnboardingModal setIsOpen={setIsOpen} />} */}
        </>
      )}
    </>
  );
};

export default InterestPopup;
