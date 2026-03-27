import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp, zoomIn, staggerContainer, elasticPop } from "../animations/variants";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center
        bg-white dark:bg-gray-900 transition-colors overflow-hidden relative"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full
          bg-indigo-300/20 dark:bg-indigo-700/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full
          bg-pink-300/20 dark:bg-pink-700/10 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 flex flex-col items-center">

        {/* 404 number */}
        <motion.div variants={zoomIn} className="relative mb-6">
          <span className="text-[10rem] md:text-[14rem] font-extrabold leading-none
            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
            bg-clip-text text-transparent select-none">
            404
          </span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 text-4xl"
          >
            🔍
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.h1 variants={fadeUp} className="text-2xl md:text-3xl font-bold
          text-gray-900 dark:text-white mb-3">
          Page Not Found
        </motion.h1>

        <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400
          max-w-sm mb-10 text-sm md:text-base leading-relaxed">
          Looks like this page went missing. It might have been moved, deleted,
          or maybe it never existed.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={elasticPop} className="flex flex-wrap gap-4 justify-center">
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-full font-semibold text-sm
              text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              shadow-lg shadow-indigo-500/30 hover:shadow-pink-500/40 transition-shadow"
          >
            ← Back to Home
          </motion.button>

          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-full font-semibold text-sm
              border border-indigo-500 text-indigo-600
              hover:bg-indigo-600 hover:text-white
              dark:border-indigo-400 dark:text-indigo-400
              dark:hover:bg-indigo-500 transition-colors"
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NotFound;
