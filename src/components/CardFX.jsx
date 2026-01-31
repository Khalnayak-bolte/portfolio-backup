import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const CardFX = ({ children, className = "" }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;

    x.set(px / 14);
    y.set(-py / 14);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        pointerEvents: "auto", // 🔑 CRITICAL FIX
      }}
      className={`neon-card group relative rounded-2xl ${className}`}
    >
      {/* 🔮 Decorative border — NEVER capture clicks */}
      <span
        className="neon-border pointer-events-none absolute inset-0 rounded-2xl z-0"
        aria-hidden
      />

      {/* ✅ REAL CONTENT LAYER (FULLY CLICKABLE) */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="
          relative z-10
          pointer-events-auto
          rounded-2xl
          bg-white text-gray-900
          dark:bg-[#0b0f1a] dark:text-white
          transition-colors
        "
      >
        {children}
      </div>
    </motion.div>
  );
};

export default CardFX;
