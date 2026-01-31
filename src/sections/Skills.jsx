import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/variants";
import CardFX from "../components/CardFX";
import TiltCard from "../components/effects/TiltCard";

const skillGroups = [
  {
    title: "Frontend Development",
    skills: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive UI / UX",
    ],
  },
  {
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "REST APIs",
      "Authentication & Authorization",
    ],
  },
  {
    title: "Database & Cloud",
    skills: [
      "Firebase Authentication",
      "Firestore",
      "Firebase Storage",
      "Firebase Hosting",
      "MySQL",
    ],
  },
  {
    title: "Full-Stack Practices",
    skills: [
      "Role-Based Access Control",
      "CRUD Operations",
      "JWT Authentication",
      "API Integration",
      "Real-Time Data Handling",
      "MVC Architecture",
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      "Git",
      "GitHub",
      "Vite",
      "Postman",
      "VS Code",
      "Render",
    ],
  },
];

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-24 bg-white dark:bg-gray-900 transition-colors"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          My{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Skills
          </span>
        </motion.h2>

        {/* Skill Groups */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillGroups.map((group, index) => (
            <motion.div key={index} variants={fadeUp}>
              <TiltCard>
                <CardFX>
                  <div className="p-6 h-full">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      {group.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="
                            px-3 py-1 text-sm rounded-full
                            bg-indigo-100 text-indigo-700
                            dark:bg-indigo-900/60 dark:text-indigo-300
                          "
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardFX>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
