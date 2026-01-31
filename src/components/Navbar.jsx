import { motion } from "framer-motion";
import { navItem, staggerContainer } from "../animations/variants";
import { useLocation, useNavigate } from "react-router-dom";
import GradientButton from "./GradientButton";

const links = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Navbar = ({ dark, setDark, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openProjectModal = () => {
    window.dispatchEvent(new Event("open-project-modal"));
  };

  const openCrewModal = () => {
    window.dispatchEvent(new Event("open-crew-modal"));
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          Portfolio
        </h1>

        {/* Nav */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex gap-6 items-center text-gray-700 dark:text-gray-300 font-medium"
        >
          {links.map((link, i) => (
            <motion.li
              key={i}
              variants={navItem}
              className="relative group cursor-pointer"
              onClick={() => handleNavClick(link.id)}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-600 group-hover:w-full transition-all" />
            </motion.li>
          ))}

          {/* 🔥 START A PROJECT */}
          <motion.li variants={navItem}>
            <GradientButton onClick={openProjectModal}>
              Start a Project
            </GradientButton>
          </motion.li>

          {/* 🧑‍🤝‍🧑 JOIN MY CREW */}
          <motion.li variants={navItem}>
            <GradientButton onClick={openCrewModal}>
              Join My Crew
            </GradientButton>
          </motion.li>

          {/* 👤 LOGGED IN USER */}
          {user && (
            <motion.li
              variants={navItem}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />
              )}
              <span className="text-sm text-gray-800 dark:text-gray-200 max-w-[140px] truncate">
                {user.email}
              </span>
            </motion.li>
          )}

          {/* 🌙 THEME */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 px-3 py-1 rounded-lg border text-sm
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </motion.ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
