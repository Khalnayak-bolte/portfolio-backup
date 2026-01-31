import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/variants";
import CardFX from "../components/CardFX";
import { Link } from "react-router-dom";
import GradientButton from "../components/GradientButton";

const About = () => {
  return (
    <motion.section
      id="about"
      className="relative py-20 bg-white dark:bg-gray-900 transition-colors overflow-visible"
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
          About{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Me
          </span>
        </motion.h2>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {[
            {
              title: "🧑‍💻 Who I Am",
              text: "I’m a Full-Stack Developer passionate about building scalable, real-world web applications. I enjoy designing clean user interfaces while also handling backend logic, authentication, and databases to deliver complete end-to-end solutions.",
            },
            {
              title: "⚙️ What I Do",
              text: "I build full-stack applications using React, Node.js, Express, and Firebase. My work includes role-based authentication, real-time data handling, API integration, and deploying production-ready apps with clean architecture and secure workflows.",
            },
            {
              title: "🎯 My Focus",
              text: "I focus on creating efficient, maintainable, and scalable systems—from intuitive frontend experiences to robust backend services. I’m constantly improving my problem-solving skills and adapting to modern development practices.",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <CardFX>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </div>
              </CardFX>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔥 UPGRADED VIEW MORE BUTTON */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex justify-center"
        >
          <Link to="/about">
            <GradientButton>
              View More
            </GradientButton>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
