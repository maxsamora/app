import { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import QuizGame from './components/QuizGame';
import FinalScreen from './components/FinalScreen';

function App() {
  const [gameState, setGameState] = useState('start');
  const [musicPlaying, setMusicPlaying] = useState(false);

  const startGame = () => {
    setGameState('quiz');
    setMusicPlaying(true);
  };

  const finishGame = () => {
    setGameState('final');
  };

  return (
    <div className="App">
      {gameState === 'start' && <StartScreen onStart={startGame} />}
      {gameState === 'quiz' && <QuizGame onFinish={finishGame} musicPlaying={musicPlaying} />}
      {gameState === 'final' && <FinalScreen musicPlaying={musicPlaying} />}
    </div>
  );
}

export default App;
