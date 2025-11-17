import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Heart, Instagram, Sparkles, PartyPopper, Volume2, VolumeX, Play } from 'lucide-react';

const FinalScreen = ({ musicPlaying, volume, muted, onToggleMute, onVolumeChange, showPlayButton, onManualPlay }) => {
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => setShowMessage(true), 1000);
    const buttonTimer = setTimeout(() => setShowButton(true), 2000);

    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        size: 20 + Math.random() * 20
      };
      setHearts(prev => [...prev, newHeart]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 4000);
    }, 300);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(buttonTimer);
      clearInterval(heartInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden w-full flex items-center justify-center">
      <div className="scanline"></div>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(176, 38, 255, 0.1) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
      </div>

      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`
          }}
        >
          <Heart className="fill-current" />
        </div>
      ))}

      <div className="content-wrapper w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12 text-center overflow-y-auto max-h-screen">
        {/* Volume Control & Manual Play Button */}
        <div className="flex justify-end gap-2 mb-3 sm:mb-4">
          {showPlayButton && (
            <button
              onClick={onManualPlay}
              className="p-2 sm:p-3 rounded-lg bg-purple-600 hover:bg-purple-700 backdrop-blur-sm border border-purple-500 transition-all glow-box-purple animate-pulse"
              title="Tap to play music"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          )}
          <button
            onClick={onToggleMute}
            className="p-2 sm:p-3 rounded-lg bg-black/70 backdrop-blur-sm border border-purple-500/50 hover:border-purple-500 hover:bg-black/90 transition-all glow-box-purple"
            title={muted ? "Unmute music" : "Mute music"}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 neon-purple" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 neon-purple" />
            )}
          </button>
        </div>

        {/* Success icon */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative glow-box rounded-full p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
              <PartyPopper className="w-12 h-12 sm:w-16 sm:h-16 neon-green" />
            </div>
          </div>
        </div>

        {/* Success message */}
        {showMessage && (
          <div className="fade-in space-y-6 sm:space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold neon-green mb-3 sm:mb-4 leading-tight px-2">
                YOU HACKED THE SYSTEM!
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 neon-purple" />
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
              </div>
            </div>

            {/* Reveal message */}
            <div className="glow-box-purple rounded-lg p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm w-full max-w-2xl mx-auto">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 neon-pink fill-current float" />
                  <Heart className="w-8 h-8 sm:w-12 sm:h-12 neon-pink fill-current float" style={{ animationDelay: '0.5s' }} />
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 neon-pink fill-current float" style={{ animationDelay: '1s' }} />
                </div>
                
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl neon-pink font-bold px-2">
                  It was me — Maxwell
                </p>
                
                <div className="text-neon-cyan text-base sm:text-lg font-mono px-2">
                  <p>ACCESS GRANTED TO MY HEART</p>
                  <p className="text-xs sm:text-sm mt-2 opacity-75">System breach successful... Love protocol activated...</p>
                </div>
              </div>
            </div>

            {/* Instagram button */}
            {showButton && (
              <div className="fade-in px-4">
                <Button
                  onClick={() => window.open('https://instagram.com/maxwellofficial', '_blank')}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-lg shadow-lg transform transition-all hover:scale-105 w-full sm:w-auto"
                  style={{ boxShadow: '0 0 30px rgba(255, 0, 110, 0.5)' }}
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Visit My Instagram
                </Button>
                <p className="mt-3 sm:mt-4 text-xs text-neon-cyan font-mono px-2">
                  Click to see more... or don't. The choice is yours.
                </p>
              </div>
            )}

            {/* Decorative terminal output */}
            <div className="glow-box rounded-lg p-3 sm:p-4 bg-black/50 backdrop-blur-sm w-full max-w-xl mx-auto text-left overflow-x-auto">
              <div className="text-neon-green text-xs font-mono space-y-1">
                <p><span className="neon-cyan">$</span> decrypt heart_lock.dat</p>
                <p className="text-neon-purple">Decryption successful...</p>
                <p><span className="neon-cyan">$</span> cat secret_admirer.txt</p>
                <p className="neon-pink">Maxwell loves Solène ♥</p>
                <p><span className="neon-cyan">$</span> exit</p>
              </div>
            </div>

            {/* Heartfelt message */}
            <div className="mt-8 sm:mt-12">
              <div className="glow-box-purple rounded-lg p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm w-full max-w-2xl mx-auto">
                <p className="text-lg sm:text-xl md:text-2xl text-neon-pink font-bold mb-4 sm:mb-6">
                  Happy Birthday Gostosa.
                </p>
                <div className="text-neon-cyan text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 text-left px-2">
                  <p>
                    Thank you for being there when I needed someone the most, I'll never forget the strength and warmth you gave me.
                  </p>
                  <p>
                    If life ever feels heavy, please don't give up. You have a beautiful soul, and the world is softer because you're in it.
                  </p>
                  <p className="text-neon-pink">
                    I still care about you… more than you know.
                  </p>
                </div>
              </div>
              <p className="text-neon-green text-xs sm:text-sm font-mono mt-4 sm:mt-6 opacity-75 px-4">
                Hope you enjoyed this little game ♥
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalScreen;
