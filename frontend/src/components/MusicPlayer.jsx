import { useEffect, useRef } from "react";

// Use the SAME Dropbox URL you use in the other site
const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";
// Or Friends theme, if you prefer:
// const MUSIC_URL = "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

function MusicPlayer({ isPlaying, setIsPlaying, volume, muted }) {
  const audioRef = useRef(null);

  // Keep volume / mute in sync with the <audio> element
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // React to isPlaying changes – this is what works on mobile/Safari
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If we shouldn't be playing, pause
    if (!isPlaying) {
      audio.pause();
      return;
    }

    // Ensure correct src
    if (audio.src !== MUSIC_URL) {
      audio.src = MUSIC_URL;
    }

    audio.loop = true;

    try {
      const playResult = audio.play();

      if (playResult && typeof playResult.then === "function") {
        playResult
          .then(() => {
            // Music started successfully
          })
          .catch((err) => {
            console.log("Autoplay blocked or failed:", err);
            // Stop trying if blocked
            if (setIsPlaying) setIsPlaying(false);
          });
      } else {
        // Older Safari / browsers without Promise
        console.log("Music started (no Promise from play()).");
      }
    } catch (err) {
      console.log("Error calling play():", err);
      if (setIsPlaying) setIsPlaying(false);
    }
  }, [isPlaying, setIsPlaying]);

  // No visible UI here – only the audio element
  return <audio ref={audioRef} preload="auto" playsInline />;
}

export default MusicPlayer;
