"use client";

import { FaBoxOpen, FaFlag, FaEnvelope, FaUser } from "react-icons/fa";
import { ModalState } from "../../types/interface";
import { memo } from "react";

const OptionsMenu = ({
  open,
  setOpen,
}: {
  open: ModalState;
  setOpen: React.Dispatch<React.SetStateAction<ModalState>>;
}) => {
  const options = [
    {
      label: "Profile",
      icon: <FaUser size={18} />,
    },
    {
      label: "Products",
      icon: <FaBoxOpen size={18} />,
    },
    {
      label: "Email",
      icon: <FaEnvelope size={18} />,
    },
    {
      label: "Report",
      icon: <FaFlag size={18} />,
    },
  ];
  return (
    <div
      className="
    w-20
    bg-black/80
    border-r border-white/10
    backdrop-blur-sm
    flex
    flex-col
    items-center
    py-4
    gap-3
  ">
      {options.map((i) => {
        const isActive = open.isValue === i.label;

        return (
          <button
            type="button"
            key={i.label}
            onClick={() => {
              setOpen((prev) => ({
                ...prev,
                isValue: i.label,
              }));
            }}
            className="
          w-full
          flex
          flex-col
          items-center
          gap-1
          py-3
          rounded-lg
        ">
            {/* ICON */}
            <span className={isActive ? "text-emerald-500" : "text-gray-400"}>
              {i.icon}
            </span>

            {/* LABEL */}
            <span
              className={`
            text-[10px]
            font-medium
            text-center
            ${isActive ? "text-gray-300" : "text-gray-500"}
          `}>
              {i.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default memo(OptionsMenu);
