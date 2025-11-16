import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Heart, Terminal } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  const [showSubtext, setShowSubtext] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtext(true), 1000);
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center w-full">
      <div className="scanline"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #00ff41 0px, #00ff41 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 4px'
        }}></div>
      </div>

      <div className="content-wrapper w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12 text-center">
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2 text-neon-green text-xs sm:text-sm">
          <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="font-mono">SYSTEM INITIALIZING...</span>
        </div>

        <div className={`mb-6 sm:mb-8 ${glitchActive ? 'glitch' : ''}`}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 neon-purple leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            F•R•I•E•N•D•S
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold neon-green mb-4 sm:mb-6 leading-tight">
            Secret Admirer Game
          </h2>
        </div>

        {showSubtext && (
          <div className="fade-in space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <div className="glow-box-purple rounded-lg p-4 sm:p-6 bg-black/50 backdrop-blur-sm w-full max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 neon-pink" />
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 neon-pink" />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 neon-pink" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl neon-pink mb-2 sm:mb-3">
                Happy Birthday, Solène Delacourt
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neon-cyan px-2">
                Let's play a little hacker game to find out who sent you these flowers.
              </p>
            </div>

            <div className="glow-box rounded-lg p-4 sm:p-6 bg-black/50 backdrop-blur-sm w-full max-w-2xl mx-auto text-left">
              <div className="flex items-center gap-2 mb-3 sm:mb-4 neon-green">
                <span className="font-mono text-base sm:text-lg">MISSION BRIEFING:</span>
              </div>
              <ul className="space-y-2 text-neon-green text-xs sm:text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="neon-cyan flex-shrink-0">•</span>
                  <span>Answer 10 Friends trivia questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="neon-cyan flex-shrink-0">•</span>
                  <span>Type your answers in the terminal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="neon-cyan flex-shrink-0">•</span>
                  <span>Get hints after 2 wrong attempts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="neon-cyan flex-shrink-0">•</span>
                  <span>Crack the code to reveal your secret admirer</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {showSubtext && (
          <div className="fade-in">
            <Button
              onClick={onStart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-green-500/50 w-full sm:w-auto"
              style={{ boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)' }}
            >
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              INITIALIZE SYSTEM
            </Button>
            <p className="mt-3 sm:mt-4 text-xs text-neon-cyan font-mono px-4">
              Press to start the game
            </p>
          </div>
        )}

        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-6 sm:gap-8 text-neon-green opacity-50">
          <div className="pulse text-lg sm:text-xl">{'<'}</div>
          <div className="pulse text-lg sm:text-xl" style={{ animationDelay: '0.5s' }}>{'/'}</div>
          <div className="pulse text-lg sm:text-xl" style={{ animationDelay: '1s' }}>{'>'}</div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
