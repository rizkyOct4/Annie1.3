"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type ActionToastProps = {
  type?: ToastType;
  message?: string;
  duration?: number;
};

const typeMap = {
  success: {
    icon: "✅",
    text: "Success",
    border: "border-emerald-500/40",
  },
  error: {
    icon: "❌",
    text: "Something went wrong",
    border: "border-red-500/40",
  },
  info: {
    icon: "ℹ️",
    text: "Info",
    border: "border-sky-500/40",
  },
  warning: {
    icon: "⚠️",
    text: "Warning",
    border: "border-yellow-500/40",
  },
};

const ActionToast = ({
  type = "info",
  message,
  duration = 2500,
}: ActionToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!show) return null;

  const cfg = typeMap[type];

  return (
    <div
      className="
        fixed bottom-6 right-6 z-5000
        animate-fade-in
      "
    >
      <div
        className={`
          flex items-center gap-3
          rounded-xl
          bg-black/80
          backdrop-blur-md
          border ${cfg.border}
          px-4 py-3
          shadow-xl shadow-black/40
          text-sm text-gray-200
        `}
      >
        <span className="text-lg">{cfg.icon}</span>
        <span>{message ?? cfg.text}</span>
      </div>
    </div>
  );
};

export default ActionToast;
