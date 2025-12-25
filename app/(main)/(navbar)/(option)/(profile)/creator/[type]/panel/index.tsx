"use client";

import {usePathname } from "next/navigation";
import ModalPanel from "../@intercept/(.)/[panel]/modal";

const PanelPage = () => {
  const pathname = usePathname();

  const currentPath = pathname.split("/").filter(Boolean).at(-1); // ? at(-1) -> mengambil path paling akhir;

  let path = false;

  switch (currentPath) {
    case "description":
    case "stats": {
      path = true;
      break;
    }
  }

  return <>{path && <ModalPanel currentPath={currentPath} />}</>;
};

export default PanelPage;
