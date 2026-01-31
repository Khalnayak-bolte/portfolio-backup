import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const glowX = useSpring(mouseX, { stiffness: 250, damping: 35 });
  const glowY = useSpring(mouseY, { stiffness: 250, damping: 35 });

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 30 });

  const DOT = 6;
  const RING = 40;
  const GLOW = 64;

  const glowCX = useTransform(glowX, (v) => v - GLOW / 2);
  const glowCY = useTransform(glowY, (v) => v - GLOW / 2);

  const ringCX = useTransform(ringX, (v) => v - RING / 2);
  const ringCY = useTransform(ringY, (v) => v - RING / 2);

  const dotCX = useTransform(mouseX, (v) => v - DOT / 2);
  const dotCY = useTransform(mouseY, (v) => v - DOT / 2);

  const [hover, setHover] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [trail, setTrail] = useState([]);

  const trailTimeout = useRef(null);

  const idRef = useRef(0);
  const createId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  const isDark = document.documentElement.classList.contains("dark");

  const glowColor = isDark
    ? "rgba(99,102,241,0.35)"
    : "rgba(59,130,246,0.35)";
  const ringColor = isDark ? "#818cf8" : "#2563eb";
  const dotColor = isDark ? "#a5b4fc" : "#1d4ed8";

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // ✨ Cursor trail (max 6)
      setTrail((prev) => [
        ...prev.slice(-5),
        { x: e.clientX, y: e.clientY, id: createId() },
      ]);

      clearTimeout(trailTimeout.current);
      trailTimeout.current = setTimeout(() => setTrail([]), 120);
    };

    const click = (e) => {
      setRipples((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: createId() },
      ]);

      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
    };

    const enter = () => setHover(true);
    const leave = () => setHover(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    document.querySelectorAll(".cursor-hover").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ✨ Cursor Trail */}
      {trail.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.3 }}
          style={{
            left: t.x - 3,
            top: t.y - 3,
            backgroundColor: dotColor,
          }}
          className="pointer-events-none fixed z-[9997]
            w-[6px] h-[6px] rounded-full"
        />
      ))}

      {/* 💧 Click Ripple */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0.2, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: r.x - 25,
            top: r.y - 25,
            borderColor: ringColor,
          }}
          className="pointer-events-none fixed z-[9998]
            w-12 h-12 rounded-full border"
        />
      ))}

      {/* 🌈 Glow */}
      <motion.div
        style={{ x: glowCX, y: glowCY, backgroundColor: glowColor }}
        animate={{ scale: hover ? 1.6 : 1 }}
        className="pointer-events-none fixed z-[9999]
          w-16 h-16 rounded-full blur-2xl"
      />

      {/* ⭕ Ring */}
      <motion.div
        style={{ x: ringCX, y: ringCY, borderColor: ringColor }}
        animate={{ scale: hover ? 1.4 : 1, opacity: hover ? 0.9 : 0.6 }}
        className="pointer-events-none fixed z-[9999]
          w-10 h-10 rounded-full border"
      />

      {/* 🎯 Dot */}
      <motion.div
        style={{ x: dotCX, y: dotCY, backgroundColor: dotColor }}
        animate={{ scale: hover ? 0.4 : 1 }}
        className="pointer-events-none fixed z-[9999]
          w-[6px] h-[6px] rounded-full"
      />
    </>
  );
};

export default CustomCursor;
