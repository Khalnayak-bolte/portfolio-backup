import { motion } from "framer-motion";

/* Reduced to fewer elements — each uses will-change: transform for GPU compositing */

const FloatingOrb = ({ size, x, y, delay, opacity, colorA, colorB }) => (
  <motion.div
    animate={{ y: [0, -24, 0], scale: [1, 1.07, 1] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute ${size} rounded-full blur-2xl pointer-events-none`}
    style={{
      left: x, top: y,
      background: `radial-gradient(circle at 30% 30%, ${colorA}, ${colorB})`,
      opacity,
      willChange: "transform",
    }}
  />
);

const SpinningRing = ({ size, x, y, delay, opacity, color }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 16, repeat: Infinity, ease: "linear", delay }}
    className={`absolute ${size} rounded-full pointer-events-none`}
    style={{
      left: x, top: y,
      border: `1.5px solid ${color}`,
      opacity,
      willChange: "transform",
    }}
  />
);

const PulsingDot = ({ x, y, delay, color }) => (
  <motion.div
    animate={{ scale: [0, 1.3, 0], opacity: [0, 0.8, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    className="absolute w-3 h-3 rounded-full pointer-events-none"
    style={{
      left: x, top: y,
      backgroundColor: color,
      willChange: "transform, opacity",
    }}
  />
);

const FloatingSquare = ({ x, y, delay, opacity, size }) => (
  <motion.div
    animate={{ rotate: [0, 180, 360], y: [0, -16, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay }}
    className="absolute pointer-events-none rounded-md"
    style={{
      left: x, top: y,
      width: `${size}px`, height: `${size}px`,
      border: "1.5px solid rgba(34,211,238,0.4)",
      opacity,
      willChange: "transform",
    }}
  />
);

const DecorativeShapes = () => {
  return (
    <>
      {/* Orbs — reduced from 4 to 3 */}
      <FloatingOrb size="w-48 h-48" x="5%"  y="15%" delay={0}   opacity={0.2}  colorA="#6366f1" colorB="#22d3ee" />
      <FloatingOrb size="w-32 h-32" x="78%" y="10%" delay={1.5} opacity={0.16} colorA="#a855f7" colorB="#ec4899" />
      <FloatingOrb size="w-52 h-52" x="55%" y="65%" delay={2.5} opacity={0.13} colorA="#22d3ee" colorB="#6366f1" />

      {/* Rings — reduced from 3 to 2 */}
      <SpinningRing size="w-20 h-20" x="88%" y="55%" delay={0}   opacity={0.3} color="rgba(99,102,241,0.5)" />
      <SpinningRing size="w-14 h-14" x="12%" y="48%" delay={2}   opacity={0.25} color="rgba(34,211,238,0.4)" />

      {/* Pulsing dots — reduced from 5 to 3 */}
      <PulsingDot x="30%" y="22%" delay={0}   color="#6366f1" />
      <PulsingDot x="65%" y="40%" delay={1.4} color="#22d3ee" />
      <PulsingDot x="80%" y="78%" delay={2.8} color="#a855f7" />

      {/* Squares — reduced from 4 to 2 */}
      <FloatingSquare x="8%"  y="5%"  delay={0.3} opacity={0.22} size={20} />
      <FloatingSquare x="93%" y="15%" delay={1.8} opacity={0.18} size={14} />
    </>
  );
};

export default DecorativeShapes;
