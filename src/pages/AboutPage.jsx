import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";
import GradientButton from "../components/GradientButton";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  zoomIn,
  blurIn,
  elasticPop,
  fastStagger,
  staggerContainer,
  slideUpFade,
} from "../animations/variants";

/* ── Timeline data ──────────────────────────────────────── */
const timeline = [
  {
    year: "2024",
    title: "Copywriter Intern — Jobbie",
    desc: "Created role-specific resume content and professional documentation, gaining insight into real-world hiring standards.",
    icon: "✍️",
    color: "from-indigo-500 to-purple-500",
  },
  {
    year: "2023",
    title: "Built Full-Stack LMS",
    desc: "Developed a cyberpunk-themed Learning Management System with React, Node.js, Express, and Firebase featuring multi-role access.",
    icon: "🎓",
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2023",
    title: "Built Attendance Management System",
    desc: "Designed and deployed a full-stack attendance tracker with role-based auth, CSV imports, and real-time Firestore data.",
    icon: "📋",
    color: "from-cyan-500 to-blue-500",
  },
  {
    year: "2022",
    title: "Started Full-Stack Journey",
    desc: "Began learning React, Node.js, and Firebase — building personal projects and exploring the full web development lifecycle.",
    icon: "🚀",
    color: "from-emerald-500 to-teal-500",
  },
];

/* ── Interests / fun facts ──────────────────────────────── */
const interests = [
  { icon: "⚡", label: "Fast UIs" },
  { icon: "🔐", label: "Auth Systems" },
  { icon: "☁️", label: "Cloud Apps" },
  { icon: "🎨", label: "Clean Design" },
  { icon: "🧩", label: "Problem Solving" },
  { icon: "📱", label: "Mobile First" },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="min-h-screen py-24 bg-white dark:bg-gray-900 transition-colors overflow-x-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Back button */}
        <motion.div variants={fadeUp} className="mb-12">
          <GradientButton onClick={() => navigate(-1)}>← Back</GradientButton>
        </motion.div>

        {/* ── HERO ROW ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

          {/* Profile photo */}
          <motion.div variants={fadeLeft} className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="rgb-avatar"
            >
              <img src={profile} alt="Profile" />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div variants={staggerContainer} className="flex flex-col gap-4">

            {/* Label */}
            <motion.p
              variants={slideUpFade}
              className="text-sm tracking-widest text-indigo-500 dark:text-indigo-400 uppercase"
            >
              Full-Stack Developer
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={blurIn}
              className="text-4xl font-bold text-gray-900 dark:text-white"
            >
              About <span className="animate-gradient-text">Me</span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              variants={zoomIn}
              className="h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />

            {/* Paragraphs staggered */}
            {[
              <>I'm a <strong>Full-Stack Developer</strong> focused on building scalable, real-world web applications using modern technologies. I enjoy working across the entire development lifecycle — from crafting intuitive user interfaces to designing secure backend systems and databases.</>,
              <>I have hands-on experience building full-stack projects using <strong>React, Node.js, Express, Firebase, and REST APIs</strong>, implementing features such as authentication, role-based access control, real-time data handling, and optimized database structures.</>,
              <>Previously, I worked as a <strong>Copywriter Intern at Jobbie</strong>, where I created role-specific resume content and professional documentation — giving me strong insight into real-world hiring standards.</>,
              <>My goal is to build applications that are not only visually appealing but also efficient, maintainable, and production-ready, while continuously improving my problem-solving and system design skills.</>,
            ].map((para, i) => (
              <motion.p
                key={i}
                variants={slideUpFade}
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm"
              >
                {para}
              </motion.p>
            ))}

            {/* Action buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-2">
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ y: -6, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex items-center gap-2
                  px-7 py-3 rounded-full font-semibold
                  text-white bg-gradient-to-r
                  from-indigo-500 via-purple-500 to-pink-500
                  shadow-lg shadow-indigo-500/30
                  hover:shadow-pink-500/40"
              >
                Download Resume
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/yash-rajbhar-5b6b622a3/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex items-center gap-2
                  px-7 py-3 rounded-full font-semibold
                  text-white bg-gradient-to-r
                  from-sky-500 via-blue-600 to-indigo-600
                  shadow-lg shadow-blue-500/30
                  hover:shadow-indigo-500/40"
              >
                LinkedIn
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── INTERESTS ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            What I{" "}
            <span className="animate-gradient-text">Care About</span>
          </motion.h2>

          <motion.div
            variants={fastStagger}
            className="flex flex-wrap gap-4 justify-center"
          >
            {interests.map((item, i) => (
              <motion.div
                key={i}
                variants={elasticPop}
                whileHover={{ scale: 1.12, y: -5, rotate: [-2, 2, 0] }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full
                  bg-indigo-50 dark:bg-indigo-900/20
                  border border-indigo-100 dark:border-indigo-800
                  text-gray-700 dark:text-gray-300 font-medium text-sm
                  cursor-default"
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── TIMELINE ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center"
          >
            My{" "}
            <span className="animate-gradient-text">Journey</span>
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 origin-top"
            />

            <div className="flex flex-col gap-10 pl-16">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeRight}
                  className="relative"
                >
                  {/* Dot on line */}
                  <motion.div
                    variants={elasticPop}
                    className={`absolute -left-[2.75rem] top-1 w-5 h-5 rounded-full
                      bg-gradient-to-br ${item.color}
                      shadow-lg flex items-center justify-center text-[10px]`}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-5 rounded-xl
                      bg-gray-50 dark:bg-gray-800/60
                      border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                        bg-gradient-to-r ${item.color} text-white`}>
                        {item.year}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutPage;
