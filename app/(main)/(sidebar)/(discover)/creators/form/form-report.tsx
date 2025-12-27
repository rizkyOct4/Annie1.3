"use client";

import { useEffect, useState } from "react";

const FormReport = ({ creatorId }: { creatorId: string }) => {
  const [reason, setReason] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //   useEffect(() => console.log(reason), [reason]);

  const reportOptions = ["@Spam", "@18+", "@Copyright", "Others"];

  const handleSubmit = async () => {
    if (!reason) return;
    setLoading(true);
    try {
      await fetch("/api/report-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId, reason }),
      });
      setSuccess(true);
      setReason([]); // reset select
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex flex-col gap-2 w-55">
    //   <span className="text-sm text-gray-700">Report User:</span>
    //   {reportOptions.map((opt) => (
    //     <label
    //       key={opt}
    //       className="flex items-center gap-2 text-sm text-gray-700"
    //     >
    //       <input
    //         type="checkbox"
    //         name="reportReason"
    //         value={opt}
    //         checked={reason.includes(opt)}
    //         onChange={() =>
    //           setReason((prev) =>
    //             prev.includes(opt)
    //               ? prev.filter((i) => i !== opt)
    //               : [...prev, opt]
    //           )
    //         }
    //         className="accent-blue-600"
    //       />
    //       {opt}
    //     </label>
    //   ))}
    //   <button
    //     onClick={handleSubmit}
    //     disabled={!reason || loading}
    //     className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition disabled:opacity-50"
    //   >
    //     {loading ? "Mengirim..." : "Kirim"}
    //   </button>
    //   {success && (
    //     <p className="text-green-600 text-sm">Report berhasil dikirim!</p>
    //   )}
    // </div>
    <div
      className="
    w-full
    h-full
    flex-center
    flex-col
    gap-3
    rounded-xl
    bg-black/80
    border
    border-white/10
    backdrop-blur-sm
    p-4
  ">
      <span className="text-sm font-medium text-gray-300">Report User</span>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {reportOptions.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="reportReason"
              value={opt}
              checked={reason.includes(opt)}
              onChange={() =>
                setReason((prev) =>
                  prev.includes(opt)
                    ? prev.filter((i) => i !== opt)
                    : [...prev, opt]
                )
              }
              className="
            accent-blue-500
            w-4
            h-4
          "
            />
            <span className="leading-snug">{opt}</span>
          </label>
        ))}
      </div>

      {/* Action */}
      <button
        onClick={handleSubmit}
        disabled={!reason || loading}
        className="
      mt-2
      w-fit
      px-4
      py-1.5
      rounded-lg
      bg-white/10
      border
      border-white/10
      text-sm
      font-medium
      text-gray-200
      disabled:opacity-50
    ">
        {loading ? "Mengirim..." : "Kirim"}
      </button>

      {/* Success */}
      {success && (
        <p className="text-sm text-emerald-400">Report berhasil dikirim!</p>
      )}
    </div>
  );
};

export default FormReport;
