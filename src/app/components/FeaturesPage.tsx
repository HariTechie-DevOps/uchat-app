import { motion } from 'motion/react';

const features = [
  {
    id: 1,
    title: 'Smart Messaging',
    description: 'Experience the next generation of communication',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'AI Translation',
    description: 'Powered by advanced artificial intelligence',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Real-time Sync',
    description: 'Instant message delivery across all devices',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 4,
    title: 'Multi-Language',
    description: 'Support for 100+ languages worldwide',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'Secure & Private',
    description: 'End-to-end encryption for all conversations',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 6,
    title: 'Voice Messages',
    description: 'Crystal-clear voice with live translation',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    gradient: 'from-rose-500 to-red-500',
  },
];

export function FeaturesPage() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-8 py-8 md:py-12">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8 md:mb-12 lg:mb-16"
      >
        <motion.h2
          className="text-white mb-3 md:mb-4"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
          animate={{
            textShadow: [
              '0 0 20px rgba(255,255,255,0.3)',
              '0 0 40px rgba(255,255,255,0.5)',
              '0 0 20px rgba(255,255,255,0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Powerful Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/80 text-sm md:text-base lg:text-lg max-w-2xl mx-auto"
        >
          Everything you need for seamless global communication
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.7 + index * 0.1,
              type: 'spring',
              stiffness: 150,
              damping: 20,
            }}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="relative group cursor-pointer"
          >
            {/* Card */}
            <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 lg:p-7 shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
              {/* Icon */}
              <div className="relative mb-4 md:mb-5">
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 md:p-3 text-white shadow-lg`}
                >
                  {feature.icon}
                </div>
                {/* Icon Glow */}
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl -z-10 transition-opacity duration-300`}
                />
              </div>

              {/* Content */}
              <h3 className="text-white text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 text-xs md:text-sm lg:text-base leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="mt-8 md:mt-12 lg:mt-16"
      >
        <div className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-white/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
          <span className="text-white/80 text-xs md:text-sm">Continue to explore</span>
        </div>
      </motion.div>
    </div>
  );
}
