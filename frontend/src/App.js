import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // Screens: 'start' | 'quiz' | 'final'
  const [gameState, setGameState] = useState("start");

  // Global music state – EXACT same idea as the working site
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const startGame = () => {
    // user taps the "Initialize system" / "START HACKING" button here
    setGameState("quiz");
    setIsMusicPlaying(true); // tells MusicPlayer to start background music
  };

  const finishGame = () => {
    setGameState("final");
    // you can keep music playing or stop it:
    // setIsMusicPlaying(false);
  };

  const restartGame = () => {
    setGameState("start");
    setIsMusicPlaying(false);
  };

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Global background music, just like in the site that works */}
      <MusicPlayer
        isPlaying={isMusicPlaying}
        setIsPlaying={setIsMusicPlaying}
      />

      {gameState === "start" && <StartScreen onStart={startGame} />}

      {gameState === "quiz" && <QuizGame onFinish={finishGame} />}

      {gameState === "final" && (
        <FinalScreen onRestart={restartGame} />
      )}
    </div>
  );
}

export default App;
