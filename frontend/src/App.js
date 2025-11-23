import { useState, useRef, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";

function App() {
  const [gameState, setGameState] = useState("start");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(true); // começa mutado
  const [showPlayButton, setShowPlayButton] = useState(false);

  const audioRef = useRef(null);
  const finalMusicRef = useRef(null);

  const musicUrl =
    "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";
  const finalMusicUrl =
    "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";

  // Sincroniza volume/mute
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
    if (finalMusicRef.current) finalMusicRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const handleManualPlay = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    audioRef.current
      .play()
      .then(() => {
        setMusicPlaying(true);
        setMuted(false);
        setShowPlayButton(false);
      })
      .catch((err) => console.log("Manual play failed:", err));
  };

  const startGame = () => {
    setGameState("quiz");

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setMusicPlaying(true);
          setMuted(false);
        })
        .catch(() => {
          setShowPlayButton(true); // mostra botão no mobile
        });
    }
  };

  const finishGame = () => {
    setGameState("final");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (finalMusicRef.current) {
      finalMusicRef.current.currentTime = 0;
      finalMusicRef.current
        .play()
        .then(() => console.log("Final music started"))
        .catch(() => setShowPlayButton(true));
    }
  };

  const restartGame = () => {
    if (finalMusicRef.current) {
      finalMusicRef.current.pause();
      finalMusicRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setMusicPlaying(false);
    setMuted(true);
    setVolume(0.3);
    setShowPlayButton(false);
    setGameState("start");
  };

  const toggleMute = () => setMuted((prev) => !prev);
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0) setMuted(false);
  };

  return (
    <div className="App">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" muted />
      <audio ref={finalMusicRef} src={finalMusicUrl} preload="auto" muted />

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
