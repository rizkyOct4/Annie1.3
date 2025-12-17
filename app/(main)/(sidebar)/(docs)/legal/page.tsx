import type { Metadata } from "next";
import LegalContent from "./components/content";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Terms of Service, Privacy Policy, and Content Guidelines for YourApp.",
};

const LegalPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LegalContent />
    </Suspense>
  );
};

export default LegalPage;
