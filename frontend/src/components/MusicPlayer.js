import { useEffect, useRef } from "react";

// Map track names to audio URLs
const TRACK_URLS = {
  intro:
    "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1",
  final:
    "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1",
};

function MusicPlayer({ track, playing, volume, muted, onAutoplayBlocked }) {
  const audioRef = useRef(null);

  // Sync volume and mute
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // React to track / playing changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If no track or not playing, pause
    if (!track || track === "none" || !playing) {
      audio.pause();
      return;
    }

    const url = TRACK_URLS[track];
    if (!url) {
      audio.pause();
      return;
    }

    // Set correct src if needed
    if (audio.src !== url) {
      audio.src = url;
    }

    // Restart from beginning
    audio.currentTime = 0;

    try {
      const result = audio.play();

      // Modern browsers return a Promise
      if (result && typeof result.then === "function") {
        result
          .then(() => {
            // Successfully playing
          })
          .catch((err) => {
            console.log("Autoplay blocked or failed:", err);
            onAutoplayBlocked?.();
          });
      } else {
        // Older browsers (no Promise)
        console.log("Audio started (no Promise support).");
      }
    } catch (err) {
      console.log("Error calling play():", err);
      onAutoplayBlocked?.();
    }
  }, [track, playing, onAutoplayBlocked]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      loop
      playsInline // important for Safari on iOS
    />
  );
}

export default MusicPlayer;
