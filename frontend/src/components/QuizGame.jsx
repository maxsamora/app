import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { CheckCircle2, XCircle, Sparkles, Lightbulb } from 'lucide-react';

const questions = [
  {
    question: "What is the name of the coffee shop where the Friends hang out?",
    answer: "central perk",
    alternatives: ["centralperk", "central-perk"],
    hint: "It's a coffee shop...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OTQ1M2VqN2hwaDIyOGptNHE1YzN4YmF4ZWhxdnZ3MXk2bmpjM2ZjZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/J06yVeVA5HedwewpzD/giphy.gif"
  },
  {
    question: "What is Ross's profession?",
    answer: "paleontologist",
    alternatives: ["palaeontologist"],
    hint: "He works with dinosaurs...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MXM1NndyNG53Nnk2M21neDF4NDkxZGgxcWowY3A5anM1ZHZ2dzZxcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/S3cM2wo5ViXnM1HcHI/giphy.gif"
  },
  {
    question: "What is Monica's apartment number?",
    answer: "20",
    alternatives: ["twenty", "#20", "number 20"],
    hint: "It's a two-digit number...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MXM1NndyNG53Nnk2M21neDF4NDkxZGgxcWowY3A5anM1ZHZ2dzZxcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LnELTnEsOZ5UDQofr6/giphy.gif"
  },
  {
    question: "What is Chandler's middle name?",
    answer: "muriel",
    alternatives: [],
    hint: "It's quite unusual...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ajhxd3ByN3U1dGUzN3B1NWpkb2xwcTZtZ2F3Z2ZqY2Y1OTdmODExaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d8QGjQniKwgKe4Oy43/giphy.gif"
  },
  {
    question: "What is the name of Ross's pet monkey?",
    answer: "marcel",
    alternatives: [],
    hint: "French name...",
    backgroundGif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjN4bWU3Mmtqdnh2MjlsY2d2a2pqM3h2NDdrY2dzdm45cnBlY200eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dWNDTnRbDLSil2VeKx/giphy.gif"
  },
  {
    question: "What is Joey's famous catchphrase?",
    answer: "how you doin",
    alternatives: ["how you doing", "how you doin'", "how u doin"],
    hint: "It's his pickup line...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXdneDhhMG5oMTQzejVxbWVoYTg2eTI2NXhnOTdtN3RmbnI3cGJvZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YTDZakyAorkLDYqN0q/giphy.gif"
  },
  {
    question: "What is Rachel's favorite dessert that she can't make?",
    answer: "trifle",
    alternatives: ["english trifle"],
    hint: "Beef and custard...",
    backgroundGif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2E1ZnlqZmVmbDlmaWhvN3VtMzc1cmp6eGFzbm05bGJ6dzcxMHptbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wd3kGxy3poJEI/giphy.gif"
  },
  {
    question: "What is Phoebe's most famous song?",
    answer: "smelly cat",
    alternatives: ["smellycat"],
    hint: "It's about a feline...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTVpZXR3OTV4bnJ4c2pxb3p0OWNrdDd2c3Y1cHg5a3NnZDN3MndmNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7abuEoedSAZGxO5a/giphy.gif"
  },
  {
    question: "How many seasons of Friends are there?",
    answer: "10",
    alternatives: ["ten"],
    hint: "Double digits...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmg3dnptZ3JtaWx1cWEwYjE2dHFmd3YzZXp6c3gwamNoZ21zZXh2dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QC1TssrPbkD2menNfz/giphy.gif"
  },
  {
    question: "What is the name of Ross's first wife?",
    answer: "carol",
    alternatives: [],
    hint: "She's Ben's mother...",
    backgroundGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3VsYzc5dnQ1eGZrZWcxMG1pbjN5dDI3d3BxZm1xdDczcmp0NGdvdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cOiNVODcm5hmOfYKIs/giphy.gif"
  }
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
  "Processing love.exe..."
];

const QuizGame = ({ onFinish, musicPlaying, volume, muted, onToggleMute, onVolumeChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hackerMessage, setHackerMessage] = useState(hackerMessages[0]);
  const [attempts, setAttempts] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

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

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "");
  };

  const checkAnswer = () => {
    const normalized = normalizeAnswer(userAnswer);
    const correctAnswer = normalizeAnswer(questions[currentQuestion].answer);
    const alternatives = questions[currentQuestion].alternatives.map(alt => normalizeAnswer(alt));

    if (normalized === correctAnswer || alternatives.includes(normalized)) {
      setIsCorrect(true);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
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
      setAttempts(attempts + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
      setTimeout(() => {
        setIsCorrect(null);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer.trim()) {
      checkAnswer();
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${questions[currentQuestion].backgroundGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      <div className="bg-overlay"></div>
      <div className="scanline"></div>

      <div className="content-wrapper min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-2xl w-full space-y-6 ${fadeIn ? 'fade-in' : ''}`}>
          <div className="glow-box rounded-lg p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neon-green text-sm font-mono">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-neon-cyan text-sm font-mono">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center">
            <p className="text-neon-purple text-lg pulse flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {hackerMessage}
              <Sparkles className="w-5 h-5" />
            </p>
          </div>

          <div className="glow-box rounded-lg p-6 bg-white/90 backdrop-blur-sm space-y-6">
            <div className="text-green-600 text-xs font-mono flex items-center gap-2 pb-4 border-b border-green-600/30">
              <span className="text-red-500">●</span>
              <span className="text-yellow-500">●</span>
              <span className="text-green-500">●</span>
              <span className="ml-2">secret_admirer.terminal</span>
            </div>

            <div className="space-y-4">
              <p className="text-gray-900 text-lg sm:text-xl font-mono leading-relaxed">
                <span className="text-green-600">❯ </span>
                {questions[currentQuestion].question}
              </p>

              {showHint && (
                <div className="text-cyan-700 text-sm font-mono p-3 bg-cyan-50 rounded border border-cyan-300">
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
                    onKeyPress={handleKeyPress}
                    placeholder="Type your answer here..."
                    className="flex-1 bg-gray-100 border-gray-300 text-gray-900 font-mono focus:border-green-500 focus:ring-green-500"
                    autoFocus
                  />
                </div>

                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-mono uppercase tracking-wide"
                >
                  Submit Answer
                </Button>
              </div>

              {isCorrect !== null && (
                <div className={`flex items-center gap-2 p-3 rounded font-mono ${
                  isCorrect 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
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

          <div className="text-center text-sm neon-cyan font-mono bg-black/50 backdrop-blur-sm p-3 rounded-lg">
            {currentQuestion < questions.length - 1 
              ? "Keep going... You're getting closer to the truth."
              : "Final question! The secret will be revealed soon..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
