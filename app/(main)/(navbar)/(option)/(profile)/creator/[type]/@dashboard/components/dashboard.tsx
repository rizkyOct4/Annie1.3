"use client";

import { memo, useState, useCallback } from "react";
import ActivePath from "./active-path";
import SearchFolder from "./search-folder";
import PostingBtn from "./posting-btn";
import { IDashboard } from "../../types/dashboard/interface";
import PostPhotoForm from "../../form/photo/post-photo-form";
import PostVideoForm from "../../form/video/post-video-form";

export const Dashboard = ({ currentPath }: { currentPath: string }) => {
  const [isRender, setIsRender] = useState<IDashboard>({
    open: false,
    type: "",
  });

  const render = useCallback(() => {
    switch (isRender.type) {
      case "video": {
        return <PostVideoForm setIsRender={setIsRender} />;
      }
      case "photo": {
        return <PostPhotoForm setIsRender={setIsRender} />;
      }
    }
  }, [isRender]);

  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        {/* // ? LEFT NAVIGATION */}
        <ActivePath currentPath={currentPath} />

        {/* // ? RIGHT SEARCH BAR */}
        <SearchFolder currentPath={currentPath} />
      </div>

      {/* // * POST BTN */}
      <PostingBtn
        currentPath={currentPath}
        isRender={isRender}
        setIsRender={setIsRender}
      />

      {render()}
    </>
  );
};

export default memo(Dashboard);
