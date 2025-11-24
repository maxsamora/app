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
  const [volume, setVolume] = useState(0.25); // 25% (background suave)
  const [muted, setMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Ref para o <audio> dentro do MusicPlayer
  const audioRef = useRef(null);

  // Mantém volume/mute sincronizado com o elemento <audio>
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // ========= FUNÇÃO CENTRAL PARA TOCAR O ÁUDIO =========
  const tryPlayAudio = () => {
    const audio = audioRef.current;
    if (!audio) {
      console.log("No audio element yet");
      return;
    }

    // Garante que estamos no começo (opcional)
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
            setShowPlayButton(true); // mostra botão "Tap to enable music" no quiz
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

  // Quando clica em INITIALIZE SYSTEM
  const startGame = () => {
    // O clique do usuário acontece AQUI → melhor momento para tentar play()
    setGameState("quiz");
    setMuted(false);
    tryPlayAudio();
  };

  // Quando termina o quiz
  const finishGame = () => {
    setGameState("final");
    // Se quiser parar música no final, descomente:
    // if (audioRef.current) audioRef.current.pause();
  };

  // Quando reinicia do final
  const restartGame = () => {
    setGameState("start");
    setMuted(false);
    setVolume(0.25);
    setShowPlayButton(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Handlers de mute/volume usados no QuizGame e FinalScreen
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleVolumeChange = (newVolume) => {
    const v =
      typeof newVolume === "number" ? newVolume : parseFloat(newVolume);
    if (Number.isNaN(v)) return;
    setVolume(v);
    if (v > 0) setMuted(false);
  };

  // Botão "Tap to enable music" no QuizGame/Final
  const handleManualPlay = () => {
    setMuted(false);
    tryPlayAudio();
  };

  const isMusicPlaying =
    !!audioRef.current && audioRef.current.paused === false;

  return (
    <div className="App relative min-h-screen overflow-hidden">
      {/* Único elemento <audio> global, com controls para debug */}
      <MusicPlayer audioRef={audioRef} />

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
