import { useRef, useState } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [gameState, setGameState] = useState("start"); // 'start' | 'quiz' | 'final'

  // Referência para controlar o MusicPlayer de fora
  const musicRef = useRef(null);

  // Quando clicar em INITIALIZE SYSTEM
  const startGame = () => {
    // Começa a música de Friends com fade-in
    musicRef.current?.playIntro();
    setGameState("quiz");
  };

  // Quando terminar o quiz (última pergunta correta)
  const finishGame = () => {
    // Troca para One Dance no final, também com fade-in
    musicRef.current?.playFinal();
    setGameState("final");
  };

  // Quando clicar para recomeçar do final
  const restartGame = () => {
    // Se quiser parar a música:
    // musicRef.current?.stop();
    // Ou voltar para o tema de Friends assim que voltar pra tela inicial:
    musicRef.current?.playIntro();
    setGameState("start");
  };

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* 🔊 Player global com Friends + One Dance */}
      <MusicPlayer ref={musicRef} />

      {gameState === "start" && <StartScreen onStart={startGame} />}

      {gameState === "quiz" && <QuizGame onFinish={finishGame} />}

      {gameState === "final" && <FinalScreen onRestart={restartGame} />}
    </div>
  );
}

export default App;
