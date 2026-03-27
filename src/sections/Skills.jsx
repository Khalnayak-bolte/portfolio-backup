import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  zoomIn,
  fastStagger,
  elasticPop,
  staggerContainer,
} from "../animations/variants";
import CardFX from "../components/CardFX";

const skillGroups = [
  {
    title: "Frontend Development",
    icon: "🎨",
    color: "from-indigo-500 to-cyan-500",
    variant: fadeLeft,
    skills: [
      { name: "React.js",           level: 90 },
      { name: "JavaScript (ES6+)",  level: 88 },
      { name: "HTML5",              level: 95 },
      { name: "CSS3",               level: 90 },
      { name: "Tailwind CSS",       level: 92 },
      { name: "Framer Motion",      level: 75 },
      { name: "Responsive UI / UX", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    color: "from-purple-500 to-pink-500",
    variant: fadeUp,
    skills: [
      { name: "Node.js",                       level: 80 },
      { name: "Express.js",                    level: 82 },
      { name: "PHP",                           level: 70 },
      { name: "REST APIs",                     level: 85 },
      { name: "Authentication & Authorization", level: 88 },
    ],
  },
  {
    title: "Database & Cloud",
    icon: "☁️",
    color: "from-cyan-500 to-blue-500",
    variant: fadeRight,
    skills: [
      { name: "Firebase Auth",    level: 90 },
      { name: "Firestore",        level: 88 },
      { name: "Firebase Storage", level: 82 },
      { name: "Firebase Hosting", level: 85 },
      { name: "MySQL",            level: 75 },
    ],
  },
  {
    title: "Full-Stack Practices",
    icon: "🏗️",
    color: "from-orange-500 to-yellow-500",
    variant: fadeLeft,
    skills: [
      { name: "Role-Based Access Control", level: 88 },
      { name: "CRUD Operations",           level: 95 },
      { name: "JWT Authentication",        level: 82 },
      { name: "API Integration",           level: 85 },
      { name: "Real-Time Data Handling",   level: 80 },
      { name: "MVC Architecture",          level: 78 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "🛠️",
    color: "from-emerald-500 to-teal-500",
    variant: fadeRight,
    skills: [
      { name: "Git",     level: 88 },
      { name: "GitHub",  level: 90 },
      { name: "Vite",    level: 85 },
      { name: "Postman", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Render",  level: 75 },
    ],
  },
];

function SkillBar({ name, level, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} variants={elasticPop} custom={index} className="group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300
          group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.4 }}
          className="text-xs text-gray-400 dark:text-gray-500 font-mono"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />
      </div>
    </motion.div>
  );
}

function SkillCard({ group, index }) {
  return (
    <motion.div variants={index % 2 === 0 ? group.variant : fadeUp}>
      <CardFX>
        <div className="p-5 md:p-6 h-full">
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              variants={zoomIn}
              whileHover={{ rotate: [0, -15, 15, 0], transition: { duration: 0.4 } }}
              className="text-2xl md:text-3xl"
            >
              {group.icon}
            </motion.div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                {group.title}
              </h3>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`h-0.5 rounded-full bg-gradient-to-r ${group.color} mt-0.5`}
              />
            </div>
          </div>

          <motion.div variants={fastStagger} className="flex flex-col gap-3">
            {group.skills.map((skill, i) => (
              <SkillBar key={i} name={skill.name} level={skill.level} index={i} />
            ))}
          </motion.div>
        </div>
      </CardFX>
    </motion.div>
  );
}

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-20 md:py-24 bg-white dark:bg-gray-900 transition-colors"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <motion.div variants={fadeUp} className="text-center mb-4">
          <p className="text-xs md:text-sm tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
            What I work with
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            My <span className="animate-gradient-text">Skills</span>
          </h2>
        </motion.div>

        <motion.div
          variants={zoomIn}
          className="mx-auto mt-4 mb-12 md:mb-16 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {skillGroups.map((group, index) => (
            <SkillCard key={index} group={group} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
