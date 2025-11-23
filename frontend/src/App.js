import { useState, useRef, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";

function App() {
  const [gameState, setGameState] = useState("start");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);

  // Audio references
  const audioRef = useRef(null);        // intro music (Friends)
  const finalMusicRef = useRef(null);   // final music (One Dance / etc.)

  // Intro music (Friends)
  const musicUrl =
    "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

  // Final music (One Dance, ou o que você colocou aí)
  const finalMusicUrl =
    "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";

  // Sincroniza volume/mute com os dois players
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
    if (finalMusicRef.current) {
      finalMusicRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  // NÃO vamos mais tentar autoplay só via useEffect.
  // O play precisa ser chamado direto no clique (startGame / handleManualPlay) no mobile.

  const handleManualPlay = () => {
    if (!audioRef.current) return;

    setMusicPlaying(true);
    audioRef.current
      .play()
      .then(() => {
        console.log("Intro music manually started");
        setShowPlayButton(false);
      })
      .catch((err) => {
        console.log("Manual play failed:", err);
      });
  };

  const startGame = () => {
    setGameState("quiz");
    setMusicPlaying(true);

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log("Intro music started on user interaction");
          setShowPlayButton(false);
        })
        .catch((err) => {
          console.log("Mobile blocked autoplay, need manual tap:", err);
          setShowPlayButton(true); // mostra botão "tap to enable music"
        });
    }
  };

  const finishGame = () => {
    setGameState("final");

    // Para intro
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Toca música final
    if (finalMusicRef.current) {
      finalMusicRef.current.currentTime = 0;
      finalMusicRef.current
        .play()
        .then(() => console.log("Final music started"))
        .catch((err) => console.log("Final music blocked:", err));
    }
  };

  const restartGame = () => {
    // Para música final
    if (finalMusicRef.current) {
      finalMusicRef.current.pause();
      finalMusicRef.current.currentTime = 0;
    }

    // Reseta intro
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setMusicPlaying(false);
    setMuted(false);
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
      {/* Intro Music */}
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      {/* Final Music */}
      <audio ref={finalMusicRef} src={finalMusicUrl} preload="auto" />

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
