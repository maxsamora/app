import { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  // Atualiza o volume sempre que mudar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play/Pause com suporte ao Safari/iPhone
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playing) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.log("Play bloqueado:", err);
        });
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {/* Áudio local — GARANTIDO — /public/onedance.mp3 */}
      <audio
        ref={audioRef}
        src="/onedance.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Botão de som simples */}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "6px",
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            border: "1px solid #00ff85",
            background: "rgba(0,0,0,0.85)",
            color: "#00ff85",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          {playing ? "🔊" : "🔇"}
        </button>

        {playing && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: 100 }}
          />
        )}
      </div>
    </>
  );
}
