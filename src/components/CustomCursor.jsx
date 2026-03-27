import { useMotionValue, useSpring, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  /* All position tracking via motionValues — zero React re-renders on move */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.8 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.8 });

  const DOT  = 6;
  const RING = 36;
  const GLOW = 60;

  /* Only ripples need state — they're infrequent (on click only) */
  const [ripples, setRipples] = useState([]);
  const [hovered, setHovered] = useState(false);

  const idRef = useRef(0);
  const rafRef = useRef(null);

  const isDark = document.documentElement.classList.contains("dark");
  const ringColor = isDark ? "#818cf8" : "#4f46e5";
  const dotColor  = isDark ? "#a5b4fc" : "#3730a3";
  const glowColor = isDark ? "rgba(99,102,241,0.3)" : "rgba(79,70,229,0.25)";

  useEffect(() => {
    const move = (e) => {
      /* Throttle to one update per animation frame */
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        rafRef.current = null;
      });
    };

    const click = (e) => {
      idRef.current += 1;
      const id = idRef.current;
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("click", click);

    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Glow — slowest, most lagged */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: `-${GLOW / 2}px`,
          translateY: `-${GLOW / 2}px`,
          backgroundColor: glowColor,
          willChange: "transform",
        }}
        animate={{ scale: hovered ? 1.8 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
        className="pointer-events-none fixed z-[99997] rounded-full blur-2xl"
        style={{
          width: GLOW,
          height: GLOW,
          x: glowX,
          y: glowY,
          translateX: `-${GLOW / 2}px`,
          translateY: `-${GLOW / 2}px`,
          backgroundColor: glowColor,
          willChange: "transform",
        }}
      />

      {/* Ring — medium lag */}
      <motion.div
        animate={{ scale: hovered ? 1.5 : 1, opacity: hovered ? 1 : 0.6 }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
        className="pointer-events-none fixed z-[99998] rounded-full border"
        style={{
          width: RING,
          height: RING,
          x: ringX,
          y: ringY,
          translateX: `-${RING / 2}px`,
          translateY: `-${RING / 2}px`,
          borderColor: ringColor,
          willChange: "transform",
        }}
      />

      {/* Dot — snaps instantly to cursor */}
      <motion.div
        animate={{ scale: hovered ? 0.4 : 1 }}
        className="pointer-events-none fixed z-[99999] rounded-full"
        style={{
          width: DOT,
          height: DOT,
          x: mouseX,
          y: mouseY,
          translateX: `-${DOT / 2}px`,
          translateY: `-${DOT / 2}px`,
          backgroundColor: dotColor,
          willChange: "transform",
        }}
      />

      {/* Click ripples — only on click, infrequent */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0.2, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-none fixed z-[99998] rounded-full border"
            style={{
              width: 40,
              height: 40,
              left: r.x - 20,
              top: r.y - 20,
              borderColor: ringColor,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
