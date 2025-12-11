import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report",
  description: "Report",
};

export const dynamic = "force-static";

export default function ReportPage() {
  return (
    <div className="w-full bg-black/80 text-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-10 tracking-tight">
          Report a Problem
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-8">
          <p className="text-gray-300 leading-relaxed">
            If you encounter issues, abusive behavior, copyright infringement,
            or anything that violates our rules, please submit a report below.
            Our moderation team will review your report shortly.
          </p>

          {/* ================= FORM ================= */}
          <form className="space-y-6">
            {/* TYPE */}
            <div>
              <label className="block font-semibold mb-2">Report Type</label>
              <select
                className="
                  w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 
                  text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              >
                <option className="text-gray-900">Content Violation</option>
                <option className="text-gray-900">User Misconduct</option>
                <option className="text-gray-900">Copyright Issue</option>
                <option className="text-gray-900">Bug Report</option>
                <option className="text-gray-900">Other</option>
              </select>
            </div>

            {/* URL */}
            <div>
              <label className="block font-semibold mb-2">
                Related Page / URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://yourapp.com/post/123"
                className="
                  w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 
                  text-gray-200 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block font-semibold mb-2">
                Describe the Issue
              </label>
              <textarea
                rows={5}
                placeholder="Tell us what happened..."
                className="
                  w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 
                  text-gray-200 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="
                px-5 py-2 rounded-md font-semibold
                bg-blue-600 text-white 
                hover:bg-blue-700 transition 
                border border-white/10
              "
            >
              Submit Report
            </button>
          </form>

          <hr className="border-white/10" />

          {/* EXTRA INFO */}
          <section>
            <h2 className="text-xl font-semibold mb-2">What Happens Next?</h2>
            <p className="text-gray-300 leading-relaxed">
              Our moderation team reviews every report. You may be contacted for
              additional information if needed. Severe violations may result in
              temporary or permanent account actions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-2">
              Emergency or Safety Concerns
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If someone is in immediate danger, please contact local emergency
              services. Do not wait for us to respond.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
