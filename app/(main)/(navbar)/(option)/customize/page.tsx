import type { Metadata } from "next";
import ProfileCustomize from "./components/modal";
import { Suspense } from "react";
import { RiTwitterLine, RiInstagramLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Profile Customize",
  description:
    "Terms of Service, Privacy Policy, and Content Guidelines for YourApp.",
};

export const dummyUser: any = {
  // iu: 1001,
  username: "John Doe",
  biodata:
    "Software engineer with interest in UI/UX, backend systems, and robotics. I love building simple yet meaningful digital experiences.",
  gender: "male",
  phoneNumber: "+6289876543210",
  location: "Jakarta, Indonesia",
  pathCurrentImage: "/photo/second.webp",
  socialLink: [
    {
      platform: "twitter",
      link: "https://twitter.com/johndoe",
      icon: <RiTwitterLine />,
    },
    {
      platform: "instagram",
      link: "https://instagram.com/johndoe",
      icon: <RiInstagramLine />,
    },
  ],
  createdAt: "2025-01-01T10:24:00.000Z",
  // updateAt: null,
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center text-gray-200">
          Loading profile...
        </div>
      }>
      <ProfileCustomize data={dummyUser} />
    </Suspense>
  );
};

export default page;
