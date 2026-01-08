"use client";

import { useState } from "react";

const interests = [
  "Photography",
  "Cinematic",
  "Music Production",
  "Lo-fi",
  "Travel",
  "Gaming",
  "Nature",
  "Portrait",
  "Street",
  "Vlog",
  "Podcast",
];

// type Props = {
//   onClose: () => void;
//   onSubmit?: (values: string[]) => void;
// };

const InterestOnboardingModal = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (v: string) => {
    setSelected((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center">
      {/* BACKDROP CLICK */}
      <button
        aria-label="close"
        // onClick={onClose}
        className="absolute inset-0"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-lg mx-4 bg-black border border-white/10 rounded-xl p-6 flex flex-col gap-6">
        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-gray-100">
            Personalize your feed
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Choose your interests to get better recommendations.
          </p>
        </div>

        <hr className="border-white/10" />

        {/* INTERESTS */}
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => {
            const active = selected.includes(i);

            return (
              <button
                key={i}
                type="button"
                onClick={() => toggle(i)}
                className={`px-4 py-2 rounded-full text-sm border transition
                  ${
                    active
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "border-white/10 text-gray-300 hover:bg-white/10"
                  }`}>
                {i}
              </button>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            // onClick={onClose}
            className="text-sm text-gray-400 hover:text-gray-200 transition">
            Skip
          </button>

          <button
            type="button"
            disabled={selected.length < 3}
            // onClick={() => onSubmit?.(selected)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition
              ${
                selected.length < 3
                  ? "bg-white/10 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-black"
              }`}>
            Continue
          </button>
        </div>

        {selected.length < 3 && (
          <p className="text-xs text-gray-500">Select at least 3 interests</p>
        )}
      </div>
    </div>
  );
};

export default InterestOnboardingModal;
