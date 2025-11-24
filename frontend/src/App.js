import { useState, useRef, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [gameState, setGameState] = useState("start");

  const [volume, setVolume] = useState(0.25);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  // Mantém volume/mute sincronizado
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  // ================================
  //      🔊 PLAY NA STARTSCREEN
  // ================================
  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = muted ? 0 : volume;
    audio.currentTime = 0;

    audio.play()
      .then(() => console.log("Music started."))
      .catch(err => {
        console.log("Autoplay blocked:", err);
        // Vamos tentar no próximo clique se falhar
      });
  };

  const startGame = () => {
    startMusic();   // 🔊 TOCA AQUI NA STARTSCREEN
    setGameState("quiz");
  };

  const finishGame = () => {
    setGameState("final");
  };

  const restartGame = () => {
    setGameState("start");
  };

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  const handleVolumeChange = (v) => {
    const n = typeof v === "number" ? v : parseFloat(v);
    if (!isNaN(n)) {
      setVolume(n);
      if (n > 0) setMuted(false);
    }
  };

  return (
    <div className="App">
      <MusicPlayer audioRef={audioRef} />

      {gameState === "start" && <StartScreen onStart={startGame} />}

      {gameState === "quiz" && (
        <QuizGame
          onFinish={finishGame}
          volume={volume}
          muted={muted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
        />
      )}

      {gameState === "final" && (
        <FinalScreen
          onRestart={restartGame}
          volume={volume}
          muted={muted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
        />
      )}
    </div>
  );
}

export default App;
