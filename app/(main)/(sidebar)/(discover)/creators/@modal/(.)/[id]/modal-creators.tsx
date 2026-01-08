"use client";

import { creatorsContext } from "@/app/context";
import { useContext, useCallback, useState } from "react";
import CreatorDesc from "./creator-description";
import ImageContainer from "./photo/photo";
import VideoContainer from "./video/video";
import OptionsMenu from "./option-menu";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const FormEmail = dynamic(() => import("../../../form/form-email"));
const FormReport = dynamic(() => import("../../../form/form-report"));
const FormComment = dynamic(() => import("../../../form/form-comment"));

const ModalPopup = () => {
  const { id } = useParams<{ id: string }>();

  const {
    open,
    setOpen,
    creatorDescriptionData,
    listCreatorProductData,
    ListCreatorVideoData,
    sortItemVideo,
    sortVideo,
    listCreatorProductDataComment,
    listCreatorProductDataSubComment,
  } = useContext(creatorsContext);

  const [renderAction, setRenderAction] = useState<string>("");

  const renderContent = useCallback(() => {
    switch (open.isValue) {
      case "Photos":
        return (
          <ImageContainer
            currentPath={id}
            data={listCreatorProductData}
            setRenderAction={setRenderAction}
          />
        );
      case "Videos":
        return (
          <VideoContainer
            data={sortVideo === "latest" ? sortItemVideo : ListCreatorVideoData}
          />
        );
      case "Profile":
        return (
          <CreatorDesc
            data={creatorDescriptionData}
            setRenderAction={setRenderAction}
            targetId={id}
          />
        );
    }
  }, [
    open.isValue,
    id,
    listCreatorProductData,
    sortVideo,
    sortItemVideo,
    ListCreatorVideoData,
    creatorDescriptionData,
  ]);

  const renderActions = useCallback(() => {
    switch (renderAction) {
      case "email": {
        return <FormEmail setRenderAction={setRenderAction} currentPath={id} />;
      }
      case "report": {
        return <FormReport setRenderAction={setRenderAction} />;
      }
      case "comment": {
        return (
          <FormComment
            setRenderAction={setRenderAction}
            currentPath={id}
            data={listCreatorProductDataComment}
            subData={listCreatorProductDataSubComment}
          />
        );
      }
    }
  }, [
    renderAction,
    id,
    listCreatorProductDataComment,
    listCreatorProductDataSubComment,
  ]);

  return (
    <>
      <div className="overlay backdrop-blur-sm">
        <div className="flex w-250 h-180 rounded-xl relative overflow-hidden border-emerald-500 border">
          <div className="flex flex-col md:flex-row h-full">
            <OptionsMenu open={open} setOpen={setOpen} />
          </div>
          <div className="w-full h-full p-4 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
      {renderActions()}
    </>
  );
};

export default ModalPopup;
