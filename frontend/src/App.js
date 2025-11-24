import { useState } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // Screens: 'start' | 'quiz' | 'final'
  const [gameState, setGameState] = useState("start");

  // Global music toggle for MusicPlayer
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // When user clicks INITIALIZE SYSTEM
  const startGame = () => {
    setGameState("quiz");
    // If you want music to start automatically when game starts, uncomment:
    // setIsMusicPlaying(true);
  };

  // When quiz is finished
  const finishGame = () => {
    setGameState("final");
  };

  // When restarting from final screen
  const restartGame = () => {
    setGameState("start");
    // If you want to stop music on restart:
    // setIsMusicPlaying(false);
  };

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Global music control, visible on ALL screens */}
      <MusicPlayer
        isPlaying={isMusicPlaying}
        setIsPlaying={setIsMusicPlaying}
      />

      {gameState === "start" && <StartScreen onStart={startGame} />}

      {gameState === "quiz" && (
        <QuizGame
          onFinish={finishGame}
          // you can pass isMusicPlaying/volume props if you need,
          // but right now MusicPlayer already controls everything globally
        />
      )}

      {gameState === "final" && <FinalScreen onRestart={restartGame} />}
    </div>
  );
}

export default App;
