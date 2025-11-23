// MusicPlayer.js
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Autoplay bloqueado. Interação do usuário necessária:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggleMusic = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <audio ref={audioRef} loop preload="auto" src="/one-dance-instrumental.mp3" />
      <Button onClick={toggleMusic} size="sm" variant="ghost">
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </Button>
      {isPlaying && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 cursor-pointer"
        />
      )}
    </div>
  );
};

export default MusicPlayer;
