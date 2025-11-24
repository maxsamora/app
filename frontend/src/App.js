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
  const audioRef = useRef(null);        
  const finalMusicRef = useRef(null);   

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

  // Manual play button (Safari mobile)
  const handleManualPlay = () => {
    if (!audioRef.current) return;

    setMuted(false);
    setMusicPlaying(true);

    audioRef.current.currentTime = 0;

    audioRef.current
      .play()
      .then(() => {
        console.log("Intro music started manually.");
        setShowPlayButton(false);
      })
      .catch((err) => {
        console.log("Manual play failed:", err);
      });
  };

  // Start game from StartScreen
  const startGame = () => {
    // User gesture happens here
    setMuted(false);
    setMusicPlaying(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;

      audioRef.current
        .play()
        .then(() => {
          console.log("Intro music started on user interaction.");
          setShowPlayButton(false);
          setGameState("quiz");
        })
        .catch((err) => {
          console.log("Autoplay blocked on mobile. Need manual tap.", err);
          setShowPlayButton(true); 
          setGameState("quiz");
        });
    } else {
      setGameState("quiz");
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

      finalMusicRef.current
        .play()
        .then(() => console.log("Final music started."))
        .catch((err) => console.log("Final music blocked:", err));
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
        playsInline   // Required for Safari mobile
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
