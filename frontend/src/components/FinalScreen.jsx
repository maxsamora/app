import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Heart, Instagram, Sparkles, PartyPopper, Volume2, VolumeX } from 'lucide-react';

const FinalScreen = ({ musicPlaying, volume, muted, onToggleMute, onVolumeChange }) => {
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
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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

      <div className="content-wrapper max-w-4xl mx-auto px-6 py-12 text-center">
        {/* Volume Control */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onToggleMute}
            className="p-3 rounded-lg bg-black/70 backdrop-blur-sm border border-purple-500/50 hover:border-purple-500 hover:bg-black/90 transition-all glow-box-purple"
            title={muted ? "Unmute music" : "Mute music"}
          >
            {muted ? (
              <VolumeX className="w-5 h-5 neon-purple" />
            ) : (
              <Volume2 className="w-5 h-5 neon-purple" />
            )}
          </button>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative glow-box rounded-full p-6 bg-black/50 backdrop-blur-sm">
              <PartyPopper className="w-16 h-16 neon-green" />
            </div>
          </div>
        </div>

        {showMessage && (
          <div className="fade-in space-y-8">
            <div>
              <h1 className="text-4xl sm:text-6xl font-bold neon-green mb-4">
                YOU HACKED THE SYSTEM!
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
                <Sparkles className="w-6 h-6 neon-purple" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
              </div>
            </div>

            <div className="glow-box-purple rounded-lg p-8 bg-black/70 backdrop-blur-sm max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Heart className="w-8 h-8 neon-pink fill-current float" />
                  <Heart className="w-12 h-12 neon-pink fill-current float" style={{ animationDelay: '0.5s' }} />
                  <Heart className="w-8 h-8 neon-pink fill-current float" style={{ animationDelay: '1s' }} />
                </div>
                
                <p className="text-2xl sm:text-4xl neon-pink font-bold">
                  It was me — M
                </p>
                
                <div className="text-neon-cyan text-lg font-mono">
                  <p>ACCESS GRANTED TO MY HEART</p>
                  <p className="text-sm mt-2 opacity-75">System breach successful... Love protocol activated...</p>
                </div>
              </div>
            </div>

            {showButton && (
              <div className="fade-in">
                <Button
                  onClick={() => window.open('https://www.instagram.com/maxsamora/', '_blank')}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg px-12 py-6 rounded-lg shadow-lg transform transition-all hover:scale-105"
                  style={{ boxShadow: '0 0 30px rgba(255, 0, 110, 0.5)' }}
                >
                  <Instagram className="w-6 h-6 mr-2" />
                  Visit My Instagram
                </Button>
                <p className="mt-4 text-xs neon-cyan font-mono">
                  Click to see more... or don't. The choice is yours.
                </p>
              </div>
            )}

            <div className="glow-box rounded-lg p-4 bg-black/50 backdrop-blur-sm max-w-xl mx-auto text-left">
              <div className="text-neon-green text-xs font-mono space-y-1">
                <p><span className="neon-cyan">$</span> decrypt heart_lock.dat</p>
                <p className="text-neon-purple">Decryption successful...</p>
                <p><span className="neon-cyan">$</span> cat secret_admirer.txt</p>
                <p className="neon-pink">Maxwell loves Solène ♥</p>
                <p><span className="neon-cyan">$</span> exit</p>
              </div>
            </div>

            <div className="mt-12">
              <div className="glow-box-purple rounded-lg p-8 bg-black/80 backdrop-blur-sm max-w-2xl mx-auto">
                <p className="text-neon-pink text-2xl font-bold mb-6">
                  Happy Birthday Gostosa.
                </p>
                <div className="text-neon-cyan text-base leading-relaxed space-y-4 text-left">
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
              <p className="text-neon-green text-sm font-mono mt-6 opacity-75">
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
