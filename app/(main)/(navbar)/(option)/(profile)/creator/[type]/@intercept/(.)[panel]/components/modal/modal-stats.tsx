"use client";

import { SLoading } from "@/_util/Spinner-loading";
import dynamic from "next/dynamic";
// import overview from "../stats/overview";

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
    <div className="flex w-full h-full gap-4 flex-col p-10">
      {/* Kolom kiri: Tanggal */}
      <div className="w-[100%] h-auto">
        <LazyDate />
      </div>

      {/* Kolom tengah: Overview / Content */}
      <div className="flex gap-2 w-full h-[100%] overflow-y-auto">
        <div className="flex flex-col gap-4 w-[70%]">
          <LazyOverview />
        </div>

        {/* Kolom kanan: Charts */}
        <div className="flex flex-col gap-4 w-[30%]">
          <LazyCharts />
          <LazyOverview />
          <LazyMilestones />
          <LazyAudience />
          {/* <Engagement /> */}
        </div>
      </div>
    </div>
  );
};

export default ModalStats;
