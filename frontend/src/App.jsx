import { useState } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [gameState, setGameState] = useState("start");

  const startGame = () => {
    setGameState("quiz");
  };

  const finishGame = () => {
    setGameState("final");
  };

  const restartGame = () => {
    setGameState("start");
  };

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* 🔊 Música global — sempre carregada, usuário decide tocar */}
      <MusicPlayer />

      {gameState === "start" && <StartScreen onStart={startGame} />}
      {gameState === "quiz" && <QuizGame onFinish={finishGame} />}
      {gameState === "final" && <FinalScreen onRestart={restartGame} />}
    </div>
  );
}

export default App;
