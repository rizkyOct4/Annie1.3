import Navbar from "@/app/(main)/(navbar)/Navbar";
import Sidebar from "@/app/(main)/(sidebar)/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Sidebar>{children}</Sidebar>
    </>
  );
}

// ? 【EDM Relax #4】Chill & Focus Lo-Fi EDM 🎧 Background Music for Study, Work & Everyday Moments
