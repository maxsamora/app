import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Heart, Terminal } from "lucide-react";
import GameShell from "./GameShell";

const StartScreen = ({ onStart }) => {
  const [showSubtext, setShowSubtext] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [startPressed, setStartPressed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtext(true), 900);

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  const handleStart = () => {
    setStartPressed(true);
    setTimeout(() => onStart(), 700);
  };

  return (
    <GameShell
      fadeMode={startPressed ? "out" : "none"}
      backgroundImage="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW1xZzhzMnB6YmM0Y3F5dnZjczUxbnJkeG14MXcwZzRkbm9yajlyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3OHA2GuEih6zphHvNI/giphy.gif"
    >
      <div className="content-wrapper max-w-4xl mx-auto px-6 py-12 text-center">

        <div className="mb-8 flex items-center justify-center gap-2 text-neon-green text-sm">
          <Terminal className="w-4 h-4" />
          <span className="font-mono typewriter">SYSTEM INITIALIZING...</span>
        </div>

        <div className={`mb-8 ${glitchActive ? "glitch" : ""}`}>
          <h1
            className="text-5xl sm:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="gradient-text">F•R•I•E•N•D•S</span>
          </h1>
          <h2 className="text-3xl sm:text-5xl font-bold neon-green mb-6 intro-subtitle">
            Secret Admirer Game
          </h2>
        </div>

        {showSubtext && (
          <div className="fade-in space-y-6 mb-12">
            <div className="glow-box-purple rounded-lg p-6 bg-black/60 backdrop-blur-sm max-w-2xl mx-auto intro-reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-6 h-6 neon-pink" />
                <Heart className="w-8 h-8 neon-pink" />
                <Heart className="w-6 h-6 neon-pink" />
              </div>
              <p className="text-xl sm:text-2xl neon-pink mb-3">
                Happy Birthday, Solène Delacour
              </p>
              <p className="text-base sm:text-lg text-neon-cyan">
                Let's play a little hacker game to find out who sent you these flowers 🌹
              </p>
            </div>

            <div className="glow-box rounded-lg p-6 bg-black/60 backdrop-blur-sm max-w-2xl mx-auto text-left intro-reveal-delayed">
              <span className="font-mono text-lg neon-green mb-4">MISSION BRIEFING:</span>
              <ul className="space-y-2 text-neon-green text-sm sm:text-base">
                <li>• Answer 10 Friends trivia questions</li>
                <li>• Type your answers in the terminal</li>
                <li>• Get hints after 2 wrong attempts</li>
                <li>• Crack the final code to reveal your secret admirer</li>
              </ul>
            </div>
          </div>
        )}

        {showSubtext && (
          <div className="fade-in">
            <Button
              onClick={handleStart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 text-black font-bold text-lg px-12 py-6 rounded-lg shadow-lg"
            >
              <Terminal className="w-5 h-5 mr-2" />
              INITIALIZE SYSTEM
            </Button>
            <p className="mt-4 text-xs text-neon-cyan font-mono">
              Press to start the game
            </p>
          </div>
        )}

      </div>
    </GameShell>
  );
};

export default StartScreen;
