"use client";

import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { useState, useCallback, memo} from "react";
import { useRouter } from "next/navigation";
import Options from "./option/option";

const Navbar = () => {
  const router = useRouter();

  const navbarList = [
    { name: "Homepage", icon: <IoHomeOutline />, link: "/homepage" },
  ];

  const [state, setState] = useState(false);

  const handleAction = useCallback((actionType: string) => {
    switch (actionType) {
      case "option": {
        setState((prev) => !prev);
        break;
      }
    }
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 w-full h-[80px] z-101 bg-black/80
                flex justify-between items-center px-8 border-b-white border-b-2"
    >
      {/* Brand */}
      <div className="text-white font-semibold text-lg tracking-wide">
        Next Prototype
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Dynamic Nav List */}
        {Array.isArray(navbarList) &&
          navbarList.map((i, index) => (
            <button
              key={index}
              onClick={() => router.push(i.link)}
              className="flex items-center gap-2 
                      px-4 py-2 rounded-md bg-white text-black 
                    hover:bg-gray-200 transition hover:cursor-pointer"
            >
              <span className="text-lg">{i.icon}</span>
              {i.name}
            </button>
          ))}

        {/* Options */}
        <div className="relative">
          <button
            className="text-white flex justify-center items-center p-2 
                  rounded-md border border-white/20 bg-white/10 
                hover:bg-white/20 transition hover:cursor-pointer"
            onClick={() => handleAction("option")}
          >
            {state ? (
              <AiOutlineFullscreenExit className="text-xl" />
            ) : (
              <SlOptionsVertical className="text-xl" />
            )}
          </button>

          {state && <Options setState={setState}/>}
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);
