// "use client"
// import { memo } from "react";

// const LegalContent = () => {
//   return (
//     <div className="w-full text-gray-200">
//       <div className="max-w-4xl mx-auto px-6 py-14">
//         <h1 className="text-4xl font-bold mb-10 tracking-tight">
//           Legal Information
//         </h1>

//         {/* --- CARD WRAPPER (GitHub-like) --- */}
//         <div
//           className="
//             bg-white/5 border border-white/10 rounded-xl 
//             p-8 space-y-12
//           ">
//           {/* ====================== TERMS OF SERVICE ====================== */}
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
//             <p className="mb-4 text-gray-300 leading-relaxed">
//               Welcome to <strong>YourApp</strong>. By accessing our platform,
//               you agree to comply with these Terms of Service. These terms apply
//               to all users, creators, visitors, and contributors.
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-semibold">1. Use of Services</h3>
//                 <p className="text-gray-300 leading-relaxed">
//                   You agree not to misuse the platform, including hacking,
//                   scraping, spamming, impersonation, or disrupting the community
//                   experience.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold">2. Account Security</h3>
//                 <p className="text-gray-300 leading-relaxed">
//                   You are responsible for protecting your account credentials
//                   and reporting any unauthorized activity.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold">
//                   3. Content Responsibility
//                 </h3>
//                 <p className="text-gray-300 leading-relaxed">
//                   You are responsible for any content (photos, videos, posts)
//                   uploaded. Illegal, harmful, explicit, or infringing content is
//                   prohibited.
//                 </p>
//               </div>
//             </div>
//           </section>

//           <hr className="border-white/10" />

//           {/* ====================== PRIVACY ====================== */}
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
//             <p className="mb-4 text-gray-300 leading-relaxed">
//               We respect your privacy. This policy explains how YourApp collects
//               and uses your data.
//             </p>

//             <h3 className="text-lg font-semibold">Information Collected</h3>
//             <ul className="list-disc ml-6 text-gray-300 leading-relaxed mb-4">
//               <li>Account info (name, email, profile image)</li>
//               <li>Uploaded content (photos, videos)</li>
//               <li>Behavioral/analytics data</li>
//               <li>Cookies for login & personalization</li>
//             </ul>

//             <h3 className="text-lg font-semibold">How We Use Data</h3>
//             <ul className="list-disc ml-6 text-gray-300 leading-relaxed">
//               <li>To maintain platform features</li>
//               <li>To personalize your feed</li>
//               <li>To enhance safety & moderation</li>
//               <li>To send important notices</li>
//             </ul>
//           </section>

//           <hr className="border-white/10" />

//           {/* ====================== CONTENT POLICY ====================== */}
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Content Policy</h2>
//             <p className="text-gray-300 leading-relaxed mb-4">
//               YourApp supports creative, educational, and community-driven
//               content. The following rules apply:
//             </p>

//             <h3 className="text-lg font-semibold">Allowed</h3>
//             <ul className="list-disc ml-6 text-gray-300 leading-relaxed mb-4">
//               <li>Original photos and videos</li>
//               <li>Community discussions</li>
//               <li>Non-sensitive creative content</li>
//             </ul>

//             <h3 className="text-lg font-semibold">Prohibited</h3>
//             <ul className="list-disc ml-6 text-gray-300 leading-relaxed">
//               <li>Nudity or explicit content</li>
//               <li>Violent or hateful content</li>
//               <li>Copyright-infringing uploads</li>
//               <li>Harassment or abusive behavior</li>
//             </ul>
//           </section>

//           <hr className="border-white/10" />

//           {/* ====================== DMCA ====================== */}
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">DMCA Takedown</h2>
//             <p className="text-gray-300 leading-relaxed mb-4">
//               If you believe your copyrighted material has been posted without
//               permission, please include:
//             </p>

//             <ul className="list-disc ml-6 text-gray-300 leading-relaxed">
//               <li>Your full name & contact</li>
//               <li>Links to infringing content</li>
//               <li>Proof of ownership</li>
//               <li>A formal statement of accuracy</li>
//             </ul>
//           </section>

//           <hr className="border-white/10" />

//           {/* ====================== CONTACT ====================== */}
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Contact</h2>
//             <p className="text-gray-300 leading-relaxed">
//               For legal concerns or DMCA, reach us at:
//             </p>
//             <p className="mt-2 font-semibold">annie1-3.vercel.app</p>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default memo(LegalContent);
"use client";
import { memo } from "react";

const LegalContent = () => {
  return (
    <div className="w-full text-gray-200">
      <div className="w-full mx-auto px-6 py-10">

        {/* ================= TITLE ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Legal & Policies</h1>
          <p className="text-sm text-gray-400 mt-1">
            Transparency, safety, and respect for creators
          </p>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex gap-6 items-start">

          {/* ================================================= */}
          {/* ================= LEFT : LEGAL CONTENT ========= */}
          {/* ================================================= */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-10">

            {/* ================= TERMS ================= */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Terms of Service</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                By accessing <b>YourApp</b>, you agree to follow these rules.
                These terms apply to all users, creators, and visitors.
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-300">
                <div>
                  <b>Use of Services</b> — No hacking, scraping, impersonation,
                  spam, or disruption of community features.
                </div>
                <div>
                  <b>Account Security</b> — You are responsible for keeping your
                  login credentials safe.
                </div>
                <div>
                  <b>Content Responsibility</b> — Upload only content you own or
                  have rights to. Illegal or harmful material is prohibited.
                </div>
              </div>
            </section>

            <hr className="border-white/10" />

            {/* ================= PRIVACY ================= */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Privacy Policy</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                We collect only what is necessary to operate and improve the
                platform.
              </p>

              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <b>Information collected:</b>
                <ul className="ml-4 list-disc">
                  <li>Account data (name, email, avatar)</li>
                  <li>Uploaded media and posts</li>
                  <li>Usage analytics</li>
                  <li>Cookies for login and personalization</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <b>How we use data:</b>
                <ul className="ml-4 list-disc">
                  <li>Run core features</li>
                  <li>Personalize feeds</li>
                  <li>Improve safety & moderation</li>
                  <li>Send service notifications</li>
                </ul>
              </div>
            </section>

            <hr className="border-white/10" />

            {/* ================= CONTENT POLICY ================= */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Content Policy</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                We encourage creative and respectful content across photos,
                videos, and music.
              </p>

              <div className="flex gap-10 text-sm text-gray-300">
                <div className="flex flex-col gap-2">
                  <b className="text-emerald-400">Allowed</b>
                  <ul className="ml-4 list-disc">
                    <li>Original media</li>
                    <li>Creative projects</li>
                    <li>Educational discussions</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2">
                  <b className="text-red-400">Prohibited</b>
                  <ul className="ml-4 list-disc">
                    <li>Explicit material</li>
                    <li>Violence & hate speech</li>
                    <li>Copyright violations</li>
                    <li>Harassment</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-white/10" />

            {/* ================= DMCA ================= */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">DMCA Takedown</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                If your copyrighted content appears without permission, please
                include the following:
              </p>

              <ul className="ml-4 list-disc text-sm text-gray-300">
                <li>Your legal name and contact info</li>
                <li>Direct links to infringing content</li>
                <li>Proof of ownership</li>
                <li>Statement of accuracy</li>
              </ul>
            </section>

            <hr className="border-white/10" />

            {/* ================= CONTACT ================= */}
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="text-sm text-gray-300">
                For legal or copyright inquiries:
              </p>
              <span className="text-sm font-semibold text-emerald-400">
                annie1-3.vercel.app
              </span>
            </section>
          </div>

          {/* ================================================= */}
          {/* ================= RIGHT : QUICK INFO =========== */}
          {/* ================================================= */}
          <div className="w-[320px] flex flex-col gap-5">

            {/* QUICK LINKS */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
              <h4 className="font-semibold text-sm">Quick Navigation</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <span className="hover:text-white cursor-pointer transition">
                  Terms of Service
                </span>
                <span className="hover:text-white cursor-pointer transition">
                  Privacy Policy
                </span>
                <span className="hover:text-white cursor-pointer transition">
                  Content Policy
                </span>
                <span className="hover:text-white cursor-pointer transition">
                  DMCA
                </span>
              </div>
            </div>

            {/* WHY THIS MATTERS */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
              <h4 className="font-semibold text-sm">Why This Matters</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Clear policies help protect creators, ensure fair use of
                content, and maintain a healthy creative community.
              </p>
            </div>

            {/* LAST UPDATED */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-xs text-gray-400">
              Last updated: Jan 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LegalContent);

