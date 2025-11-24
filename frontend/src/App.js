import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // Screens: 'start' | 'quiz' | 'final'
  const [gameState, setGameState] = useState("start");

  // Global music state (shared with MusicPlayer)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);

  // --- FLOW ---

  // Called when user clicks "INITIALIZE SYSTEM" on StartScreen
  const startGame = () => {
    // User gesture happens here → Safari permite play()
    setGameState("quiz");
    setMuted(false);
    setIsMusicPlaying(true); // avisa o MusicPlayer pra começar a tocar
  };

  // Called when QuizGame finishes all questions
  const finishGame = () => {
    setGameState("final");
    // Se quiser parar a música no final:
    // setIsMusicPlaying(false);
  };

  // Called when user restarts from FinalScreen
  const restartGame = () => {
    setGameState("start");
    setIsMusicPlaying(false);
    setMuted(false);
    setVolume(0.3);
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

  // Caso você use um botão "Tap to enable music" no QuizGame
  const handleManualPlay = () => {
    setMuted(false);
    setIsMusicPlaying(true);
  };

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Global background music controller */}
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
          showPlayButton={false}      // se quiser usar, depois podemos ativar
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
          showPlayButton={false}
          onManualPlay={handleManualPlay}
        />
      )}
    </div>
  );
}

export default App;
