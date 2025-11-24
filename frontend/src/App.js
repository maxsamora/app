import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [gameState, setGameState] = useState("start"); // 'start' | 'quiz' | 'final'

  // Global music state
  const [musicTrack, setMusicTrack] = useState("none"); // 'none' | 'intro' | 'final'
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false); // "Tap to enable music" flag

  // Called when the user clicks the Start button on StartScreen
  const startGame = () => {
    // user gesture happens here
    setGameState("quiz");

    setMuted(false);
    setMusicTrack("intro");   // Friends theme
    setMusicPlaying(true);    // let MusicPlayer try to play
    setShowPlayButton(false); // MusicPlayer will set true if autoplay is blocked
  };

  // Called when the quiz is completed
  const finishGame = () => {
    setGameState("final");

    // switch to final track
    setMusicTrack("final");   // One Dance (or whatever you set in MusicPlayer)
    setMusicPlaying(true);
    setMuted(false);
  };

  // Called when the game is restarted from the final screen
  const restartGame = () => {
    setGameState("start");

    setMusicTrack("none");
    setMusicPlaying(false);
    setMuted(false);
    setVolume(0.3);
    setShowPlayButton(false);
  };

  // Toggle mute state (used by QuizGame / FinalScreen)
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  // Volume slider handler (QuizGame / FinalScreen)
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0) {
      setMuted(false);
    }
  };

  // Called by MusicPlayer when autoplay is blocked (typical on mobile Safari)
  const handleAutoplayBlocked = () => {
    setShowPlayButton(true); // QuizGame can show "Tap to enable music 🔊"
    setMusicPlaying(false);
  };

  // Manual play triggered from QuizGame / FinalScreen "Tap to enable music" button
  const handleManualPlay = () => {
    // Just tell MusicPlayer to start again
    setMuted(false);
    setMusicPlaying(true);
    setShowPlayButton(false);
  };

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Global background music controller (no UI here, just logic) */}
      <MusicPlayer
        track={musicTrack}              // 'none' | 'intro' | 'final'
        playing={musicPlaying}          // boolean
        volume={volume}                 // 0–1
        muted={muted}                   // boolean
        onAutoplayBlocked={handleAutoplayBlocked}
      />

      {/* Screens */}
      {gameState === "start" && <StartScreen onStart={startGame} />}

      {gameState === "quiz" && (
        <QuizGame
          onFinish={finishGame}
          musicPlaying={musicPlaying}
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
          musicPlaying={musicPlaying}
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
