import { motion } from "framer-motion";

const FloatingShape = ({ size, x, y, delay, opacity }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [0, -25, 0] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className={`absolute ${size} rounded-full blur-2xl`}
    style={{
      left: x,
      top: y,
      background: "linear-gradient(135deg, #6366f1, #22d3ee)",
      opacity,
    }}
  />
);

const DecorativeShapes = () => {
  return (
    <>
      <FloatingShape size="w-40 h-40" x="10%" y="20%" delay={0} opacity={0.25} />
      <FloatingShape size="w-28 h-28" x="75%" y="30%" delay={1.2} opacity={0.2} />
      <FloatingShape size="w-52 h-52" x="40%" y="70%" delay={2.2} opacity={0.18} />
    </>
  );
};

export default DecorativeShapes;
