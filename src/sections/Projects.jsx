import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/variants";
import CardFX from "../components/CardFX";
import TiltCard from "../components/effects/TiltCard";
import { useState } from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Attendance Management System",
    short:
      "Role-based attendance tracking system for admins and students.",
    full:
      "A full-stack attendance management system built with React and Firebase. Features include role-based authentication, subject-wise attendance tracking, CSV import for students, real-time attendance summaries, and optimized Firestore data structure for scalability.",
    tech: ["React", "Firebase Auth", "Firestore", "Tailwind CSS"],
    github: "https://github.com/your-username/attendance-management-system",
    demo: "https://attendance-demo.com",
  },
  {
    title: "Learning Management System (LMS)",
    short:
      "Full-stack LMS with authentication, courses, and assignments.",
    full:
      "A cyberpunk-themed full-stack LMS developed using React, Node.js, Express, and Firebase. Implemented role-based access for Admins, Instructors, and Students, secure authentication, course management, assignments, quizzes, notices, and file uploads with scalable backend architecture.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
    ],
    github: "https://github.com/your-username/lms-platform",
    demo: "https://lms-demo.com",
  },
  {
    title: "Quizzers",
    short:
      "Interactive quiz application with real-time data.",
    full:
      "A quiz application built using Flutter and Firebase, featuring secure authentication, real-time quiz data, structured Firestore database design, and a responsive Material UI. Focused on performance, scalability, and smooth user experience.",
    tech: ["Flutter", "Firebase Auth", "Firestore"],
    github: "https://github.com/your-username/quizzers",
    demo: "https://quizzers-demo.com",
  },
];

const buttonAnim = {
  hover: { y: -4, scale: 1.05 },
  tap: { scale: 0.95 },
};

const Projects = () => {
  const [active, setActive] = useState(null);

  return (
    <motion.section
      id="projects"
      className="relative py-20 bg-white dark:bg-gray-900 overflow-visible"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          My{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Projects
          </span>
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TiltCard>
                <CardFX>
                  <div className="p-6 flex flex-col h-full">
                    {/* Card Content */}
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() =>
                        setActive(active === i ? null : i)
                      }
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300">
                        {active === i
                          ? project.full
                          : project.short}
                      </p>

                      {active === i && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, j) => (
                              <span
                                key={j}
                                className="px-3 py-1 text-sm rounded-full
                                bg-indigo-100 text-indigo-600
                                dark:bg-indigo-900/60 dark:text-indigo-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-6 flex gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={buttonAnim}
                        whileHover="hover"
                        whileTap="tap"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold
                        border border-indigo-500 text-indigo-600
                        hover:bg-indigo-600 hover:text-white
                        dark:text-indigo-400 dark:border-indigo-400
                        dark:hover:bg-indigo-500 transition-colors"
                      >
                        GitHub
                      </motion.a>

                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={buttonAnim}
                        whileHover="hover"
                        whileTap="tap"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold
                        bg-indigo-600 text-white
                        hover:bg-indigo-700
                        dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                      >
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </CardFX>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* VIEW MORE */}
        <motion.div variants={fadeUp} className="mt-16 flex justify-center">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="
                px-8 py-3 rounded-full font-semibold
                text-white bg-gradient-to-r
                from-indigo-500 via-purple-500 to-pink-500
                shadow-lg shadow-indigo-500/30
                hover:shadow-pink-500/40
              "
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
