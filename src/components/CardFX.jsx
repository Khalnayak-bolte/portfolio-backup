import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const CardFX = ({ children, className = "" }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 18 });

  const [hovered, setHovered] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    x.set((px - rect.width / 2) / 14);
    y.set(-(py - rect.height / 2) / 14);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setShimmer(true);
    setTimeout(() => setShimmer(false), 700);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`neon-card group relative rounded-2xl ${className}`}
    >
      {/* Animated border glow */}
      <span
        className="neon-border pointer-events-none absolute inset-0 rounded-2xl z-0"
        aria-hidden
      />

      {/* Shimmer sweep on hover enter */}
      {shimmer && (
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl z-[2] overflow-hidden"
          aria-hidden
        >
          <span
            className="absolute top-0 left-0 h-full w-[60%]"
            style={{
              background:
                "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)",
              animation: "shimmerSweep 0.7s ease forwards",
            }}
          />
        </span>
      )}

      {/* Corner accent dots */}
      {hovered && (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-indigo-400 z-[3]"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 z-[3]"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-purple-400 z-[3]"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-pink-400 z-[3]"
          />
        </>
      )}

      {/* Content layer */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 pointer-events-auto rounded-2xl
          bg-white text-gray-900
          dark:bg-[#0b0f1a] dark:text-white
          transition-colors"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default CardFX;
