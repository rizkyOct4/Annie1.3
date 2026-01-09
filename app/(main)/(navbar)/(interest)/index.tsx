"use client";

import { useContext, useState, useCallback } from "react";
import { profileContext } from "@/app/context";
import { LocalISOTime } from "@/_util/GenerateData";
import { handleUnauthorized } from "@/_util/Unauthorized";
import { useRouter } from "next/navigation";

const interests = [
  "Photography",
  "Videography",
  "Music",
  "Podcast",
  "Digital Art",
  "Design",
  "Animation",
  "Writing",
  "Gaming",
];

const InterestOnboardingModal = ({ setState }: { setState: any }) => {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { postInterest } = useContext(profileContext);

  const toggle = (v: string) => {
    setSelected((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  };

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        const payload = {
          interest: selected,
          updatedAt: LocalISOTime(),
        };
        console.log(payload);
        setIsLoading(true);
        await postInterest(payload);
        setIsLoading(false);
      } catch (err: any) {
        if (err.status === 401) {
          if (handleUnauthorized(err, router)) return;
          console.error(err);
        }
      }
    },
    [selected, router, postInterest]
  );

  return (
    <div className="overlay backdrop-blur-sm flex-center">
      <div className="relative w-full max-w-lg mx-4 bg-black border border-white/10 rounded-xl p-6 flex flex-col gap-6">
        {/* HEADER */}
        <button
          onClick={() => setState(false)}
          className="
                    absolute right-3 top-3
                    p-2 rounded-lg
                    text-gray-400
                    hover:text-gray-200
                    hover:bg-white/10
                    transition
                  ">
          ✕
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-100">
            Personalize your feed
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Choose your interests to get better recommendations.
          </p>
        </div>

        <hr className="border-white/10" />

        <form onSubmit={(e) => handleSubmit(e)}>
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
          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              disabled={selected.length < 3 && isLoading}
              className={`px-5 py-2 rounded-md text-sm font-medium transition
              ${
                selected.length < 3
                  ? "bg-white/10 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-black"
              }`}>
              Continue
            </button>
          </div>
        </form>

        {selected.length < 3 && (
          <p className="text-xs text-gray-500">Select at least 3 interests</p>
        )}
      </div>
    </div>
  );
};

export default InterestOnboardingModal;
