"use client";

import React, {
  memo,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { creatorContext } from "@/app/context";
// import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
// import PutPhotoForm from "./form/photo/put-photo-form";
import ItemsList from "./items-list";
import { TListItemFolderPhoto } from "../../type/content/type";

export interface FolderListToggle {
  open: boolean;
  folder: string;
}

export interface IsRenderComponent {
  isOpen: boolean;
  iuProduct: number | null;
  value: string;
}

const ListItemPhoto = ({ data }: { data: TListItemFolderPhoto[] }) => {
  const { folderNamePath, stateFolder, setStateFolder, itemFolderPhotoData } =
    useContext(creatorContext);
  //   const currentPath = usePathname();

  //   const [isRender, setIsRender] = useState<IsRenderComponent>({
  //     isOpen: false,
  //     iuProduct: null,
  //     value: "",
  //   });

  const handleAction = useCallback(
    (actionType: string, folderName: string) => {
      switch (actionType) {
        case "toggle": {
          setStateFolder((prev: { isFolder: string }) => ({
            ...prev,
            isOpen: prev.isFolder === folderName ? false : true,
            isFolder: prev.isFolder === folderName ? "" : folderName,
          }));
          break;
        }
      }
    },
    [setStateFolder]
  );

  //   const handleAction = useCallback(
  //     (actionType: string, folderName: string) => {
  //       switch (actionType) {
  //         case "open": {
  //           setIsRender((prev) => ({
  //             ...prev,
  //             isOpen: true,
  //           }));
  //           const newUrl = `${currentPath}?folder-name=${folderName}`;
  //           history.pushState({}, "", newUrl);
  //           break;
  //         }
  //         case "close": {
  //           setIsRender((prev) => ({
  //             ...prev,
  //             isOpen: false,
  //           }));
  //           const newUrl = `${currentPath}`;
  //           history.pushState({}, "", newUrl);
  //           break;
  //         }
  //       }
  //     },
  //     [currentPath]
  //   );

  //   const renderComponent = useCallback(() => {
  //     switch (isRender.value) {
  //       case "update": {
  //         return <PutPhotoForm setIsRender={setIsRender} />;
  //       }
  //     }
  //   }, [isRender]);

  return (
    <>
      <div className="w-full flex p-4">
        <div className="flex flex-col gap-2 w-full">
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((f) => (
              <div
                key={f.folderName}
                className="w-full p-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <>
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-5 h-5 text-indigo-600"
                      >
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.75a1 1 0 0 1 .8.4l1 1.333A1 1 0 0 0 12.56 7H18.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9z"
                        />
                      </svg>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {f.folderName}
                      </span>

                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-[2px] rounded border border-gray-200">
                        {f.amountItem}
                      </span>
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={() => handleAction("toggle", f.folderName)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          stateFolder.isOpen &&
                          stateFolder.isFolder === f.folderName
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    </button>
                  </div>
                  {stateFolder.isFolder === f.folderName && (
                    <ItemsList
                      data={itemFolderPhotoData}
                      folderName={f.folderName}
                      setStateFolder={setStateFolder}
                    />
                  )}
                </>
              </div>
            ))}
        </div>
      </div>
      {/* {renderComponent()} */}
    </>
  );
};

export default memo(ListItemPhoto);
