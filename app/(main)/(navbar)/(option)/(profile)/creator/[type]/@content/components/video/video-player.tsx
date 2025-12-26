"use client";

import { VideoItem } from "../video-card";

interface Props {
  video: VideoItem;
  onClose: () => void;
}

const VideoPlayerModal = ({ video, onClose }: Props) => {
  return (
    <div className="overlay backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-xl">
        ✕
      </button>

      <video
        src={video.url}
        poster={video.thumbnailUrl}
        controls
        autoPlay
        playsInline
        preload="metadata"
        className="max-w-[80vw] max-h-[80vh] rounded-xl"
      />
    </div>
  );
};

export default VideoPlayerModal;
