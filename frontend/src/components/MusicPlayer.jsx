import { useEffect, useRef, useState } from "react";

// 🔊 Use the SAME Dropbox URL that works in your other site
const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";
// or the Friends theme, if you prefer:
// const MUSIC_URL = "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  // Start with soft background volume (20%)
  const [volume, setVolume] = useState(0.2);
  const [muted, setMuted] = useState(false);

  // keep volume / mute synced with <audio>
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // react to isPlaying changes – THIS is the key part that works on mobile
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.pause();
      return;
    }

    // ensure correct src
    if (audio.src !== MUSIC_URL) {
      audio.src = MUSIC_URL;
    }

    audio.loop = true;

    try {
      const result = audio.play();

      if (result && typeof result.then === "function") {
        result
          .then(() => {
            // music started OK
          })
          .catch((err) => {
            console.log("Autoplay blocked or failed:", err);
            setIsPlaying(false); // stop trying if blocked
          });
      } else {
        // old Safari / browsers
        console.log("Music started (no Promise from play()).");
      }
    } catch (err) {
      console.log("Error calling play():", err);
      setIsPlaying(false);
    }
  }, [isPlaying, setIsPlaying]);

  // SMALL optional debug UI (you can delete if you don't want visible controls)
  const togglePlay = () => setIsPlaying((p) => !p);
  const toggleMute = () => setMuted((m) => !m);

  return (
    <>
      <audio ref={audioRef} preload="auto" playsInline />

      <div
        style={{
          position: "fixed",
          bottom: 12,
          left: 12,
          padding: "6px 10px",
          background: "rgba(0,0,0,0.7)",
          color: "#0f0",
          fontSize: 10,
          borderRadius: 4,
          fontFamily: "monospace",
          display: "flex",
          gap: 6,
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            padding: "2px 6px",
            background: "#0f0",
            color: "#000",
            border: "none",
            borderRadius: 3,
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={toggleMute}
          style={{
            padding: "2px 6px",
            background: "#555",
            color: "#fff",
            border: "none",
            borderRadius: 3,
          }}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </>
  );
}

export default MusicPlayer;
