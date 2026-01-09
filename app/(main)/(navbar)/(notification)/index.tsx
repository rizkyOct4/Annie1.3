"use client";

import { memo } from "react";

const todayNotifs = [
  { type: "like", unread: true },
  { type: "follow", unread: true },
  { type: "collab", unread: true },
  { type: "like", unread: false },
  { type: "comment", unread: false },
];

const earlierNotifs = Array.from({ length: 6 });

const NotificationContent = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    // ===== OVERLAY =====
    <div className="overlay backdrop-blur-sm">
      {/* ===== POPUP PANEL ===== */}
      <div className="w-full max-w-5xl mx-4 text-gray-200 bg-black/80 border border-white/10 rounded-2xl shadow-xl">
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            className="text-sm text-gray-400 hover:text-white transition"
            onClick={() => setState(null)}>
            ✕
          </button>
        </div>

        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          {/* ================= MAIN LAYOUT ================= */}
          <div className="flex gap-6 items-start">
            {/* ================= LEFT ================= */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-8">
              {/* ---------- TODAY ---------- */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Today</h3>
                  <span className="text-xs text-emerald-400">New</span>
                </div>

                <div className="flex flex-col gap-3">
                  {todayNotifs.map((n, i) => {
                    const isCollab = n.type === "collab";

                    return (
                      <div
                        key={i}
                        className={`flex gap-4 p-3 rounded-lg transition
                          ${n.unread ? "bg-white/10" : "hover:bg-white/5"}
                          ${isCollab ? "border border-emerald-500/40" : ""}
                        `}>
                        {/* avatar + unread dot */}
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-white/10" />
                          {n.unread && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500" />
                          )}
                        </div>

                        {/* content */}
                        <div className="flex flex-col text-sm flex-1">
                          {isCollab ? (
                            <>
                              <span>
                                <b>alex_creator</b> invited you to collaborate
                              </span>
                              <span className="text-xs text-gray-400">
                                Music project • 10 minutes ago
                              </span>

                              <div className="flex gap-2 mt-2">
                                <button className="text-xs px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition">
                                  Accept
                                </button>
                                <button className="text-xs px-3 py-1 rounded-md border border-white/10 hover:bg-white/10 transition">
                                  Decline
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <span>
                                <b>user_{i}</b>{" "}
                                {n.type === "like"
                                  ? "liked your photo"
                                  : "started following you"}
                              </span>
                              <span className="text-xs text-gray-400">
                                5 minutes ago
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <hr className="border-white/10" />

              {/* ---------- EARLIER ---------- */}
              <section className="flex flex-col gap-4">
                <h3 className="font-semibold">Earlier</h3>

                <div className="flex flex-col gap-3">
                  {earlierNotifs.map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition">
                      <div className="w-10 h-10 rounded-full bg-white/10" />

                      <div className="flex flex-col text-sm">
                        <span>
                          <b>creator_{i}</b> commented on your video
                        </span>
                        <span className="text-xs text-gray-400">
                          2 days ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <button className="self-center text-sm px-5 py-2 border border-white/10 rounded-md hover:bg-white/10 transition">
                Load More
              </button>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="w-70 flex flex-col gap-5">
              {/* FILTER */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
                <h4 className="font-semibold text-sm">Filter</h4>

                <div className="flex flex-wrap gap-2 text-xs">
                  {["All", "Likes", "Follows", "Comments", "Collabs"].map(
                    (f) => (
                      <button
                        key={f}
                        className="px-3 py-1 rounded-full border border-white/10 hover:bg-white/10 transition">
                        {f}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* STATS */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 text-sm text-gray-400">
                <p>🔔 Unread: 3</p>
                <p>🤝 Collaboration invites: 1</p>
                <p>❤️ Likes today: 12</p>
              </div>

              {/* ACTION */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
                <button className="text-sm px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition">
                  Mark all as read
                </button>
                <button className="text-sm px-4 py-2 rounded-md border border-white/10 hover:bg-white/10 transition">
                  Clear notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NotificationContent);
