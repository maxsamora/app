import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Heart,
  Instagram,
  Sparkles,
  PartyPopper,
  Volume2,
  VolumeX,
  RotateCcw,
} from "lucide-react";
import GameShell from "./GameShell";

// ✅ Your real data here
const CORRECT_ANSWERS = {
  fullName: "maxwell samora ferreira",
  currentCountry: "australia",
  originCountry: "brazil",
  nephews: 2, // you have 2 nephews
  siblings: 3, // you have 3 siblings
};

const QUIZ_STEPS = [
  {
    key: "fullName",
    question: "What is my full name?",
    placeholder: "Type my full name here...",
    type: "text",
  },
  {
    key: "currentCountry",
    question: "Which country do I live in now?",
    placeholder: "Country where I live now",
    type: "text",
  },
  {
    key: "originCountry",
    question: "What is my country of origin?",
    placeholder: "My home country",
    type: "text",
  },
  {
    key: "nephews",
    question: "How many nephews do I have?",
    placeholder: "Number of nephews",
    type: "number",
  },
  {
    key: "siblings",
    question: "How many siblings do I have?",
    placeholder: "Number of siblings",
    type: "number",
  },
];

const FinalScreen = ({
  musicPlaying,
  volume,
  muted,
  onToggleMute,
  onVolumeChange,
  onRestart,
}) => {
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Quiz / CTF state
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [quizError, setQuizError] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false); // ✅ after she passes once

  useEffect(() => {
    const msgTimer = setTimeout(() => setShowMessage(true), 1000);
    const btnTimer = setTimeout(() => setShowButton(true), 2000);

    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        size: 18 + Math.random() * 24,
        duration: 3 + Math.random() * 2,
      };
      setHearts((prev) => {
        const next = [...prev, newHeart];
        if (next.length > 35) next.shift();
        return next;
      });
    }, 280);

    return () => {
      clearTimeout(msgTimer);
      clearTimeout(btnTimer);
      clearInterval(heartInterval);
    };
  }, []);

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!Number.isNaN(value)) onVolumeChange?.(value);
  };

  const openInstagram = () => {
    const url = "https://www.instagram.com/maxsamora/";
    const win = window.open(url, "_blank", "noopener");
    if (!win) {
      alert(`If the page didn't open, tap this link:\n${url}`);
    }
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentStepIndex(0);
    setCurrentAnswer("");
    setQuizError("");
  };

  const validateAnswer = (stepKey, answerRaw) => {
    const answer = answerRaw.trim().toLowerCase();

    switch (stepKey) {
      case "fullName":
        return answer === CORRECT_ANSWERS.fullName;
      case "currentCountry":
        return (
          answer === CORRECT_ANSWERS.currentCountry ||
          answer === `the ${CORRECT_ANSWERS.currentCountry}`
        );
      case "originCountry":
        return answer === CORRECT_ANSWERS.originCountry;
      case "nephews": {
        const num = Number(answer);
        return !Number.isNaN(num) && num === CORRECT_ANSWERS.nephews;
      }
      case "siblings": {
        const num = Number(answer);
        return !Number.isNaN(num) && num === CORRECT_ANSWERS.siblings;
      }
      default:
        return false;
    }
  };

  const handleQuizNext = () => {
    const step = QUIZ_STEPS[currentStepIndex];
    if (!step) return;

    if (!currentAnswer.trim()) {
      setQuizError("You need to type something.");
      return;
    }

    const isCorrect = validateAnswer(step.key, currentAnswer);
    if (!isCorrect) {
      setQuizError("Incorrect answer. Try again…");
      return;
    }

    // Correct answer
    if (currentStepIndex === QUIZ_STEPS.length - 1) {
      // Last question completed
      setQuizCompleted(true);
      setShowQuiz(false);
      setQuizError("");
      setCurrentAnswer("");
      setCurrentStepIndex(0);

      // small delay before opening IG
      setTimeout(() => {
        openInstagram();
      }, 300);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
      setCurrentAnswer("");
      setQuizError("");
    }
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
    setCurrentStepIndex(0);
    setCurrentAnswer("");
    setQuizError("");
  };

  const handleRestart = () => {
    if (typeof onRestart === "function") {
      onRestart();
    }
  };

  const currentStep = QUIZ_STEPS[currentStepIndex];

  return (
    <GameShell
      fadeMode="in"
      backgroundImage="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW1xZzhzMnB6YmM0Y3F5dnZjczUxbnJkeG14MXcwZzRkbm9yajlyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3OHA2GuEih6zphHvNI/giphy.gif"
    >
      {/* QUIZ MODAL (Capture the Heart) */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center fade-in">
          <div className="bg-black/85 border border-purple-500/60 rounded-xl p-8 max-w-md w-full glow-box-purple text-center">
            <h2 className="text-neon-green text-2xl font-bold mb-2">
              You thought it would be easy?
            </h2>
            <p className="text-neon-cyan text-xs sm:text-sm mb-4">
              Let&apos;s see how well you actually know me…
            </p>

            <div className="text-left mb-4">
              <p className="text-neon-pink text-sm font-mono mb-1">
                Question {currentStepIndex + 1} of {QUIZ_STEPS.length}
              </p>
              <p className="text-neon-green text-base sm:text-lg font-semibold">
                {currentStep?.question}
              </p>
            </div>

            <input
              type={currentStep?.type === "number" ? "number" : "text"}
              value={currentAnswer}
              onChange={(e) => {
                setCurrentAnswer(e.target.value);
                setQuizError("");
              }}
              placeholder={currentStep?.placeholder}
              className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/60 text-neon-green placeholder-neon-cyan text-sm mb-3"
            />

            {quizError && (
              <p className="text-red-400 text-xs mb-3 animate-pulse">
                {quizError}
              </p>
            )}

            <div className="flex items-center justify-center gap-4 mt-2">
              <Button
                onClick={handleQuizNext}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold px-6 py-2 text-sm"
              >
                {currentStepIndex === QUIZ_STEPS.length - 1
                  ? "Unlock Access"
                  : "Next"}
              </Button>
              <Button
                onClick={handleQuizClose}
                className="bg-red-600/80 text-white font-bold px-6 py-2 text-sm"
              >
                Cancel
              </Button>
            </div>

            <p className="mt-4 text-[11px] text-neon-cyan/70 font-mono">
              This is your little Capture The Heart challenge ♥
            </p>
          </div>
        </div>
      )}

      {/* FLOATING HEARTS */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart pointer-events-none"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          <Heart className="fill-current neon-pink" />
        </div>
      ))}

      {/* MAIN CONTENT */}
      <div className="content-wrapper relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
        {/* Volume control */}
        <div className="flex justify-end items-center gap-3 mb-4">
          <button
            onClick={onToggleMute}
            className="p-3 rounded-lg bg-black/70 backdrop-blur-sm border border-purple-500/50 hover:border-purple-500 hover:bg-black/90 transition-all"
            title={muted ? "Unmute music" : "Mute music"}
          >
            {muted ? (
              <VolumeX className="w-5 h-5 neon-purple" />
            ) : (
              <Volume2 className="w-5 h-5 neon-purple" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 sm:w-32 accent-purple-500 cursor-pointer"
          />
        </div>

        {/* Celebration icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/25 rounded-full blur-3xl animate-pulse" />
            <div className="relative rounded-full p-6 bg-black/70 backdrop-blur-sm border border-neon-green/40">
              <PartyPopper className="w-16 h-16 neon-green" />
            </div>
          </div>
        </div>

        {/* Main message */}
        {showMessage && (
          <div className="fade-in space-y-10">
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold neon-green mb-4 leading-tight">
                YOU HACKED THE SYSTEM!
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-purple-500" />
                <Sparkles className="w-6 h-6 neon-purple" />
                <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
            </div>

            <div className="glow-box-purple rounded-xl p-6 sm:p-8 bg-black/80 backdrop-blur-md max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Heart className="w-7 h-7 neon-pink fill-current float" />
                  <Heart
                    className="w-11 h-11 neon-pink fill-current float"
                    style={{ animationDelay: "0.4s" }}
                  />
                <Heart
                    className="w-7 h-7 neon-pink fill-current float"
                    style={{ animationDelay: "0.8s" }}
                  />
                </div>

                <p className="text-2xl sm:text-4xl neon-pink font-bold tracking-wide">
                  It was me — *******
                </p>

                <div className="text-neon-cyan text-sm sm:text-lg font-mono space-y-1">
                  <p>ACCESS GRANTED TO MY HEART</p>
                  <p className="text-xs sm:text-sm mt-1 opacity-75">
                    System breach successful... love protocol is now running in the background.
                  </p>
                </div>
              </div>
            </div>

            {/* Instagram / CTF button */}
            {showButton && (
              <div className="fade-in">
                <Button
                  onClick={quizCompleted ? openInstagram : startQuiz}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg px-10 sm:px-12 py-4 sm:py-5 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-pink-500/50"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Visit My Instagram
                </Button>

                {!quizCompleted ? (
                  <p className="mt-3 text-xs neon-cyan font-mono opacity-80">
                    First, prove how well you know me.
                  </p>
                ) : (
                  <div className="mt-4 text-xs neon-cyan font-mono space-y-1">
                    <p className="opacity-80">Access already unlocked.</p>
                    <p className="text-neon-green">
                      FLAG&#123;YOU_KNOW_ME_BETTER_THAN_MOST&#125;
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Message */}
            <div className="glow-box-purple p-8 bg-black/80 rounded-xl max-w-2xl mx-auto">
              <p className="text-neon-pink text-2xl font-bold mb-4">
                🎉 Alles Gute zum Geburtstag!
              </p>
              
              <p className="text-neon-cyan mb-2">
                If life ever feels heavy, take a breath and keep going. 
                You have a beautiful heart, and the world feels softer when you’re in it.
                Enjoy your days, stay close to the people who make you feel loved, and live moments that make your soul feel alive.
              </p>
              <p className="text-neon-pink text-lg">
                May God bless you, protect you, and guide you wherever you go.
                And may every dream you carry, even the quiet ones, find a way to come true.
                I still care about you… more than you know.
              </p>
            </div>

            {/* Restart */}
            <Button
              onClick={onRestart}
              className="bg-black/70 border border-neon-green/60 px-8 py-3 rounded-lg mt-6 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              PLAY AGAIN
            </Button>
          </div>
        )}
      </div>
    </GameShell>
  );
};

export default FinalScreen;
