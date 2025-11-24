import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

// MusicPlayer shows a mute/unmute button in the top-right corner
// and controls background music globally.
export const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.2); // softer default volume

  // Start / pause music when isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => {
          console.log(
            "Audio autoplay blocked by browser. User interaction required:",
            err
          );
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Update volume on <audio>
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 
        IMPORTANT: The file must exist in /public with this exact name:
        /public/one-dance-instrumental.mp3
        And will be served as: src="/one-dance-instrumental.mp3"
      */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/one-dance-instrumental.mp3" // <-- adjust name if needed
      />

      <div className="flex items-center gap-2 terminal-border rounded-lg p-2 bg-background/90 backdrop-blur-sm hover:bg-background/95 transition-colors">
        <Button
          onClick={toggleMusic}
          size="sm"
          variant="ghost"
          className="text-terminal hover:text-accent hover:bg-accent/10 transition-colors"
          title={isPlaying ? "Mute music" : "Unmute music"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </Button>

        {isPlaying && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Vol:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-primary cursor-pointer"
              title="Adjust volume"
            />
            <span className="text-xs text-terminal font-mono w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
