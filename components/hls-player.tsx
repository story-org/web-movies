"use client";

import { useEffect, useRef } from "react";
import HLS from "hls.js";

const HLSPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const hls = new HLS();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(HLS.Events.MANIFEST_LOADED, () => {
        videoRef.current?.play();
      });
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} className="w-full h-full rounded-lg" controls />
    </div>
  );
};

export default HLSPlayer;
