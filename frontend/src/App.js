import { useState, useRef, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizGame from "./components/QuizGame";
import FinalScreen from "./components/FinalScreen";

function App() {
  const [gameState, setGameState] = useState("start");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Audio references
  const audioRef = useRef(null);        // intro music
  const finalMusicRef = useRef(null);   // final music

  // Music URLs
  const musicUrl =
    "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

  const finalMusicUrl =
    "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";

  // Sync volume and mute with both players
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
    if (finalMusicRef.current) {
      finalMusicRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  // Manual play button (used mainly on mobile)
  const handleManualPlay = () => {
    if (!audioRef.current) return;

    setMuted(false);
    setMusicPlaying(true);
    audioRef.current.currentTime = 0;

    try {
      const playResult = audioRef.current.play();
      if (playResult && typeof playResult.then === "function") {
        playResult
          .then(() => {
            console.log("Intro music started manually.");
            setShowPlayButton(false);
          })
          .catch((err) => {
            console.log("Manual play failed:", err);
          });
      } else {
        // Older browsers may not return a promise
        console.log("Intro music started manually (no promise).");
        setShowPlayButton(false);
      }
    } catch (err) {
      console.log("Manual play threw an error:", err);
    }
  };

  // Start game from StartScreen
  const startGame = () => {
    // User gesture happens here
    setMuted(false);
    setMusicPlaying(true);

    // ALWAYS go to quiz screen, even if audio fails
    setGameState("quiz");

    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;

    try {
      const playResult = audioRef.current.play();

      if (playResult && typeof playResult.then === "function") {
        playResult
          .then(() => {
            console.log("Intro music started on user interaction.");
            setShowPlayButton(false);
          })
          .catch((err) => {
            console.log(
              "Autoplay blocked or failed, showing manual play button.",
              err
            );
            setShowPlayButton(true);
          });
      } else {
        // Older Safari / browsers that don't return a promise
        console.log("Intro music started on user interaction (no promise).");
        setShowPlayButton(false);
      }
    } catch (err) {
      console.log(
        "Intro music play threw an error, showing manual play button.",
        err
      );
      setShowPlayButton(true);
    }
  };

  // After finishing all quiz questions
  const finishGame = () => {
    setGameState("final");

    // Stop intro music
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Play final music
    if (finalMusicRef.current) {
      finalMusicRef.current.currentTime = 0;

      try {
        const playResult = finalMusicRef.current.play();

        if (playResult && typeof playResult.then === "function") {
          playResult
            .then(() => console.log("Final music started."))
            .catch((err) => console.log("Final music blocked:", err));
        } else {
          console.log("Final music started (no promise).");
        }
      } catch (err) {
        console.log("Final music play threw an error:", err);
      }
    }
  };

  // Restart whole game
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
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        playsInline   // important for Safari mobile
      />

      {/* Final Music */}
      <audio
        ref={finalMusicRef}
        src={finalMusicUrl}
        preload="auto"
        playsInline
      />

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
