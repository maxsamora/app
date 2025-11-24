import { useEffect, useRef } from "react";

// 👇 Troque essa URL pelo seu One Dance (Instrumental) ou Friends Theme
// Exemplo Dropbox: "https://www.dropbox.com/s/SEU_ID/one-dance-instrumental.mp3?dl=1"
// Exemplo local:   "/one-dance-instrumental.mp3"
const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";

function MusicPlayer({ isPlaying, setIsPlaying, volume, muted }) {
  const audioRef = useRef(null);

  // Keep volume / mute in sync with the <audio> element
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // React to isPlaying changes (start/stop music),
  // exactly like in your app that already works on mobile.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If should not be playing, just pause
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
            // playing ok
          })
          .catch((err) => {
            console.log("Autoplay blocked or failed:", err);
            // Inform parent if needed
            setIsPlaying(false);
          });
      } else {
        // Old Safari / browsers without promise
        console.log("Music started (no Promise from play()).");
      }
    } catch (err) {
      console.log("Error calling play():", err);
      setIsPlaying(false);
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      playsInline // important for iOS Safari
    />
  );
}

export default MusicPlayer;
