import { useState, useRef, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // Screens: 'start' | 'quiz' | 'final'
  const [gameState, setGameState] = useState("start");

  // Global audio state
  const [volume, setVolume] = useState(0.25); // 25% background
  const [muted, setMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  // We no longer track "isMusicPlaying" – we just call play() directly on clicks
  const audioRef = useRef(null);

  // Your Dropbox music URL (same used in other site)
  const MUSIC_URL =
    "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";
  // Or Friends theme:
  // const MUSIC_URL =
  //   "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

  // Keep volume/mute synced with <audio>
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // ======================
  //  AUDIO CONTROL HELPERS
  // ======================

  const tryPlayAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = muted ? 0 : volume;

    try {
      const res = audio.play();

      if (res && typeof res.then === "function") {
        res
          .then(() => {
            console.log("Audio started successfully");
            setShowPlayButton(false);
          })
          .catch((err) => {
            console.log("Autoplay blocked or failed:", err);
            setShowPlayButton(true); // show "Tap to enable music" in QuizGame
          });
      } else {
        console.log("Audio started (no Promise).");
        setShowPlayButton(false);
      }
    } catch (err) {
      console.log("Error calling play():", err);
      setShowPlayButton(true);
    }
  };

  // ======================
  //     GAME FLOW
  // ======================

  // Called when user clicks INITIALIZE SYSTEM
  const startGame = () => {
    // User gesture happens here → perfect moment to call play()
    setGameState("quiz");
    setMuted(false);
    tryPlayAudio();
  };

  // Called by QuizGame at the end
  const finishGame = () => {
    setGameState("final");
    // If you want, you can change music here later (for now keep same track)
  };

  const restartGame = () => {
    setGameState("start");
    setMuted(false);
    setVolume(0.25);

    // Stop music
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setShowPlayButton(false);
  };

  // Volume & mute handlers used in QuizGame / FinalScreen
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleVolumeChange = (newVolume) => {
    const v = typeof newVolume === "number" ? newVolume : parseFloat(newVolume);
    if (Number.isNaN(v)) return;
    setVolume(v);
    if (v > 0) setMuted(false);
  };

  // Called when the "Tap to enable music" button is pressed in QuizGame
  const handleManualPlay = () => {
    setMuted(false);
    tryPlayAudio();
  };

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Background audio element controlled via ref */}
      <MusicPlayer ref={audioRef} src={MUSIC_URL} />

      {gameState === "start" && <StartScreen onStart={startGame} />}

      {gameState === "quiz" && (
        <QuizGame
          onFinish={finishGame}
          musicPlaying={!!audioRef.current && !audioRef.current.paused}
          volume={volume}
          muted={muted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
          showPlayButton={showPlayButton}
          onManualPlay={handleManualPlay}
        />
      )}

      {gameState === "final" && (
        <FinalScreen
          musicPlaying={!!audioRef.current && !audioRef.current.paused}
          volume={volume}
          muted={muted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
          onRestart={restartGame}
          showPlayButton={showPlayButton}
          onManualPlay={handleManualPlay}
        />
      )}
    </div>
  );
}

export default App;
