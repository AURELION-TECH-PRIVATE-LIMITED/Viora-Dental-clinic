import { useEffect, useRef } from "react";

/**
 * Returns a ref for a muted/looping <video>. React's `muted` JSX prop
 * doesn't reliably set the attribute in time for the browser's autoplay
 * gate, so play() is called explicitly on mount. Also resumes playback on
 * visibilitychange, since browsers pause background-tab video to save
 * battery.
 */
export function useAutoplayVideo<T extends HTMLVideoElement>() {
  const videoRef = useRef<T>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});

    const onVisible = () => {
      if (!document.hidden) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return videoRef;
}
