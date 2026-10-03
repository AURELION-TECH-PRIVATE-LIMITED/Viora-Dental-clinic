import { useEffect, useRef } from "react";

/**
 * Returns a ref for a muted/looping <video>. React's `muted` JSX prop
 * doesn't reliably set the attribute in time for the browser's autoplay
 * gate, so play() is called explicitly on mount. Also resumes playback on
 * visibilitychange, since browsers pause background-tab video to save
 * battery.
 *
 * Respects `prefers-reduced-motion`: if set, the video stays paused on its
 * poster frame instead of autoplaying.
 */
// play() is spec'd to return a Promise, but jsdom's stub (used in tests)
// returns undefined instead of rejecting — guard against both.
function safePlay(video: HTMLVideoElement) {
  video.play()?.catch(() => {});
}

export function useAutoplayVideo<T extends HTMLVideoElement>() {
  const videoRef = useRef<T>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.muted = true;
    safePlay(video);

    const onVisible = () => {
      if (!document.hidden) safePlay(video);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return videoRef;
}
