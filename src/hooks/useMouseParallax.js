import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();

      const offsetX =
        (e.clientX - rect.left - rect.width / 2) * strength;
      const offsetY =
        (e.clientY - rect.top - rect.height / 2) * strength;

      x.set(offsetX);
      y.set(offsetY);
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength, x, y]);

  return { ref, x: smoothX, y: smoothY };
};

export default useMagnetic;
