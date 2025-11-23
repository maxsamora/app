// QuizGame.js
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { CheckCircle2, XCircle, Sparkles, Lightbulb } from "lucide-react";
import GameShell from "./GameShell";
import MusicPlayer from "./MusicPlayer";

const questions = [
  {
    question: "What is the name of the coffee shop where the Friends hang out?",
    answer: "central perk",
    alternatives: ["centralperk", "central-perk"],
    hint: "It's a coffee shop...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2ViYWpiODJuYzB1a3AwdDhqaDloNGg1cTd6N3ZkcTNwdnk4aWVqcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qdeImlUdsbSso/giphy.gif",
  },
  // ... todas as outras perguntas (igual ao seu código original)
];

const hackerMessages = [
  "Decrypting your heart...",
  "Access granted...",
  "Bypassing firewall...",
  "Cracking the code...",
  "Downloading memories...",
  "Compiling emotions...",
  "Executing romantic protocol...",
  "Synchronizing hearts...",
  "Unlocking secrets...",
  "Processing love.exe...",
];

const QuizGame = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [hackerMessage, setHackerMessage] = useState(hackerMessages[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    questions.forEach(q => {
      const img = new Image();
      img.src = q.backgroundGif;
    });
  }, []);

  useEffect(() => {
    setHackerMessage(hackerMessages[currentQuestion % hackerMessages.length]);
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const normalizeAnswer = (answer) => answer.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "");

  const checkAnswer = () => {
    const normalized = normalizeAnswer(userAnswer);
    const question = questions[currentQuestion];
    const correctAnswer = normalizeAnswer(question.answer);
    const alternatives = question.alternatives.map(a => normalizeAnswer(a));

    if (normalized === correctAnswer || alternatives.includes(normalized)) {
      setIsCorrect(true);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setUserAnswer("");
          setIsCorrect(null);
          setShowHint(false);
          setAttempts(0);
        } else {
          onFinish();
        }
      }, 1500);
    } else {
      setIsCorrect(false);
      setAttempts(prev => {
        const next = prev + 1;
        if (next >= 2) setShowHint(true);
        return next;
      });
      setTimeout(() => setIsCorrect(null), 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userAnswer.trim()) checkAnswer();
  };

  const bg = questions[currentQuestion].backgroundGif;

  return (
    <GameShell background={bg}>
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <div className="scanline" />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-2xl w-full space-y-6 ${fadeIn ? "fade-in" : ""}`}>
          <div className="glow-box rounded-lg p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neon-green text-xs sm:text-sm font-mono">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-neon-cyan text-xs sm:text-sm font-mono">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center">
            <p className="text-neon-purple text-sm sm:text-lg pulse flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              {hackerMessage}
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </p>
          </div>

          <div className="glow-box rounded-lg p-5 sm:p-6 bg-white/90 backdrop-blur-sm space-y-6">
            <div className="text-green-600 text-[10px] sm:text-xs font-mono flex items-center gap-2 pb-4 border-b border-green-600/30">
              <span className="text-red-500">●</span>
              <span className="text-yellow-500">●</span>
              <span className="text-green-500">●</span>
              <span className="ml-2 truncate">secret_admirer.terminal</span>
            </div>

            <p className="text-gray-900 text-base sm:text-xl font-mono leading-relaxed">
              <span className="text-green-600">❯ </span>
              {questions[currentQuestion].question}
            </p>

            {showHint && (
              <div className="text-cyan-700 text-xs sm:text-sm font-mono p-3 bg-cyan-50 rounded border border-cyan-300">
                <Lightbulb className="inline-block w-4 h-4 mr-2" />
                <span className="font-bold">Hint: </span>
                {questions[currentQuestion].hint}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-mono font-bold">$</span>
                <Input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your answer here..."
                  className="flex-1 bg-gray-100 border-gray-300 text-gray-900 font-mono focus:border-green-500 focus:ring-green-500 text-sm sm:text-base"
                  autoFocus
                />
              </div>

              <Button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-mono uppercase tracking-wide text-xs sm:text-sm"
              >
                Submit Answer
              </Button>

              {isCorrect !== null && (
                <div
                  className={`flex items-center gap-2 p-3 rounded font-mono text-xs sm:text-sm ${
                    isCorrect
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Correct! Access granted...</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Access denied. Try again...</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="text-center text-[11px] sm:text-sm neon-cyan font-mono bg-black/60 backdrop-blur-sm p-3 rounded-lg">
            {currentQuestion < questions.length - 1
              ? "Keep going... you're getting closer to the truth."
              : "Final question! The secret will be revealed soon..."}
          </div>
        </div>
      </div>
    </GameShell>
  );
};

export default QuizGame;
