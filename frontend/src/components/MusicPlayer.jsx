import { useEffect, useRef } from "react";

// Use the SAME Dropbox URL that works in your other site
const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";
// Or Friends theme, if you prefer:
// const MUSIC_URL = "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  // Set a soft background volume once (20%)
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.2;
  }, []);

  // React to isPlaying changes – this is what works on mobile/Safari
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If we shouldn't be playing, pause and exit
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
      const result = audio.play();

      if (result && typeof result.then === "function") {
        result
          .then(() => {
            // Music started successfully
            // no extra action needed
          })
          .catch((err) => {
            console.log("Autoplay blocked or failed:", err);
            // Stop trying if blocked
            setIsPlaying(false);
          });
      } else {
        // Older Safari / browsers without Promise
        console.log("Music started (no Promise from play()).");
      }
    } catch (err) {
      console.log("Error calling play():", err);
      setIsPlaying(false);
    }
  }, [isPlaying, setIsPlaying]);

  // No visible UI here – just the audio element
  return <audio ref={audioRef} preload="auto" playsInline />;
}

export default MusicPlayer;
