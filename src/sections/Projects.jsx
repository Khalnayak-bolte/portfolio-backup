import { motion, AnimatePresence } from "framer-motion";
import {
  fadeUp, fadeLeft, fadeRight, zoomIn,
  staggerContainer, fastStagger, elasticPop, slideUpFade,
} from "../animations/variants";
import CardFX from "../components/CardFX";
import { useState } from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Attendance Management System",
    short: "Role-based attendance tracking system for admins and students.",
    full: "A full-stack attendance management system built with React and Firebase. Features include role-based authentication, subject-wise attendance tracking, CSV import for students, real-time attendance summaries, and optimized Firestore data structure for scalability.",
    tech: ["React", "Firebase Auth", "Firestore", "Tailwind CSS"],
    github: "https://github.com/Khalnayak-bolte/project-attendance",
    demo: null,
    icon: "📋",
    color: "from-indigo-500 to-cyan-500",
  },
  {
    title: "Learning Management System (LMS)",
    short: "Full-stack LMS with authentication, courses, and assignments.",
    full: "A cyberpunk-themed full-stack LMS developed using React, Node.js, Express, and Firebase. Implemented role-based access for Admins, Instructors, and Students, secure authentication, course management, assignments, quizzes, notices, and file uploads with scalable backend architecture.",
    tech: ["React", "Node.js", "Express", "Firebase Auth", "Firestore", "Firebase Storage"],
    github: "https://github.com/Khalnayak-bolte/lms-frontend",
    demo: null,
    icon: "🎓",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Quizzers",
    short: "Interactive quiz application with real-time data.",
    full: "A quiz application built using Flutter and Firebase, featuring secure authentication, real-time quiz data, structured Firestore database design, and a responsive Material UI. Focused on performance, scalability, and smooth user experience.",
    tech: ["Flutter", "Firebase Auth", "Firestore"],
    github: "https://github.com/Khalnayak-bolte/Quizzers",
    demo: null,
    icon: "🧠",
    color: "from-cyan-500 to-blue-500",
  },
];

const cardVariants = [fadeLeft, fadeUp, fadeRight];

const Projects = () => {
  const [active, setActive] = useState(null);

  return (
    <motion.section
      id="projects"
      className="relative py-20 md:py-24 bg-white dark:bg-gray-900 overflow-visible"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <motion.div variants={fadeUp} className="text-center mb-4">
          <p className="text-xs md:text-sm tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
            What I've built
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="animate-gradient-text">Projects</span>
          </h2>
        </motion.div>

        <motion.div
          variants={zoomIn}
          className="mx-auto mt-4 mb-12 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div key={i} variants={cardVariants[i] || fadeUp}>
              <CardFX>
                <div className="p-5 md:p-6 flex flex-col h-full">

                  <div className="flex items-center gap-3 mb-3">
                    <motion.span
                      variants={elasticPop}
                      whileHover={{ rotate: [0, -15, 15, 0], transition: { duration: 0.4 } }}
                      className="text-2xl md:text-3xl"
                    >
                      {project.icon}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white leading-tight truncate">
                        {project.title}
                      </h3>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className={`h-0.5 rounded-full bg-gradient-to-r ${project.color} mt-0.5`}
                      />
                    </div>
                  </div>

                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setActive(active === i ? null : i)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={active === i ? "full" : "short"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                      >
                        {active === i ? project.full : project.short}
                      </motion.p>
                    </AnimatePresence>

                    <motion.p
                      animate={{ opacity: active === i ? 0 : 1 }}
                      className="text-xs text-indigo-400 mt-2"
                    >
                      Click to read more ↓
                    </motion.p>

                    <AnimatePresence>
                      {active === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <motion.div
                            variants={fastStagger}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-2"
                          >
                            {project.tech.map((tech, j) => (
                              <motion.span
                                key={j}
                                variants={elasticPop}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-2.5 py-1 text-xs rounded-full font-medium
                                  bg-indigo-50 text-indigo-600
                                  dark:bg-indigo-900/50 dark:text-indigo-300
                                  border border-indigo-100 dark:border-indigo-800"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div variants={slideUpFade} className="mt-5 flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 text-center px-3 py-2 rounded-lg text-xs md:text-sm font-semibold
                        border border-indigo-500 text-indigo-600
                        hover:bg-indigo-600 hover:text-white
                        dark:text-indigo-400 dark:border-indigo-400
                        dark:hover:bg-indigo-500 transition-colors"
                    >
                      GitHub
                    </motion.a>

                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 text-center px-3 py-2 rounded-lg text-xs md:text-sm font-semibold
                          bg-indigo-600 text-white hover:bg-indigo-700
                          dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                      >
                        Live Demo
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </CardFX>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-12 md:mt-16 flex justify-center">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3 rounded-full font-semibold text-sm
                text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                shadow-lg shadow-indigo-500/30 hover:shadow-pink-500/40"
            >
              View More Projects →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
