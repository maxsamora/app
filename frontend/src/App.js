import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // Screens: 'start' | 'quiz' | 'final'
  const [gameState, setGameState] = useState("start");

  // Global music state (same idea as the working site)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);

  // If you still want the "Tap to enable music" button inside QuizGame:
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Called when user clicks the start button on StartScreen
  const startGame = () => {
    setGameState("quiz");
    setMuted(false);
    setIsMusicPlaying(true);      // tells MusicPlayer to start
    setShowPlayButton(false);     // we only show this if autoplay fails
  };

  // Called when QuizGame finishes all questions
  const finishGame = () => {
    setGameState("final");
    // You can keep background music playing or stop it here:
    // setIsMusicPlaying(false);
  };

  // Called when user restarts from FinalScreen
  const restartGame = () => {
    setGameState("start");
    setIsMusicPlaying(false);
    setMuted(false);
    setVolume(0.3);
    setShowPlayButton(false);
  };

  // Mute toggle used in QuizGame / FinalScreen
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  // Volume slider handler used in QuizGame / FinalScreen
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0) {
      setMuted(false);
    }
  };

  // Called when "Tap to enable music" is clicked in QuizGame / FinalScreen
  const handleManualPlay = () => {
    setMuted(false);
    setIsMusicPlaying(true);    // let MusicPlayer try again
    setShowPlayButton(false);
  };

  // If you quiser usar showPlayButton de verdade:
  // você pode fazer o MusicPlayer chamar algo como `onAutoplayBlocked`
  // e aí você faz setShowPlayButton(true). Por enquanto, vamos manter simples.

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Global background music controller, like in the working site */}
      <MusicPlayer
        isPlaying={isMusicPlaying}
        setIsPlaying={setIsMusicPlaying}
        volume={volume}
        muted={muted}
      />

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
