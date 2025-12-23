"use client";

import { SLoading } from "@/_util/Spinner-loading";
import dynamic from "next/dynamic";

const LazyOverview = dynamic(() => import("../stats/overview"), {
  loading: () => <SLoading />,
});
const LazyCharts = dynamic(() => import("../stats/charts"), {
  loading: () => <SLoading />,
});
const LazyDate = dynamic(() => import("../stats/date"), {
  loading: () => <SLoading />,
});
const LazyAudience = dynamic(() => import("../stats/audience"), {
  loading: () => <SLoading />,
});
const LazyMilestones = dynamic(() => import("../stats/milestone"), {
  loading: () => <SLoading />,
});

const ModalStats = () => {
  return (
    <div
      className="
        flex flex-col gap-6
        w-full h-full
        p-8
        bg-black/20
      "
    >
      {/* ===== TOP : DATE SELECTOR ===== */}
      <div
        className="
          w-full
          p-4 rounded-xl
          bg-white/5
          border border-white/10
        "
      >
        <LazyDate />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex gap-6 w-full flex-1 overflow-hidden">
        {/* ===== LEFT (PRIMARY) ===== */}
        <div
          className="
            flex flex-col gap-6
            w-[70%]
            overflow-y-auto
            pr-2
          "
        >
          <LazyOverview />
        </div>

        {/* ===== RIGHT (SECONDARY) ===== */}
        <div
          className="
            flex flex-col gap-6
            w-[30%]
            overflow-y-auto
            pr-1
          "
        >
          <LazyCharts />
          <LazyOverview />
          <LazyMilestones />
          <LazyAudience />
        </div>
      </div>
    </div>
  );
};

export default ModalStats;
