import { motion, useScroll, useTransform } from "framer-motion";
import DecorativeShapes from "../components/DecorativeShapes";
import useMouseParallax from "../hooks/useMouseParallax";
import MagneticButton from "../components/MagneticButton";

const Hero = () => {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 600], [0, -80]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);
  const buttonY = useTransform(scrollY, [0, 600], [0, -20]);

  const bgMouse = useMouseParallax(90);
  const shapeMouse = useMouseParallax(60);
  const textMouse = useMouseParallax(130);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <motion.div
        style={{ y: bgY, x: bgMouse.x }}
        className="absolute inset-0
                   bg-gradient-to-br
                   from-indigo-100 via-white to-cyan-100
                   dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      />

      {/* Decorative Shapes */}
      <motion.div
        style={{ x: shapeMouse.x, y: shapeMouse.y }}
        className="absolute inset-0"
      >
        <DecorativeShapes />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, x: textMouse.x }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
          Hi, I’m <span className="text-indigo-600">Yash Rajbhar</span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Full-Stack Developer building modern, scalable, and performance-driven web applications from frontend to backend.
        </p>

        {/* Animated + Magnetic Buttons */}
        <motion.div
          style={{ y: buttonY }}
          className="mt-8 flex gap-4 justify-center"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MagneticButton
              href="#projects"
              className="
                px-6 py-3 rounded-xl font-semibold
                bg-indigo-600 text-white
                hover:bg-indigo-700
                transition-colors
              "
            >
              View Projects
            </MagneticButton>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MagneticButton
              href="#contact"
              className="
                px-6 py-3 rounded-xl font-semibold
                border border-indigo-600 text-indigo-600
                hover:bg-indigo-600 hover:text-white
                dark:border-indigo-400 dark:text-indigo-400
                dark:hover:bg-indigo-500
                transition-colors
              "
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
