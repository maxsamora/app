import { useState, useRef, useEffect } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import QuizGame from './components/QuizGame';
import FinalScreen from './components/FinalScreen';

function App() {
  const [gameState, setGameState] = useState('start');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);

  // Audio references
  const audioRef = useRef(null);         // intro music
  const finalMusicRef = useRef(null);    // final music

  // Intro music (Friends)
  const musicUrl =
    "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

  // Final music (A Sky Full Of Stars)
  const finalMusicUrl =
    "https://www.dropbox.com/scl/fi/ircr4kad3uf2y6axnegq2/A-Sky-Full-Of-Stars.mp3?dl=1";

  useEffect(() => {
    // Set volume for both players
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
    if (finalMusicRef.current) finalMusicRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    // Auto-play intro music
    if (audioRef.current && musicPlaying) {
      audioRef.current.play().catch(err => {
        console.log("Audio autoplay blocked:", err);
      });
    }
  }, [musicPlaying]);

  const startGame = () => {
    setGameState('quiz');
    setMusicPlaying(true);
  };

  const finishGame = () => {
    setGameState('final');

    // Stop intro music
    if (audioRef.current) audioRef.current.pause();

    // Play final-score music
    if (finalMusicRef.current) {
      finalMusicRef.current.currentTime = 0;
      finalMusicRef.current.play().catch(err => {
        console.log("Final music blocked:", err);
      });
    }
  };

  const toggleMute = () => setMuted(!muted);

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
      />

      {/* Final Music */}
      <audio
        ref={finalMusicRef}
        src={finalMusicUrl}
        preload="auto"
      />

      {gameState === 'start' && <StartScreen onStart={startGame} />}

      {gameState === 'quiz' && (
        <QuizGame
          onFinish={finishGame}
          musicPlaying={musicPlaying}
          volume={volume}
          muted={muted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
        />
      )}

      {gameState === 'final' && (
        <FinalScreen
          musicPlaying={musicPlaying}
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
