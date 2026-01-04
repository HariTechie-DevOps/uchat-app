import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { AnimatedStars } from "./components/AnimatedStars";
import { FeaturesPage } from "./components/FeaturesPage";

// ✅ FIXED IMPORTS
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

  // Global Redirect URL (Pointed to your Spring Boot Backend)
  const LOGIN_URL = "/login";

  useEffect(() => {
    // 1. HANDLES THE 60-SECOND AUTO-REDIRECT
    const redirectTimer = setTimeout(() => {
      window.location.href = LOGIN_URL;
    }, 60000);

    // 2. HANDLES ANIMATION TRANSITIONS
    if (currentPage === 'chat') {
      if (currentMessage >= conversation.length) {
        const featuresTimer = setTimeout(() => {
          setCurrentPage('features');
        }, 1500);
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
        timers.forEach((timer) => clearTimeout(timer));
        clearTimeout(redirectTimer);
      };
    }

    if (currentPage === 'features') {
      const logoTimer = setTimeout(() => {
        setCurrentPage('logo');
      }, 8000);
      return () => {
        clearTimeout(logoTimer);
        clearTimeout(redirectTimer);
      };
    }

    return () => clearTimeout(redirectTimer);
  }, [currentMessage, currentPage]);

  const msg = conversation[currentMessage];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
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
            <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 30, ease: "linear" }}>
              <img src={chatSceneImg} alt="Two people chatting" className="w-full h-full object-cover object-center" />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 text-center px-4">
              <h2 className="text-white/95 text-xl md:text-3xl lg:text-4xl mb-2 tracking-wide">UChat Translation</h2>
              <p className="text-white/70 text-xs md:text-sm">Real-time communication across languages</p>
            </motion.div>

            {/* Translation Indicator */}
            {msg && (
              <motion.div key={`direction-${currentMessage}`} initial={{ opacity: 0, scale: 0.9, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                   <p className="text-white/90 text-xs md:text-sm font-medium">{msg.direction}</p>
                </div>
              </motion.div>
            )}

            {/* Message Bubbles Logic */}
            <AnimatePresence mode="wait">
              {msg && (
                <motion.div key={`msg-${currentMessage}`}>
                  {messageStage === "sending" && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className={`absolute ${msg.sender === "girl" ? "right-[15%]" : "left-[15%]"} top-[30%] z-30`}>
                      <div className={`px-6 py-4 rounded-2xl ${msg.sender === "girl" ? "bg-blue-600" : "bg-purple-600"} text-white shadow-2xl`}>
                        {msg.originalText}
                      </div>
                    </motion.div>
                  )}
                  {messageStage === "receiving" && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className={`absolute ${msg.receiver === "boy" ? "left-[15%]" : "right-[15%]"} top-[30%] z-30`}>
                      <div className={`px-6 py-5 rounded-2xl ${msg.receiver === "boy" ? "bg-purple-600" : "bg-blue-600"} text-white shadow-2xl`}>
                        <p className="font-bold border-b border-white/20 mb-2">{msg.originalText}</p>
                        <p className="text-sm opacity-90">✨ {msg.translatedText}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {conversation.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i <= currentMessage ? "bg-white w-10" : "bg-white/20 w-6"}`} />
              ))}
            </div>
          </motion.div>
        ) : currentPage === 'features' ? (
          <motion.div key="features-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
            <AnimatedStars />
            <FeaturesPage />
          </motion.div>
        ) : (
          <motion.div key="logo-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimatedStars />
            <img src={logoSceneImg} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            
            <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-white text-8xl font-thin tracking-tighter z-10">UChat</motion.h1>
            <p className="text-white/60 mb-10 z-10">Break language barriers. Connect globally.</p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="z-10 px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold shadow-xl"
              onClick={() => window.location.href = LOGIN_URL} // IMMEDIATE REDIRECT
            >
              Get Started Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
