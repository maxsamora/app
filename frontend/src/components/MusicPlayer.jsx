import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "./ui/button";
import { Volume2, VolumeX } from "lucide-react";

// Arquivos locais em /public
const INTRO_SRC = "/friends.mp3";   // Friends theme
const FINAL_SRC = "/onedance.mp3";  // One Dance

const MusicPlayer = forwardRef(function MusicPlayer(_, ref) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  const [baseVolume, setBaseVolume] = useState(0.30);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("intro");

  // 👉 NOVO: Safari bloqueia autoplay
  // Precisamos saber se o áudio AINDA NÃO foi liberado
  const [needsUnlock, setNeedsUnlock] = useState(true);

  // Limpa fades
  const clearFade = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  // Fade-in
  const startFadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();

    const finalVol = muted ? 0 : baseVolume;
    audio.volume = 0;

    const steps = 20;
    let i = 0;

    fadeRef.current = setInterval(() => {
      i++;
      audio.volume = (finalVol * i) / steps;

      if (i >= steps) clearFade();
    }, 80);
  };

  // Tocar track
  const playTrack = (track) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();

    const src = track === "final" ? FINAL_SRC : INTRO_SRC;
    audio.src = src;
    audio.loop = true;
    setCurrentTrack(track);

    return audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setNeedsUnlock(false); // 👍 DESBLOQUEADO!
        startFadeIn();
      })
      .catch((err) => {
        console.log("Autoplay bloqueado:", err);
        setIsPlaying(false);
        setNeedsUnlock(true); // continua pedindo clique
      });
  };

  // Métodos públicos
  useImperativeHandle(ref, () => ({
    playIntro: () => playTrack("intro"),
    playFinal: () => playTrack("final"),
    stop: () => {
      const audio = audioRef.current;
      if (!audio) return;
      clearFade();
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    },
  }));

  // Botão play/pause
  const handleTogglePlay = () => {
    if (!isPlaying) {
      // Primeiro clique → libera Safari
      playTrack(currentTrack);
    } else {
      const audio = audioRef.current;
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Mute
  const toggleMute = () => {
    const audio = audioRef.current;
    setMuted((prev) => {
      const next = !prev;
      if (audio) audio.volume = next ? 0 : baseVolume;
      return next;
    });
  };

  // Slider
  const handleSliderChange = (e) => {
    const v = parseFloat(e.target.value);
    if (Number.isNaN(v)) return;
    setBaseVolume(v);

    const audio = audioRef.current;
    if (audio && !muted) audio.volume = v;
  };

  useEffect(() => {
    return () => clearFade();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <audio ref={audioRef} preload="auto" playsInline />

      {/* BOTÃO PRINCIPAL */}
      <Button
        size="icon"
        variant="outline"
        onClick={handleTogglePlay}
        className="rounded-full bg-black/80 border border-green-400 text-neon-green hover:bg-black hover:border-green-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.7)] transition-all"
      >
        {muted || !isPlaying ? (
          <VolumeX className="w-5 h-5 text-neon-green" />
        ) : (
          <Volume2 className="w-5 h-5 text-neon-green" />
        )}
      </Button>

      {/* ⭐ NOVO TEXTO: "Click here to enable music" */}
      {needsUnlock && (
        <span className="text-[11px] text-neon-cyan animate-pulse font-mono">
          Click here to enable music
        </span>
      )}

      {/* SLIDER — só aparece após música liberada */}
      {!needsUnlock && isPlaying && (
        <div className="hidden sm:flex items-center gap-2 bg-black/70 border border-green-500/60 rounded-full px-3 py-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={baseVolume}
            onChange={handleSliderChange}
            className="w-24 sm:w-32 accent-green-400 cursor-pointer"
          />
          <button
            onClick={toggleMute}
            className="text-[10px] text-neon-green font-mono"
          >
            {muted ? "MUTED" : `${Math.round(baseVolume * 100)}%`}
          </button>
        </div>
      )}
    </div>
  );
});

export default MusicPlayer;
