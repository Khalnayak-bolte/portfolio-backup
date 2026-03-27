import { motion } from "framer-motion";

const GradientButton = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative px-6 py-2.5 rounded-full font-semibold text-sm
        text-white
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        shadow-lg shadow-indigo-500/30
        hover:shadow-pink-500/40
        overflow-hidden
        ${className}
      `}
    >
      {/* Shimmer — pure CSS, no JS */}
      <span className="pointer-events-none absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700" />

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
};

export default GradientButton;
