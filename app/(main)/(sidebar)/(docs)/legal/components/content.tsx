
import { memo } from "react";

const LegalContent = () => {
  return (
    <div className="w-full text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-10 tracking-tight">
          Legal Information
        </h1>

        {/* --- CARD WRAPPER (GitHub-like) --- */}
        <div
          className="
            bg-white/5 border border-white/10 rounded-xl 
            p-8 space-y-12
          ">
          {/* ====================== TERMS OF SERVICE ====================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="mb-4 text-gray-300 leading-relaxed">
              Welcome to <strong>YourApp</strong>. By accessing our platform,
              you agree to comply with these Terms of Service. These terms apply
              to all users, creators, visitors, and contributors.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">1. Use of Services</h3>
                <p className="text-gray-300 leading-relaxed">
                  You agree not to misuse the platform, including hacking,
                  scraping, spamming, impersonation, or disrupting the community
                  experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">2. Account Security</h3>
                <p className="text-gray-300 leading-relaxed">
                  You are responsible for protecting your account credentials
                  and reporting any unauthorized activity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  3. Content Responsibility
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  You are responsible for any content (photos, videos, posts)
                  uploaded. Illegal, harmful, explicit, or infringing content is
                  prohibited.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-white/10" />

          {/* ====================== PRIVACY ====================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="mb-4 text-gray-300 leading-relaxed">
              We respect your privacy. This policy explains how YourApp collects
              and uses your data.
            </p>

            <h3 className="text-lg font-semibold">Information Collected</h3>
            <ul className="list-disc ml-6 text-gray-300 leading-relaxed mb-4">
              <li>Account info (name, email, profile image)</li>
              <li>Uploaded content (photos, videos)</li>
              <li>Behavioral/analytics data</li>
              <li>Cookies for login & personalization</li>
            </ul>

            <h3 className="text-lg font-semibold">How We Use Data</h3>
            <ul className="list-disc ml-6 text-gray-300 leading-relaxed">
              <li>To maintain platform features</li>
              <li>To personalize your feed</li>
              <li>To enhance safety & moderation</li>
              <li>To send important notices</li>
            </ul>
          </section>

          <hr className="border-white/10" />

          {/* ====================== CONTENT POLICY ====================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Content Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              YourApp supports creative, educational, and community-driven
              content. The following rules apply:
            </p>

            <h3 className="text-lg font-semibold">Allowed</h3>
            <ul className="list-disc ml-6 text-gray-300 leading-relaxed mb-4">
              <li>Original photos and videos</li>
              <li>Community discussions</li>
              <li>Non-sensitive creative content</li>
            </ul>

            <h3 className="text-lg font-semibold">Prohibited</h3>
            <ul className="list-disc ml-6 text-gray-300 leading-relaxed">
              <li>Nudity or explicit content</li>
              <li>Violent or hateful content</li>
              <li>Copyright-infringing uploads</li>
              <li>Harassment or abusive behavior</li>
            </ul>
          </section>

          <hr className="border-white/10" />

          {/* ====================== DMCA ====================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">DMCA Takedown</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you believe your copyrighted material has been posted without
              permission, please include:
            </p>

            <ul className="list-disc ml-6 text-gray-300 leading-relaxed">
              <li>Your full name & contact</li>
              <li>Links to infringing content</li>
              <li>Proof of ownership</li>
              <li>A formal statement of accuracy</li>
            </ul>
          </section>

          <hr className="border-white/10" />

          {/* ====================== CONTACT ====================== */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              For legal concerns or DMCA, reach us at:
            </p>
            <p className="mt-2 font-semibold">legal@yourapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default memo(LegalContent);
