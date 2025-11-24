import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Heart, Terminal, Volume2 } from "lucide-react";
import GameShell from "./GameShell";

/**
 * Hook simples de typewriter (escrita lenta)
 */
function useTypewriter(text = "", speed = 70) { // 👈 mais lento (era 45)
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput("");

    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      setOutput((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}

const StartScreen = ({ onStart }) => {
  const [showSubtext, setShowSubtext] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // etapas do texto cinematográfico
  const [cinemaStep, setCinemaStep] = useState(0); // 0..3
  const [cinemaDone, setCinemaDone] = useState(false);

  // typewriter para cada frase (também com speed mais lento)
  const line1 = useTypewriter(
    cinemaStep >= 1 ? "On your birthday night…" : "",
    70
  );
  const line2 = useTypewriter(
    cinemaStep >= 2 ? "A secret admirer is running a little experiment." : "",
    70
  );
  const line3 = useTypewriter(
    cinemaStep >= 3 ? "Tonight, the code will reveal the truth." : "",
    70
  );

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

  // Sequência cinematográfica inicial (mais lenta também)
  useEffect(() => {
    const t1 = setTimeout(() => setCinemaStep(1), 1200);  // antes 800
    const t2 = setTimeout(() => setCinemaStep(2), 4200);  // antes 3500
    const t3 = setTimeout(() => setCinemaStep(3), 7800);  // antes 6500
    const tDone = setTimeout(() => {
      setCinemaDone(true);
    }, 11500); // antes 9000

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tDone);
    };
  }, []);

  return (
    <GameShell background="https://media4.giphy.com/media/3OHA2GuEih6zphHvNI/giphy.gif">
      <div className="scanline" />

      {/* linhas verdes suaves */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #00ff41 0px, #00ff41 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>

      {/* OVERLAY CINEMATOGRÁFICO COM TYPEWRITER */}
      {!cinemaDone && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm z-20">
          <div className="text-center max-w-xl px-6">
            {cinemaStep >= 1 && (
              <p className="cinema-text mb-3 text-base sm:text-2xl">
                {line1}
              </p>
            )}
            {cinemaStep >= 2 && (
              <p className="cinema-text mb-3 text-base sm:text-2xl">
                {line2}
              </p>
            )}
            {cinemaStep >= 3 && (
              <p className="cinema-title text-2xl sm:text-4xl mt-4">
                {line3}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="text-center relative z-10 pt-10 sm:pt-16">
        {/* topo com estado do sistema */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2 text-neon-green text-xs sm:text-sm">
          <Terminal className="w-4 h-4" />
          <span className="font-mono">SYSTEM INITIALIZING...</span>
        </div>

        {/* título principal */}
        <div
          className={`mb-6 sm:mb-8 transition-opacity duration-700 ${
            cinemaDone ? "opacity-100" : "opacity-0"
          } ${glitchActive ? "glitch" : ""}`}
        >
          <h1
            className="
              text-3xl
              sm:text-5xl
              md:text-7xl
              font-bold
              mb-3
              sm:mb-4
              neon-purple
            "
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            F•R•I•E•N•D•S
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold neon-green mb-4 sm:mb-6">
            Secret Admirer Game
          </h2>
        </div>

        {showSubtext && cinemaDone && (
          <div className="fade-in space-y-6 sm:space-y-8 mb-8 sm:mb-12">
            {/* cartinha de aniversário */}
            <div className="glow-box-purple rounded-lg p-4 sm:p-6 bg-black/60 backdrop-blur-sm max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 neon-pink" />
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 neon-pink" />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 neon-pink" />
              </div>
              <p className="text-lg sm:text-xl neon-pink mb-2 sm:mb-3">
                Happy Birthday, Solène Delacour
              </p>
              <p className="text-sm sm:text-base text-neon-cyan">
                Let's play a hacker game and find out who wasted way too many
                hours making this for you. 😄💚{" "}
                <span className="inline-flex items-center gap-1 mt-1">
                  And don&apos;t forget to enable the music with the volume icon at the top.
                  <Volume2 className="w-4 h-4 text-neon-green inline-block" />
                </span>
              </p>
            </div>

            {/* missão */}
            <div className="glow-box rounded-lg p-4 sm:p-6 bg-black/60 backdrop-blur-sm max-w-xl mx-auto text-left">
              <div className="flex items-center gap-2 mb-3 sm:mb-4 neon-green">
                <span className="font-mono text-sm sm:text-lg">
                  MISSION BRIEFING:
                </span>
              </div>
              <ul className="space-y-2 text-neon-green text-xs sm:text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="neon-cyan">•</span>
                  <span>Answer 10 Friends trivia questions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="neon-cyan">•</span>
                  <span>Type your answers in the terminal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="neon-cyan">•</span>
                  <span>Get hints after 2 wrong attempts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="neon-cyan">•</span>
                  <span>Crack the code to reveal your secret admirer.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {showSubtext && cinemaDone && (
          <div className="fade-in">
            <Button
              onClick={onStart}
              className="
                bg-gradient-to-r
                from-green-500
                to-emerald-600
                hover:from-green-600
                hover:to-emerald-700
                text-black
                font-bold
                text-base
                sm:text-lg
                px-8
                sm:px-12
                py-3
                sm:py-5
                rounded-lg
                shadow-lg
                transform
                transition-all
                hover:scale-105
                hover:shadow-green-500/50
              "
              style={{ boxShadow: "0 0 30px rgba(0, 255, 65, 0.5)" }}
            >
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              INITIALIZE SYSTEM
            </Button>
            <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-neon-cyan font-mono">
              Press to start the game
            </p>
          </div>
        )}

        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-6 sm:gap-8 text-neon-green opacity-50 text-lg sm:text-xl">
          <div className="pulse">&lt;</div>
          <div className="pulse" style={{ animationDelay: "0.5s" }}>
            /
          </div>
          <div className="pulse" style={{ animationDelay: "1s" }}>
            &gt;
          </div>
        </div>
      </div>
    </GameShell>
  );
};

export default StartScreen;
