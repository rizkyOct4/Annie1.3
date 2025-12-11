import Navbar from "@/app/(main)/(navbar)/Navbar";
import Sidebar from "@/app/(main)/(sidebar)/side-bar";

export default function MainLayout({
  children,
  intercept,
}: {
  children: React.ReactNode;
  intercept: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Sidebar intercept={intercept}>{children}</Sidebar>
    </>
  );
}

// ? 【EDM Relax #4】Chill & Focus Lo-Fi EDM 🎧 Background Music for Study, Work & Everyday Moments
