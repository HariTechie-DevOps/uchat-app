import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { AnimatedStars } from "./components/AnimatedStars";
import { FeaturesPage } from "./components/FeaturesPage";

// ✅ ASSET IMPORTS
import chatSceneImg from '../assets/99517f0890f8e08f29d063b1abb87002507d92e3.png';
import logoSceneImg from '../assets/3c8a9035f72e3d6f3bf8be4b238152d34ac4f7fa.png';

const conversation = [
  { id: 1, sender: "girl", receiver: "boy", originalText: "こんにちは！元気ですか？", translatedText: "Hello! How are you?", direction: "Japanese → English" },
  { id: 2, sender: "boy", receiver: "girl", originalText: "I'm doing great! What about you?", translatedText: "元気だよ！あなたは？", direction: "English → Japanese" },
  { id: 3, sender: "girl", receiver: "boy", originalText: "私もとても良いです！", translatedText: "I'm very good too!", direction: "Japanese → English" },
  { id: 4, sender: "boy", receiver: "girl", originalText: "That's wonderful to hear!", translatedText: "それは素晴らしい！", direction: "English → Japanese" },
  { id: 5, sender: "girl", receiver: "boy", originalText: "このアプリは本当に便利ですね", translatedText: "This app is really convenient", direction: "Japanese → English" },
  { id: 6, sender: "boy", receiver: "girl", originalText: "Yes! We can communicate perfectly!", translatedText: "はい！完璧にコミュニケーションできます！", direction: "English → Japanese" },
];

export default function App() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentPage, setCurrentPage] = useState<'chat' | 'features' | 'logo'>('chat');
  const [messageStage, setMessageStage] = useState<"sending" | "receiving" | "done">("sending");

  const LOGIN_URL = "/login";

  // 1. FIX: IMAGE PRELOADING (Solves slow image loading)
  useEffect(() => {
    [chatSceneImg, logoSceneImg].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    // AUTO-REDIRECT TIMER
    const redirectTimer = setTimeout(() => {
      window.location.href = LOGIN_URL;
    }, 60000);

    // ANIMATION LOGIC
    if (currentPage === 'chat') {
      if (currentMessage >= conversation.length) {
        const featuresTimer = setTimeout(() => setCurrentPage('features'), 1500);
        return () => {
          clearTimeout(featuresTimer);
          clearTimeout(redirectTimer);
        };
      }

      const timers: NodeJS.Timeout[] = [];
      setMessageStage("sending");
      timers.push(setTimeout(() => setMessageStage("receiving"), 2500));
      timers.push(setTimeout(() => {
        setMessageStage("done");
        setCurrentMessage((prev) => prev + 1);
      }, 8500));

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(redirectTimer);
      };
    }

    if (currentPage === 'features') {
      const logoTimer = setTimeout(() => setCurrentPage('logo'), 8000);
      return () => {
        clearTimeout(logoTimer);
        clearTimeout(redirectTimer);
      };
    }

    return () => clearTimeout(redirectTimer);
  }, [currentMessage, currentPage]);

  const msg = conversation[currentMessage];

  return (
    // 2. FIX: DYNAMIC VIEWPORT (Solves browser size issues)
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        {currentPage === 'chat' ? (
          <motion.div
            key="chat-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <AnimatedStars />
            <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 20 }}>
              <img src={chatSceneImg} alt="Background" className="w-full h-full object-cover" />
            </motion.div>

            {/* Darker Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center w-full">
              <h2 className="text-white text-2xl md:text-4xl font-light tracking-widest uppercase">UChat Translation</h2>
            </motion.div>

            {/* 3. FIX: TRANSLATION INDICATOR (High visibility & Blinking dot) */}
            {msg && (
              <motion.div 
                key={`direction-${currentMessage}`} 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="absolute top-24 left-1/2 -translate-x-1/2 z-50 w-max"
              >
                <div className="flex items-center gap-3 px-6 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                   <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                   </span>
                   <p className="text-white text-xs md:text-sm font-bold tracking-widest">{msg.direction}</p>
                </div>
              </motion.div>
            )}

            {/* Message Bubbles */}
            <AnimatePresence mode="wait">
              {msg && (
                <motion.div key={`msg-${currentMessage}`}>
                  {messageStage === "sending" && (
                    <motion.div initial={{ opacity: 0, x: msg.sender === "girl" ? 50 : -50 }} animate={{ opacity: 1, x: 0 }} className={`absolute ${msg.sender === "girl" ? "right-[10%]" : "left-[10%]"} top-[40%] z-30`}>
                      <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg shadow-2xl">
                        {msg.originalText}
                      </div>
                    </motion.div>
                  )}
                  {messageStage === "receiving" && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`absolute ${msg.receiver === "boy" ? "left-[10%]" : "right-[10%]"} top-[40%] z-30`}>
                      <div className="px-6 py-5 rounded-2xl bg-blue-600/80 backdrop-blur-lg text-white shadow-2xl max-w-xs md:max-w-md">
                        <p className="text-xs opacity-70 mb-1">Original: {msg.originalText}</p>
                        <p className="text-xl font-medium tracking-wide">✨ {msg.translatedText}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {conversation.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${i <= currentMessage ? "bg-blue-500 w-12" : "bg-white/20 w-6"}`} />
              ))}
            </div>
          </motion.div>
        ) : currentPage === 'features' ? (
          <motion.div key="features-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
            <AnimatedStars />
            <FeaturesPage />
          </motion.div>
        ) : (
          <motion.div key="logo-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full flex flex-col items-center justify-center text-center">
            <AnimatedStars />
            <img src={logoSceneImg} className="absolute inset-0 w-full h-full object-cover opacity-50" />
            
            {/* 4. FIX: FLOATING LANGUAGE BUBBLES */}
            <div className="absolute top-20 flex flex-wrap justify-center gap-4 px-6 z-10 max-w-2xl">
              {["English", "日本語", "Español", "Français", "हिन्दी", "தமிழ்", "Deutsch"].map((lang, i) => (
                <motion.div
                  key={lang}
                  animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-light"
                >
                  {lang}
                </motion.div>
              ))}
            </div>

            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-7xl md:text-9xl font-thin tracking-tighter z-10 drop-shadow-2xl">
              UChat
            </motion.h1>
            <p className="text-white/70 text-lg mt-4 mb-12 z-10 tracking-widest">LET'S START CONNECTING</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="z-10 px-12 py-5 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              onClick={() => window.location.href = LOGIN_URL}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
