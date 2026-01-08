"use client";

import { memo, useState } from "react";

const dummyPosts = Array.from({ length: 6 });
const creators = Array.from({ length: 5 });
const friends = Array.from({ length: 4 });

const categories = [
  "Photography",
  "Cinematic",
  "Lo-fi Music",
  "Travel",
  "Gaming",
  "Nature",
];

type TabType = "photos" | "videos" | "music";

const HomeContent = () => {
  const [tab, setTab] = useState<TabType>("photos");

  return (
    <div className="w-full h-full text-gray-200 overflow-x-hidden">
      {/* wrapper mengikuti MAIN */}
      <div className="max-w-350 mx-auto py-10">
        {/* ================= HERO HEADER ================= */}
        <div className="mb-12 flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            Discover. Create.{" "}
            <span className="text-emerald-400">Share Your Creativity.</span>
          </h1>

          <p className="text-gray-400 max-w-2xl">
            A social platform where photos, videos, and music come together.
            Follow creators, share your moments, and build your creative
            network.
          </p>

          <div className="flex gap-4 mt-2">
            <button className="px-5 py-2 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition">
              Start Exploring
            </button>

            <button className="px-5 py-2 rounded-md border border-white/10 hover:border-emerald-500/40 hover:text-emerald-400 transition">
              Upload Your First Post
            </button>
          </div>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex gap-6 items-start w-full">
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-10">
            {/* ---------- HERO MINI ---------- */}
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">
                Share Photos, Videos & Music
              </h2>
              <p className="text-sm text-gray-400 max-w-lg">
                Connect with creators, explore trending content, and build your
                own creative space.
              </p>

              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition">
                  Explore
                </button>
                <button className="px-4 py-2 rounded-md border border-white/10 hover:bg-white/10 transition">
                  Upload
                </button>
              </div>
            </section>

            <hr className="border-emerald-500/30" />

            {/* ---------- POST COMPOSER ---------- */}
            <section className="flex flex-col gap-4">
              <p className="text-sm text-gray-400">Create Post</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <input
                  placeholder="What's on your mind?"
                  className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-emerald-500/40"
                />
              </div>

              <div className="flex gap-3 text-xs text-gray-400">
                {["Photo", "Video", "Music"].map((x) => (
                  <button
                    key={x}
                    className="px-3 py-1.5 border border-white/10 rounded-md hover:border-emerald-500/40 hover:text-emerald-400 transition">
                    {x}
                  </button>
                ))}
              </div>
            </section>

            <hr className="border-emerald-500/30" />

            {/* ---------- TRENDING TABS ---------- */}
            <section className="flex flex-col gap-5">
              <h3 className="text-xl font-semibold">🔥 Trending</h3>

              <div className="flex gap-3">
                {(["photos", "videos", "music"] as TabType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-1.5 rounded-md border text-sm transition
                      ${
                        tab === t
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : "border-white/10 hover:bg-white/10"
                      }`}>
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 overflow-x-auto pb-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-md bg-white/10 shrink-0
                      ${
                        tab === "music"
                          ? "min-w-[220px] h-[70px]"
                          : "min-w-[220px] h-[140px]"
                      }`}
                  />
                ))}
              </div>
            </section>

            <hr className="border-emerald-500/30" />

            {/* ---------- SOCIAL FEED ---------- */}
            <section className="flex flex-col gap-6">
              <h3 className="text-xl font-semibold">🆕 Latest Posts</h3>

              {dummyPosts.map((_, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-lg p-4 flex flex-col gap-4 hover:border-emerald-500/30 transition">
                  {/* header */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">username_{i}</span>
                      <span className="text-xs text-gray-400">
                        5 minutes ago
                      </span>
                    </div>
                  </div>

                  {/* content */}
                  <div className="h-[180px] bg-white/10 rounded-md" />

                  {/* actions */}
                  <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex gap-4">
                      <span className="hover:text-emerald-400 cursor-pointer transition">
                        ❤️ 120
                      </span>
                      <span className="hover:text-emerald-400 cursor-pointer transition">
                        💬 24
                      </span>
                      <span className="hover:text-emerald-400 cursor-pointer transition">
                        🔁 8
                      </span>
                    </div>
                    <button className="hover:text-emerald-400 transition">
                      Save
                    </button>
                  </div>
                </div>
              ))}

              <button className="self-center px-5 py-2 rounded-md border border-white/10 hover:border-emerald-500/40 hover:text-emerald-400 transition">
                Load More
              </button>
            </section>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="w-[300px] shrink-0 flex flex-col gap-6 sticky top-24">
            {/* ---------- SEARCH ---------- */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-sm text-gray-400">Search</p>
              <input
                placeholder="Search creators or posts..."
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-emerald-500/40"
              />
            </div>

            {/* ---------- CATEGORIES ---------- */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
              <h4 className="font-semibold">Categories</h4>

              <div className="flex flex-wrap gap-2">
                {categories.map((c, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs border border-white/10 rounded-full hover:border-emerald-500/40 hover:text-emerald-400 cursor-pointer transition">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* ---------- FEATURED CREATORS ---------- */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
              <h4 className="font-semibold">Featured Creators</h4>

              {creators.map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                    <span className="text-sm">creator_{i}</span>
                  </div>
                  <button className="text-xs px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition">
                    Follow
                  </button>
                </div>
              ))}
            </div>

            {/* ---------- SUGGESTED FRIENDS ---------- */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
              <h4 className="font-semibold">Suggested Friends</h4>

              {friends.map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">user_{i}</span>
                  <button className="text-xs px-3 py-1 border border-white/10 rounded-md hover:border-emerald-500/40 hover:text-emerald-400 transition">
                    Add
                  </button>
                </div>
              ))}
            </div>

            {/* ---------- PLATFORM STATS ---------- */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 text-sm text-gray-400">
              <p>👥 3,240 Creators</p>
              <p>📸 12,430 Photos</p>
              <p>🎬 3,210 Videos</p>
              <p>🎵 1,890 Tracks</p>
            </div>

            {/* ---------- QUICK LINKS ---------- */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 text-sm">
              {["Upload Content", "Explore", "My Profile", "Settings"].map(
                (x) => (
                  <a
                    key={x}
                    className="hover:text-emerald-400 transition cursor-pointer">
                    {x}
                  </a>
                )
              )}
            </div>

            {/* ---------- MINI FOOTER ---------- */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-gray-400 flex flex-col gap-3">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <a className="hover:text-emerald-400 transition cursor-pointer">
                  About
                </a>
                <a className="hover:text-emerald-400 transition cursor-pointer">
                  Terms
                </a>
                <a className="hover:text-emerald-400 transition cursor-pointer">
                  Privacy
                </a>
                <a className="hover:text-emerald-400 transition cursor-pointer">
                  Content
                </a>
                <a className="hover:text-emerald-400 transition cursor-pointer">
                  DMCA
                </a>
                <a className="hover:text-emerald-400 transition cursor-pointer">
                  Contact
                </a>
              </div>

              <div className="border-t border-emerald-500/30 pt-2 text-[11px] text-gray-500">
                © 2026 annie1-3.vercel.app · Built for creators
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeContent);
