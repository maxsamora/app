import { useState, useRef, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // Screens: 'start' | 'quiz' | 'final'
  const [gameState, setGameState] = useState("start");

  // Audio state
  const [volume, setVolume] = useState(0.25); // 25% background
  const [muted, setMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Ref to the <audio> element inside MusicPlayer
  const audioRef = useRef(null);

  // Keep volume/mute synced with <audio>
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Helper: try to start audio playback
  const tryPlayAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Guarantee we start from the beginning (optional)
    if (audio.currentTime === 0 || audio.paused) {
      audio.currentTime = 0;
    }

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
            // Safari may block even after click → show fallback button in quiz
            setShowPlayButton(true);
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
  //       GAME FLOW
  // ======================

  // Called when user clicks INITIALIZE SYSTEM
  const startGame = () => {
    // User gesture happens right here → perfect for Safari
    setGameState("quiz");
    setMuted(false);
    tryPlayAudio();
  };

  // Called by QuizGame when all questions are done
  const finishGame = () => {
    setGameState("final");
    // If you want to stop music at the end, uncomment:
    // if (audioRef.current) {
    //   audioRef.current.pause();
    // }
  };

  // Called when user restarts from FinalScreen
  const restartGame = () => {
    setGameState("start");
    setMuted(false);
    setVolume(0.25);
    setShowPlayButton(false);

    // Stop and reset audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Volume & mute handlers used by QuizGame / FinalScreen
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleVolumeChange = (newVolume) => {
    const v =
      typeof newVolume === "number" ? newVolume : parseFloat(newVolume);
    if (Number.isNaN(v)) return;
    setVolume(v);
    if (v > 0) {
      setMuted(false);
    }
  };

  // Called by "Tap to enable music" button in QuizGame / FinalScreen
  const handleManualPlay = () => {
    setMuted(false);
    tryPlayAudio();
  };

  const isMusicPlaying =
    !!audioRef.current && audioRef.current.paused === false;

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Single global audio element controlled via ref */}
      <MusicPlayer ref={audioRef} />

      {gameState === "start" && <StartScreen onStart={startGame} />}

      {gameState === "quiz" && (
        <QuizGame
          onFinish={finishGame}
          musicPlaying={isMusicPlaying}
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
          musicPlaying={isMusicPlaying}
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
