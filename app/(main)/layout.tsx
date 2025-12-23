import Navbar from "@/app/(main)/(navbar)/Navbar";
import Sidebar from "@/app/(main)/(sidebar)/side-bar";

export default function MainLayout({
  children,
  intAuth,
}: {
  children: React.ReactNode;
  intAuth: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Sidebar intAuth={intAuth} children={children} />
    </>
  );
}

// ? 【EDM Relax #4】Chill & Focus Lo-Fi EDM 🎧 Background Music for Study, Work & Everyday Moments
