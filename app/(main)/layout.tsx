import Sidebar from "./(sidebar)";
import Navbar from "./(navbar)";

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
      <section className="flex w-full min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-black/60 py-12 pl-30 w-full pr-10">
          {intAuth}
          {children}
        </main>
      </section>
    </>
  );
}
