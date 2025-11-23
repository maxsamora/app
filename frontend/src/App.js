import { useState, useEffect } from "react";
import "@/App.css";
import StartScreen from "@/components/StartScreen";
import QuizGame from "@/components/QuizGame";
import FinalReveal from "@/components/FinalReveal";
import MusicPlayer from "@/components/MusicPlayer";
import MatrixRain from "@/components/MatrixRain";

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setIsMusicPlaying(true);
  };

  const finishGame = () => {
    setGameState('finished');
  };

  const restartGame = () => {
    setGameState('start');
    setIsMusicPlaying(false);
  };

  return (
    <div className="App relative min-h-screen overflow-hidden scanline">
      <MatrixRain />
      
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      
      <div className="relative z-10">
        {gameState === 'start' && <StartScreen onStart={startGame} />}
        {gameState === 'playing' && <QuizGame onFinish={finishGame} />}
        {gameState === 'finished' && <FinalReveal onRestart={restartGame} />}
      </div>
    </div>
  );
}

export default App;
