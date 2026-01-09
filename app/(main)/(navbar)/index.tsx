"use client";

import { useState, useCallback, memo } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FiBell } from "react-icons/fi";
import Options from "./option/option";
import NotificationContent from "./(notification)";
import InterestOnboardingModal from "./(interest)";

const Navbar = () => {
  const [open, setOpen] = useState<
    "choose-interest" | "notification" | "option" | null
  >(null);

  const toggle = useCallback(
    (type: "choose-interest" | "notification" | "option") => {
      setOpen((prev) => (prev === type ? null : type));
    },
    []
  );

  return (
    <div className="fixed top-4 right-4 z-101">
      <div
        className="
          flex items-center gap-2
          p-1
          rounded-2xl
          bg-black/70
          backdrop-blur-md
          border border-white/10
        ">
        <button
          onClick={() => toggle("choose-interest")}
          aria-label="choose-interest"
          className={`
            px-4 gap-2
            w-auto h-10
            flex items-center justify-center
            rounded-xl
            transition-all duration-200
            ${
              open === "choose-interest"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-gray-200 hover:bg-white/10"
            }
          `}>
          <span className="text-emerald-400">★</span>
          Interest
        </button>
        <button
          title="Notifications"
          onClick={() => toggle("notification")}
          aria-label="Notifications"
          className={`
            w-10 h-10
            flex items-center justify-center
            rounded-xl
            transition-all duration-200
            ${
              open === "notification"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-gray-200 hover:bg-white/10"
            }
          `}>
          <FiBell className="text-lg" />
        </button>

        {/* OPTIONS BUTTON */}
        <button
          onClick={() => toggle("option")}
          aria-label="Options"
          title="Options"
          className={`
            w-10 h-10
            flex items-center justify-center
            rounded-xl
            transition-all duration-200
            ${
              open === "option"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-gray-200 hover:bg-white/10"
            }
          `}>
          <SlOptionsVertical className="text-lg" />
        </button>
      </div>

      {open === "option" && <Options setState={() => setOpen(null)} />}
      {open === "notification" && <NotificationContent setState={setOpen} />}
      {open === "choose-interest" && (
        <InterestOnboardingModal setState={setOpen} />
      )}
    </div>
  );
};

export default memo(Navbar);
