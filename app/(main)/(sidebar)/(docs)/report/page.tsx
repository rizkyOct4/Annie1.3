// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Report",
//   description: "Report",
// };

// const ReportPage = async () => {
//   "use cache";

//   return (
//     <div className="w-full text-gray-200">
//       <div className="max-w-3xl mx-auto px-6 py-14">
//         <h1 className="text-4xl font-bold mb-10 tracking-tight">
//           Report a Problem
//         </h1>
//         {/* <Widget /> */}

//         <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-8">
//           <p className="text-gray-300 leading-relaxed">
//             If you encounter issues, abusive behavior, copyright infringement,
//             or anything that violates our rules, please submit a report below.
//             Our moderation team will review your report shortly.
//           </p>

//           {/* ================= FORM ================= */}
//           <form className="space-y-6">
//             {/* TYPE */}
//             <div>
//               <label className="block font-semibold mb-2">Report Type</label>
//               <select
//                 className="
//                   w-full bg-black/30 border border-white/10 rounded-md px-3 py-2
//                   text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500
//                 ">
//                 <option className="text-gray-900">Content Violation</option>
//                 <option className="text-gray-900">User Misconduct</option>
//                 <option className="text-gray-900">Copyright Issue</option>
//                 <option className="text-gray-900">Bug Report</option>
//                 <option className="text-gray-900">Other</option>
//               </select>
//             </div>

//             {/* URL */}
//             <div>
//               <label className="block font-semibold mb-2">
//                 Related Page / URL (Optional)
//               </label>
//               <input
//                 type="text"
//                 placeholder="https://yourapp.com/post/123"
//                 className="
//                   w-full bg-black/30 border border-white/10 rounded-md px-3 py-2
//                   text-gray-200 placeholder-gray-500
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                 "
//               />
//             </div>

//             {/* MESSAGE */}
//             <div>
//               <label className="block font-semibold mb-2">
//                 Describe the Issue
//               </label>
//               <textarea
//                 rows={5}
//                 placeholder="Tell us what happened..."
//                 className="
//                   w-full bg-black/30 border border-white/10 rounded-md px-3 py-2
//                   text-gray-200 placeholder-gray-500
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                 "></textarea>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <button
//               type="submit"
//               className="
//                 px-5 py-2 rounded-md font-semibold
//                 bg-blue-600 text-white
//                 hover:bg-blue-700 transition
//                 border border-white/10
//               ">
//               Submit Report
//             </button>
//           </form>

//           <hr className="border-white/10" />

//           {/* EXTRA INFO */}
//           <section>
//             <h2 className="text-xl font-semibold mb-2">What Happens Next?</h2>
//             <p className="text-gray-300 leading-relaxed">
//               Our moderation team reviews every report. You may be contacted for
//               additional information if needed. Severe violations may result in
//               temporary or permanent account actions.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-xl font-semibold mt-6 mb-2">
//               Emergency or Safety Concerns
//             </h2>
//             <p className="text-gray-300 leading-relaxed">
//               If someone is in immediate danger, please contact local emergency
//               services. Do not wait for us to respond.
//             </p>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportPage;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report",
  description: "Report",
};

const ReportPage = async () => {
  "use cache";

  return (
    <div className="w-full text-gray-200">
      <div className="w-full mx-auto px-6 py-10">
        {/* ================= TITLE ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Report an Issue</h1>
          <p className="text-sm text-gray-400 mt-1">
            Help us keep the community safe and creative
          </p>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex gap-6 items-start">
          {/* ================================================= */}
          {/* ================= LEFT : FORM ================== */}
          {/* ================================================= */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-8">
            <p className="text-gray-300 leading-relaxed text-sm">
              Report abusive behavior, copyright issues, bugs, or any content
              that violates our community rules. Our moderation team will review
              your report carefully.
            </p>

            {/* ================= FORM ================= */}
            <form className="flex flex-col gap-6">
              {/* TYPE */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Report Type</label>
                <select
                  className="
                    w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 
                    text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500
                  ">
                  <option className="text-gray-900">Content Violation</option>
                  <option className="text-gray-900">User Misconduct</option>
                  <option className="text-gray-900">Copyright Issue</option>
                  <option className="text-gray-900">Bug Report</option>
                  <option className="text-gray-900">Other</option>
                </select>
              </div>

              {/* URL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Related Page / URL (optional)
                </label>
                <input
                  type="text"
                  placeholder="https://yourapp.com/post/123"
                  className="
                    w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 
                    text-gray-200 placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                />
              </div>

              {/* MESSAGE */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Describe the Issue
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what happened..."
                  className="
                    w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 
                    text-gray-200 placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                />
              </div>

              {/* ACTION */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="
                    px-5 py-2 rounded-md font-medium
                    bg-emerald-500/20 text-emerald-300
                    hover:bg-emerald-500/30 transition 
                    border border-emerald-500/30
                  ">
                  Submit Report
                </button>

                <span className="text-xs text-gray-400">
                  We usually respond within 24 hours
                </span>
              </div>
            </form>
          </div>

          {/* ================================================= */}
          {/* ================= RIGHT : INFO ================= */}
          {/* ================================================= */}
          <div className="w-[320px] flex flex-col gap-5">
            {/* PROCESS */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
              <h4 className="font-semibold text-sm">What Happens Next?</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our moderation team reviews every report manually. If needed, we
                may contact you for more information.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Severe violations may result in content removal or account
                restrictions.
              </p>
            </div>

            {/* WHEN TO REPORT */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
              <h4 className="font-semibold text-sm">When Should You Report?</h4>
              <ul className="text-xs text-gray-400 flex flex-col gap-1">
                <li>• Harassment or hate speech</li>
                <li>• Stolen or copyrighted content</li>
                <li>• Spam or scam activity</li>
                <li>• App bugs or crashes</li>
              </ul>
            </div>

            {/* SAFETY */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-2">
              <h4 className="font-semibold text-sm text-red-400">
                Emergency Situations
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                If someone is in immediate danger, please contact your local
                emergency services. Do not wait for platform response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
