import { motion, useMotionValue, useTransform } from "framer-motion";

const GradientButton = ({ children, onClick, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-20, 20], [6, -6]);
  const rotateY = useTransform(x, [-20, 20], [-6, 6]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      onClick={onClick}              /* ✅ FIX */
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative px-8 py-3 rounded-full font-semibold
        text-white
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        shadow-lg shadow-indigo-500/30
        hover:shadow-pink-500/40
        overflow-hidden
        ${className}
      `}
    >
      {/* SHIMMER */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)]
          translate-x-[-100%]
          hover:translate-x-[100%]
          transition-transform duration-700
        "
      />

      {/* CONTENT */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
};

export default GradientButton;
