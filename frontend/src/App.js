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
  const audioRef = useRef(null);

  // Convert Dropbox URL to direct download
  const musicUrl = "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?rlkey=xeg21jite7hcf4m5v9osnrr1h&st=8uldm5ew&dl=1";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
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
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0) {
      setMuted(false);
    }
  };

  return (
    <div className="App">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
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
