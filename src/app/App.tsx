import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { AnimatedStars } from "./components/AnimatedStars";
import { FeaturesPage } from "./components/FeaturesPage";
import chatSceneImg from "figma:asset/99517f0890f8e08f29d063b1abb87002507d92e3.png";
import logoSceneImg from "figma:asset/3c8a9035f72e3d6f3bf8be4b238152d34ac4f7fa.png";

// 6 conversation messages - Alternating between Girl and Boy
const conversation = [
  {
    id: 1,
    sender: "girl", // Girl sends Japanese
    receiver: "boy", // Boy receives with English translation
    originalText: "こんにちは！元気ですか？",
    translatedText: "Hello! How are you?",
    direction: "Japanese → English",
  },
  {
    id: 2,
    sender: "boy", // Boy sends English
    receiver: "girl", // Girl receives with Japanese translation
    originalText: "I'm doing great! What about you?",
    translatedText: "元気だよ！あなたは？",
    direction: "English → Japanese",
  },
  {
    id: 3,
    sender: "girl", // Girl sends Japanese
    receiver: "boy", // Boy receives with English translation
    originalText: "私もとても良いです！",
    translatedText: "I'm very good too!",
    direction: "Japanese → English",
  },
  {
    id: 4,
    sender: "boy", // Boy sends English
    receiver: "girl", // Girl receives with Japanese translation
    originalText: "That's wonderful to hear!",
    translatedText: "それは素晴らしい！",
    direction: "English → Japanese",
  },
  {
    id: 5,
    sender: "girl", // Girl sends Japanese
    receiver: "boy", // Boy receives with English translation
    originalText: "このアプリは本当に便利ですね",
    translatedText: "This app is really convenient",
    direction: "Japanese → English",
  },
  {
    id: 6,
    sender: "boy", // Boy sends English
    receiver: "girl", // Girl receives with Japanese translation
    originalText: "Yes! We can communicate perfectly!",
    translatedText: "はい！完璧にコミュニケーションできます！",
    direction: "English → Japanese",
  },
];

export default function App() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentPage, setCurrentPage] = useState<'chat' | 'features' | 'logo'>('chat');
  const [messageStage, setMessageStage] = useState<
    "sending" | "receiving" | "done"
  >("sending");

  useEffect(() => {
    if (currentPage === 'chat') {
      if (currentMessage >= conversation.length) {
        // All messages done, move to features page
        const featuresTimer = setTimeout(() => {
          setCurrentPage('features');
        }, 1500);
        return () => clearTimeout(featuresTimer);
      }

      const timers: NodeJS.Timeout[] = [];

      // Stage 1: Sending - show message being sent (0-2.5s)
      setMessageStage("sending");

      // Stage 2: Receiving with Translation - show translation appearing (2.5-7.5s)
      timers.push(
        setTimeout(() => setMessageStage("receiving"), 2500),
      );

      // Stage 3: Done, pause before next message (7.5-8.5s)
      timers.push(
        setTimeout(() => {
          setMessageStage("done");
          setCurrentMessage((prev) => prev + 1);
        }, 8500),
      );

      return () => timers.forEach((timer) => clearTimeout(timer));
    }

    if (currentPage === 'features') {
      // Show features for 8 seconds, then move to logo page
      const logoTimer = setTimeout(() => {
        setCurrentPage('logo');
      }, 8000);
      return () => clearTimeout(logoTimer);
    }
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
            {/* Background with stars */}
            <AnimatedStars />

            {/* Chat scene image */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 30, ease: "linear" }}
            >
              <img
                src={chatSceneImg}
                alt="Two people chatting under the stars"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

            {/* App intro title */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-20 text-center px-4"
            >
              <h2 className="text-white/95 text-xl md:text-3xl lg:text-4xl mb-2 tracking-wide">
                UChat Translation
              </h2>
              <p className="text-white/70 text-xs md:text-sm lg:text-base">
                Real-time communication across languages
              </p>
            </motion.div>

            {/* Translation Direction Indicator */}
            {msg && (
              <motion.div
                key={`direction-${currentMessage}`}
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 md:top-28 lg:top-32 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div
                      className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${msg.sender === "girl" ? "bg-blue-400" : "bg-purple-400"} animate-pulse`}
                    />
                    <p className="text-white/90 text-xs md:text-sm font-medium">
                      {msg.direction.split(" → ")[0]}
                    </p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    <svg
                      className="w-4 md:w-5 h-4 md:h-5 text-white/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div
                      className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${msg.receiver === "boy" ? "bg-purple-400" : "bg-blue-400"} animate-pulse`}
                    />
                    <p className="text-white/90 text-xs md:text-sm font-medium">
                      {msg.direction.split(" → ")[1]}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Translating indicator - shows during receiving stage */}
            {msg && messageStage === "receiving" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-36 md:top-44 lg:top-48 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/25">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg
                      className="w-3.5 md:w-4 h-3.5 md:h-4 text-white/90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </motion.div>
                  <span className="text-white/90 text-xs">
                    Translating...
                  </span>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <AnimatePresence mode="wait">
              {msg && (
                <motion.div
                  key={`conversation-${currentMessage}`}
                >
                  {/* Sending Stage - Shows on sender's side */}
                  {messageStage === "sending" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: msg.sender === "girl" ? 50 : -50,
                        scale: 0.5,
                      }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        x: msg.sender === "girl" ? -50 : 50,
                        scale: 0.8,
                      }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className={`absolute ${msg.sender === "girl" ? "right-[8%] md:right-[12%] lg:right-[15%]" : "left-[8%] md:left-[12%] lg:left-[15%]"} top-[35%] md:top-[32%] lg:top-[28%] z-30`}
                    >
                      <div className="relative">
                        <div
                          className={`px-4 md:px-5 lg:px-6 py-3 md:py-3.5 lg:py-4 rounded-xl md:rounded-2xl ${
                            msg.sender === "girl"
                              ? "bg-gradient-to-br from-blue-500/95 to-blue-600/95 rounded-tr-sm"
                              : "bg-gradient-to-br from-purple-500/95 to-purple-600/95 rounded-tl-sm"
                          } text-white shadow-2xl max-w-[250px] md:max-w-xs lg:max-w-sm`}
                        >
                          <p className="text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                            {msg.originalText}
                          </p>
                        </div>
                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl md:rounded-2xl -z-10"
                          animate={{
                            boxShadow: [
                              `0 0 15px ${msg.sender === "girl" ? "rgba(59, 130, 246, 0.6)" : "rgba(168, 85, 247, 0.6)"}`,
                              `0 0 30px ${msg.sender === "girl" ? "rgba(59, 130, 246, 1)" : "rgba(168, 85, 247, 1)"}`,
                              `0 0 15px ${msg.sender === "girl" ? "rgba(59, 130, 246, 0.6)" : "rgba(168, 85, 247, 0.6)"}`,
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        {/* Sending indicator */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`absolute -bottom-5 md:-bottom-6 ${msg.sender === "girl" ? "right-0" : "left-0"} text-white/70 text-xs`}
                        >
                          Sending...
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Receiving Stage - Shows on receiver's side with translation */}
                  {messageStage === "receiving" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: msg.receiver === "boy" ? -50 : 50,
                        scale: 0.5,
                      }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 180,
                      }}
                      className={`absolute ${msg.receiver === "boy" ? "left-[8%] md:left-[12%] lg:left-[15%]" : "right-[8%] md:right-[12%] lg:right-[15%]"} top-[35%] md:top-[32%] lg:top-[28%] z-30`}
                    >
                      <div className="relative">
                        <div
                          className={`px-4 md:px-5 lg:px-6 py-4 md:py-4.5 lg:py-5 rounded-xl md:rounded-2xl ${
                            msg.receiver === "boy"
                              ? "bg-gradient-to-br from-purple-500/95 to-purple-600/95 rounded-tl-sm"
                              : "bg-gradient-to-br from-blue-500/95 to-blue-600/95 rounded-tr-sm"
                          } text-white shadow-2xl max-w-[280px] md:max-w-md lg:max-w-lg`}
                        >
                          {/* Original text - TOP */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.2,
                              duration: 0.4,
                            }}
                            className="mb-2 md:mb-3"
                          >
                            <p className="text-sm md:text-base lg:text-lg font-semibold leading-relaxed">
                              {msg.originalText}
                            </p>
                          </motion.div>

                          {/* Translation divider with animation */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              delay: 0.5,
                              duration: 0.5,
                            }}
                            className="border-t border-white/40 my-2 md:my-3 origin-left"
                          />

                          {/* Translation - BOTTOM */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.8,
                              duration: 0.4,
                            }}
                          >
                            <div className="flex items-start gap-1.5 md:gap-2">
                              <svg
                                className="w-3.5 md:w-4 lg:w-4 h-3.5 md:h-4 lg:h-4 text-white/80 mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                                />
                              </svg>
                              <p className="text-xs md:text-sm lg:text-base text-white/95 leading-relaxed font-medium">
                                {msg.translatedText}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl md:rounded-2xl -z-10"
                          animate={{
                            boxShadow: [
                              `0 0 15px ${msg.receiver === "boy" ? "rgba(168, 85, 247, 0.6)" : "rgba(59, 130, 246, 0.6)"}`,
                              `0 0 30px ${msg.receiver === "boy" ? "rgba(168, 85, 247, 1)" : "rgba(59, 130, 246, 1)"}`,
                              `0 0 15px ${msg.receiver === "boy" ? "rgba(168, 85, 247, 0.6)" : "rgba(59, 130, 246, 0.6)"}`,
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-10 md:bottom-12 lg:bottom-14 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="flex gap-1.5 md:gap-2">
                {conversation.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 md:h-2 rounded-full ${
                      index < currentMessage
                        ? "bg-gradient-to-r from-blue-400 to-purple-400 w-8 md:w-10"
                        : index === currentMessage
                          ? "bg-white/80 w-10 md:w-14"
                          : "bg-white/20 w-6 md:w-8"
                    }`}
                    initial={{ width: "1.5rem" }}
                    animate={{
                      width:
                        index === currentMessage
                          ? "2.5rem"
                          : index < currentMessage
                            ? "2rem"
                            : "1.5rem",
                      opacity:
                        index <= currentMessage ? 1 : 0.4,
                    }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Message counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-16 md:bottom-20 lg:bottom-24 left-1/2 transform -translate-x-1/2 z-10"
            >
              <div className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <p className="text-white/80 text-xs tracking-wider">
                  {Math.min(
                    currentMessage + 1,
                    conversation.length,
                  )}{" "}
                  / {conversation.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : currentPage === 'features' ? (
          <motion.div
            key="features-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            {/* Background with stars */}
            <AnimatedStars />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40" />
            
            {/* Features Content */}
            <div className="relative z-10">
              <FeaturesPage />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="logo-scene"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            {/* Background with stars */}
            <AnimatedStars />

            {/* Logo scene image */}
            <motion.div className="absolute inset-0">
              <img
                src={logoSceneImg}
                alt="UChat Logo Background"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Animated logo text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-center mb-8 md:mb-12"
              >
                <motion.h1
                  className="text-white mb-4 md:mb-6"
                  style={{
                    fontSize: "clamp(3rem, 10vw, 7rem)",
                    fontWeight: 200,
                    letterSpacing: "0.05em",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 30px rgba(255,255,255,0.4)",
                      "0 0 60px rgba(255,255,255,0.7)",
                      "0 0 30px rgba(255,255,255,0.4)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  UChat
                </motion.h1>
                <motion.p
                  className="text-white/90 text-base md:text-xl lg:text-2xl tracking-wide max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Experience the next generation of
                  communication
                </motion.p>
              </motion.div>

              {/* Floating language badges */}
              <motion.div
                className="flex flex-wrap gap-2 md:gap-3 justify-center max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                {[
                  "English",
                  "Español",
                  "Français",
                  "Deutsch",
                  "日本語",
                  "中文",
                  "العربية",
                  "Português",
                  "Italiano",
                  "Русский",
                ].map((language, index) => (
                  <motion.div
                    key={language}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.3 + index * 0.08,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className="relative group cursor-pointer"
                  >
                    <div className="px-3 md:px-5 py-1.5 md:py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg transition-all group-hover:bg-white/20 group-hover:border-white/40">
                      <span className="text-white/95 text-xs md:text-sm tracking-wide">
                        {language}
                      </span>
                    </div>
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        boxShadow:
                          "0 0 20px rgba(255, 255, 255, 0.4)",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-8 md:mt-12 text-white/70 text-sm md:text-base tracking-wide mb-8 md:mb-10"
              >
                Break language barriers. Connect globally.
              </motion.p>

              {/* Get Started Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
                onClick={() => alert('Get Started - Coming Soon!')}
              >
                <div className="relative px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl transition-all duration-300 group-hover:shadow-blue-500/50 overflow-hidden">
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatDelay: 1,
                    }}
                  />
                  
                  <div className="relative flex items-center gap-2 md:gap-3">
                    <span className="text-white text-base md:text-lg lg:text-xl tracking-wide">
                      Get Started
                    </span>
                    <motion.svg
                      className="w-5 h-5 md:w-6 md:h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </div>
                </div>

                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full -z-10"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 40px rgba(147, 51, 234, 0.7)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.button>
            </div>

            {/* Pulsing ambient glow effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  "radial-gradient(circle at 50% 40%, rgba(147, 197, 253, 0.15) 0%, transparent 60%)",
                  "radial-gradient(circle at 50% 40%, rgba(196, 181, 253, 0.15) 0%, transparent 60%)",
                  "radial-gradient(circle at 50% 40%, rgba(147, 197, 253, 0.15) 0%, transparent 60%)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}