import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

export const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.2); // Softer default volume

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Try to play with user interaction context
        audioRef.current.play().catch(err => {
          console.log("Audio autoplay blocked by browser. User interaction required:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 
        ═══════════════════════════════════════════════════════════════════
        INTRO MUSIC: "One Dance (Instrumental)" by Drake
        ═══════════════════════════════════════════════════════════════════
        
        HOW TO ADD THE INSTRUMENTAL VERSION:
        
        STEP 1 - Obtain the Instrumental Track:
        
        Legal Sources:
        • iTunes/Apple Music - Search "One Dance Instrumental Drake"
        • Amazon Music - Karaoke or instrumental versions
        • Spotify (for Premium users with download)
        • BeatStars - Production instrumental tracks
        • YouTube Music - Official instrumental releases
        • Karaoke platforms (Singa, Smule, Karafun)
        
        STEP 2 - Download & Prepare:
        • Download the MP3 file (instrumental/karaoke version - NO vocals)
        • Recommended quality: 128-192 kbps (smaller file, faster load)
        • Recommended file size: 3-5 MB
        
        STEP 3 - Host Your File:
        
        OPTION A - Dropbox (Recommended - Easiest):
        1. Upload MP3 to Dropbox
        2. Click "Share" → "Create link"
        3. Copy the link and change ?dl=0 to ?dl=1 at the end
        4. Paste URL below in src=""
        
        OPTION B - Local Hosting:
        1. Place MP3 file in: /app/frontend/public/
        2. Rename to: one-dance-instrumental.mp3
        3. Use: src="/one-dance-instrumental.mp3"
        
        OPTION C - Google Drive:
        1. Upload to Google Drive
        2. Right-click → Share → "Anyone with link"
        3. Use format: src="https://drive.google.com/uc?export=download&id=FILE_ID"
        
        ═══════════════════════════════════════════════════════════════════
        CURRENT STATUS: Placeholder track (replace with your file)
        TARGET TRACK: "One Dance (Instrumental)" by Drake - NO VOCALS
        VOLUME: Soft (20%) - automatically balanced for background ambiance
        AUTO-PLAY: Starts when user clicks "START HACKING" button
        LOOP: Continuous playback throughout the game
        ═══════════════════════════════════════════════════════════════════
      */}
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
        // "One Dance (Instrumental)" by Drake - Hosted locally
        src="/one-dance-instrumental.mp3"
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
            <span className="text-xs text-terminal font-mono w-8">{Math.round(volume * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
