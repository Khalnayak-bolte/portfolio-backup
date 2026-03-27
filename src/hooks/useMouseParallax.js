import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const useMouseParallax = (divisor = 80) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 });

  const rafRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      /* Throttle via requestAnimationFrame — fires max once per frame */
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        x.set((e.clientX - cx) / divisor);
        y.set((e.clientY - cy) / divisor);
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [divisor, x, y]);

  return { x: smoothX, y: smoothY };
};

export default useMouseParallax;
