import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";
import GradientButton from "../components/GradientButton";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto px-6">
        {/* 🔙 BACK BUTTON */}
        <div className="mb-12">
          <GradientButton onClick={() => navigate(-1)}>
            ← Back
          </GradientButton>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* RGB CIRCULAR PHOTO */}
          <div className="flex justify-center">
            <div className="rgb-avatar">
              <img src={profile} alt="Profile" />
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              About Me
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I’m a <strong>Full-Stack Developer</strong> focused on building
              scalable, real-world web applications using modern technologies.
              I enjoy working across the entire development lifecycle — from
              crafting intuitive user interfaces to designing secure backend
              systems and databases.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I have hands-on experience building full-stack projects using
              <strong> React, Node.js, Express, Firebase, and REST APIs</strong>,
              implementing features such as authentication, role-based access
              control, real-time data handling, and optimized database
              structures.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Previously, I worked as a <strong>Copywriter Intern at Jobbie</strong>,
              where I created role-specific resume content and professional
              documentation. This experience gave me strong insight into
              real-world hiring standards and how recruiters evaluate technical
              profiles and projects.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              My goal is to build applications that are not only visually
              appealing but also efficient, maintainable, and production-ready,
              while continuously improving my problem-solving and system design
              skills.
            </p>
            

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4">
              {/* 📄 DOWNLOAD RESUME */}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ y: -6, scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="
                  inline-flex items-center gap-2
                  px-7 py-3 rounded-full font-semibold
                  text-white bg-gradient-to-r
                  from-indigo-500 via-purple-500 to-pink-500
                  shadow-lg shadow-indigo-500/30
                  hover:shadow-pink-500/40
                "
              >
                Download Resume
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  →
                </motion.span>
              </motion.a>

              {/* 🔗 LINKEDIN BUTTON */}
              <motion.a
                href="https://www.linkedin.com/in/yash-rajbhar-5b6b622a3/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="
                  inline-flex items-center gap-2
                  px-7 py-3 rounded-full font-semibold
                  text-white bg-gradient-to-r
                  from-sky-500 via-blue-600 to-indigo-600
                  shadow-lg shadow-blue-500/30
                  hover:shadow-indigo-500/40
                "
              >
                LinkedIn
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
