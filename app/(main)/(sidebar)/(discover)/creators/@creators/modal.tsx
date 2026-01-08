"use client";

import Image from "next/image";
import { useContext, useEffect, useRef, useState, memo } from "react";
import { useRouter } from "next/navigation";
import { creatorsContext } from "@/app/context";
import { useInView } from "react-intersection-observer";

type Category = "photo" | "video" | "music";

export default function CreatorsPage({ currentPath }: { currentPath: string }) {
  const [category, setCategory] = useState<Category>("photo");
  const router = useRouter();
  const { listCreatorsData, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useContext(creatorsContext);

  // ? 🔹 ref untuk container scrollable
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ? 🔹 karena root belum ada saat render pertama, set setelah mount
  const [root, setRoot] = useState<Element | null>(null);

  // ? setup observer
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0.2, // ! trigger ketika 20% elemen terlihat
    root,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    setRoot(containerRef.current);
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <section className="w-full flex gap-10">
      {/* ================= LEFT : CREATOR FEED ================= */}
      <div className="flex-1 flex flex-col">
        {/* ===== TITLE ===== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Discover Expert Creators
          </h1>
          <p className="text-gray-400 mt-1">
            Find photographers, filmmakers, and musicians shaping the community.
          </p>
        </div>

        {/* ===== CATEGORY FILTER ===== */}
        <div className="flex gap-3 mb-6">
          {(["photo", "video", "music"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-md border text-sm transition
                ${
                  category === c
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                    : "bg-white/5 border-white/10 hover:bg-white/15"
                }`}>
              {c === "photo" && "📸 Photo"}
              {c === "video" && "🎬 Video"}
              {c === "music" && "🎧 Music"}
            </button>
          ))}
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        {/* ===== CREATOR LIST (FLEX WRAP) ===== */}
        <div className="flex flex-wrap gap-5" ref={containerRef}>
          {Array.isArray(listCreatorsData) && listCreatorsData.length > 0
            ? listCreatorsData.map((i, idx) => {
                const isLast = idx === listCreatorsData.length - 1;
                return (
                  <div
                    key={idx}
                    ref={isLast ? lastItemRef : null}
                    className="
                w-[48%]
                bg-white/5 border border-white/10 rounded-xl
                p-4 flex flex-col gap-4
                hover:border-emerald-500/40 hover:bg-emerald-500/5
                transition
              ">
                    {/* avatar + name */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500/30 to-cyan-500/20 overflow-hidden">
                        <Image
                          width={60}
                          height={40}
                          src={i.picture || "/"}
                          alt="#"
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{i.username}</span>
                        <span className="text-xs text-gray-400">
                          {category === "photo" && "Photographer"}
                          {category === "video" && "Filmmaker"}
                          {category === "music" && "Music Producer"}
                        </span>
                      </div>
                    </div>

                    {/* bio */}
                    <p className="text-sm text-gray-400 line-clamp-2">
                      Creating high quality content and sharing creative
                      inspiration.
                    </p>

                    {/* stats */}
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>12.4k followers</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 capitalize">
                        {category}
                      </span>
                    </div>

                    {/* action */}
                    <button
                      onClick={() => {
                        router.push(`/${currentPath}/${i.publicId}`);
                      }}
                      className="mt-1 py-1.5 rounded-md bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-300 transition text-sm">
                      Visit
                    </button>
                  </div>
                );
              })
            : null}
        </div>

        {/* ===== INFINITE PLACEHOLDER ===== */}
        {/* <div className="py-14 text-center text-gray-400">
          Loading more creators...
        </div> */}
      </div>

      {/* ================= RIGHT : DISCOVERY PANEL ================= */}
      <div className="w-70 flex flex-col gap-6">
        {/* SEARCH */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Search Creator</span>
          <input
            placeholder="Search..."
            className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 outline-none text-sm"
          />
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* TRENDING SKILLS */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Trending Skills</span>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "#cinematic",
              "#streetphoto",
              "#portrait",
              "#lofi",
              "#travel",
            ].map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* RISING CREATORS */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium">Rising Experts</span>

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10" />
              <div className="flex flex-col text-xs">
                <span className="font-medium">username</span>
                <span className="text-gray-400">
                  {category === "photo" && "Photographer"}
                  {category === "video" && "Filmmaker"}
                  {category === "music" && "Producer"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* INFO */}
        <div className="text-xs text-gray-400 leading-relaxed">
          Build your reputation by uploading consistent and high quality
          content. Get discovered by brands and collaborators.
        </div>
      </div>
    </section>
  );
}
