import { motion } from "framer-motion";
import useMagnetic from "../hooks/useMagnetic";

const MagneticButton = ({ href, className = "", children }) => {
  const { ref, x, y } = useMagnetic(0.4);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.a>
  );
};

export default MagneticButton;
