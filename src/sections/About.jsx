import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  fadeUp, fadeLeft, fadeRight, zoomIn,
  staggerContainer, fastStagger, elasticPop,
} from "../animations/variants";
import { Link } from "react-router-dom";
import GradientButton from "../components/GradientButton";

/* ── Animated counter ── */
function CountUp({ target, suffix = "", duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Projects Built",    value: 10, suffix: "+" },
  { label: "Technologies Used", value: 15, suffix: "+" },
  { label: "Months Experience", value: 18, suffix: "+" },
];

const cards = [
  {
    icon: "🧑‍💻",
    title: "Who I Am",
    text: "I'm a Full-Stack Developer passionate about building scalable, real-world web applications. I enjoy designing clean user interfaces while also handling backend logic, authentication, and databases to deliver complete end-to-end solutions.",
    variant: fadeLeft,
    gradient: "from-indigo-500 to-purple-500",
    glow: "shadow-indigo-500/20",
    accent: "bg-indigo-500/10 dark:bg-indigo-500/10",
    border: "border-indigo-200 dark:border-indigo-500/20",
    iconBg: "from-indigo-500 to-purple-500",
  },
  {
    icon: "⚙️",
    title: "What I Do",
    text: "I build full-stack applications using React, Node.js, Express, and Firebase. My work includes role-based authentication, real-time data handling, API integration, and deploying production-ready apps with clean architecture.",
    variant: fadeUp,
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/20",
    accent: "bg-purple-500/10 dark:bg-purple-500/10",
    border: "border-purple-200 dark:border-purple-500/20",
    iconBg: "from-purple-500 to-pink-500",
  },
  {
    icon: "🎯",
    title: "My Focus",
    text: "I focus on creating efficient, maintainable, and scalable systems — from intuitive frontend experiences to robust backend services. I'm constantly improving my problem-solving skills and adapting to modern development practices.",
    variant: fadeRight,
    gradient: "from-cyan-500 to-indigo-500",
    glow: "shadow-cyan-500/20",
    accent: "bg-cyan-500/10 dark:bg-cyan-500/10",
    border: "border-cyan-200 dark:border-cyan-500/20",
    iconBg: "from-cyan-500 to-blue-500",
  },
];

/* ── Editorial card ── */
function AboutCard({ card, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={card.variant}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group"
    >
      {/* Glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${card.gradient}
          opacity-0 blur-lg -z-10 shadow-2xl ${card.glow}`}
      />

      {/* Card */}
      <div className={`relative h-full rounded-2xl p-6
        bg-white dark:bg-gray-800/80
        border ${card.border}
        backdrop-blur-sm
        transition-all duration-300
        overflow-hidden`}
      >
        {/* Top gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-0.5
          bg-gradient-to-r ${card.gradient}
          opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* Corner decoration */}
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full
          ${card.accent} -z-0 opacity-50`}
        />

        {/* Icon bubble */}
        <motion.div
          variants={elasticPop}
          whileHover={{ rotate: [0, -15, 15, -10, 10, 0], transition: { duration: 0.5 } }}
          className={`relative z-10 w-14 h-14 rounded-2xl mb-5
            bg-gradient-to-br ${card.iconBg}
            flex items-center justify-center text-2xl
            shadow-lg`}
        >
          {card.icon}
        </motion.div>

        {/* Number badge */}
        <div className={`absolute top-5 right-5 w-7 h-7 rounded-full
          bg-gradient-to-br ${card.gradient}
          flex items-center justify-center
          text-white text-xs font-bold opacity-30 group-hover:opacity-80
          transition-opacity duration-300`}
        >
          {index + 1}
        </div>

        <h3 className="relative z-10 text-xl font-bold mb-3 text-gray-900 dark:text-white">
          {card.title}
        </h3>
        <p className="relative z-10 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
          {card.text}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main ── */
const About = () => {
  return (
    <motion.section
      id="about"
      className="relative py-20 bg-white dark:bg-gray-900 transition-colors overflow-visible"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div variants={fadeUp} className="text-center mb-4">
          <p className="text-sm tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
            Get to know me
          </p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            About <span className="animate-gradient-text">Me</span>
          </h2>
        </motion.div>

        <motion.div
          variants={zoomIn}
          className="mx-auto mt-4 mb-14 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <AboutCard key={i} card={card} index={i} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          variants={fastStagger}
          className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={zoomIn}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center text-center
                px-4 py-5 rounded-2xl
                bg-indigo-50 dark:bg-indigo-900/20
                border border-indigo-100 dark:border-indigo-800"
            >
              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                <CountUp target={s.value} suffix={s.suffix} />
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div variants={fadeUp} className="mt-16 flex justify-center">
          <Link to="/about">
            <GradientButton>View More</GradientButton>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
