import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DecorativeShapes from "../components/DecorativeShapes";
import useMouseParallax from "../hooks/useMouseParallax";
import MagneticButton from "../components/MagneticButton";
import {
  typewriterContainer,
  typewriterChar,
  blurIn,
  bounceIn,
  fadeUp,
} from "../animations/variants";

const ROLES = [
  "Full-Stack Developer",
  "React Specialist",
  "Firebase Engineer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

function TypewriterRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  const chars = ROLES[index].split("");

  return (
    <div className="h-9 md:h-10 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={ROLES[index]}
            variants={typewriterContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            className="flex text-xl md:text-3xl font-semibold text-indigo-500 dark:text-indigo-400"
          >
            {chars.map((char, i) => (
              <motion.span key={i} variants={typewriterChar}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase hidden sm:block">
        Scroll
      </span>
      <div className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center pt-1">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-2 rounded-full bg-indigo-500"
        />
      </div>
    </motion.div>
  );
}

function AvailableBadge() {
  return (
    <motion.div
      variants={bounceIn}
      initial="hidden"
      animate="visible"
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
        bg-emerald-50 dark:bg-emerald-900/30
        border border-emerald-200 dark:border-emerald-700
        text-emerald-700 dark:text-emerald-400
        text-xs md:text-sm font-medium mb-5 animate-float"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      Available for work
    </motion.div>
  );
}

const stats = [
  { label: "Projects Built", value: "10+" },
  { label: "Tech Stack",     value: "15+" },
  { label: "Coffee Cups",    value: "∞" },
];

function StatPills() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.2 }}
      className="mt-8 flex flex-wrap gap-3 justify-center"
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.08, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-4 py-2 rounded-full
            bg-white/70 dark:bg-gray-800/70
            border border-gray-200 dark:border-gray-700
            backdrop-blur-sm text-xs md:text-sm font-medium
            text-gray-700 dark:text-gray-300 shadow-sm"
        >
          <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-1">
            {s.value}
          </span>
          {s.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

const Hero = () => {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -30]);

  /* Only use parallax on non-touch devices */
  const bgMouse    = useMouseParallax(90);
  const shapeMouse = useMouseParallax(60);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <motion.div
        style={{ x: bgMouse.x }}
        className="absolute inset-0
          bg-gradient-to-br
          from-indigo-100 via-white to-cyan-100
          dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      />

      {/* Decorative Shapes — hidden on small screens to save perf */}
      <motion.div
        style={{ x: shapeMouse.x, y: shapeMouse.y }}
        className="absolute inset-0 hidden sm:block"
      >
        <DecorativeShapes />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 text-center px-5 flex flex-col items-center w-full max-w-3xl mx-auto"
      >
        <AvailableBadge />

        <motion.h1
          variants={blurIn}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight"
        >
          Hi, I'm{" "}
          <span className="animate-gradient-text">Yash Rajbhar</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3"
        >
          <TypewriterRole />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className="mt-4 text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto px-2"
        >
          Building modern, scalable, and performance-driven web applications
          from frontend to backend.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-7 flex gap-3 justify-center flex-wrap"
        >
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            <MagneticButton
              href="#projects"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm
                bg-indigo-600 text-white hover:bg-indigo-700
                shadow-lg shadow-indigo-500/30 transition-colors"
            >
              View Projects
            </MagneticButton>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            <MagneticButton
              href="#contact"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm
                border border-indigo-600 text-indigo-600
                hover:bg-indigo-600 hover:text-white
                dark:border-indigo-400 dark:text-indigo-400
                dark:hover:bg-indigo-500 transition-colors"
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        <StatPills />
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
