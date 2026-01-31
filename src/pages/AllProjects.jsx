import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/variants";
import CardFX from "../components/CardFX";
import TiltCard from "../components/effects/TiltCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "../components/GradientButton";

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
      "Full-stack LMS with authentication and course management.",
    full:
      "A complete Learning Management System developed using React, Node.js, Express, and Firebase. Features include role-based access for Admins, Instructors, and Students, secure authentication, course management, assignments, quizzes, notices, and file uploads.",
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
    title: "WorkZen (HR System)",
    short:
      "Employee management and HR system.",
    full:
      "A full-stack HR management system designed to handle employee records, authentication, attendance tracking, and reporting with structured backend workflows.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    github: "https://github.com/your-username/workzen",
    demo: "#",
  },
  {
    title: "Portfolio Website",
    short:
      "Premium animated developer portfolio.",
    full:
      "A modern, animated portfolio built with React, Vite, Tailwind CSS, and Framer Motion. Includes dark/light mode, page transitions, RGB effects, custom cursor, and responsive layout.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/your-username/portfolio",
    demo: "#",
  },
];

const buttonAnim = {
  hover: { y: -4, scale: 1.05 },
  tap: { scale: 0.95 },
};

const AllProjects = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  return (
    <motion.section
      className="relative min-h-screen py-24 bg-white dark:bg-gray-900"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔙 BACK BUTTON */}
        <div className="mb-14">
          <GradientButton onClick={() => navigate(-1)}>
            ← Back
          </GradientButton>
        </div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          All{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Projects
          </span>
        </motion.h1>

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
                    {/* Content */}
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
      </div>
    </motion.section>
  );
};

export default AllProjects;
