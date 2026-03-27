import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { navItem, staggerContainer, elasticPop } from "../animations/variants";
import { useLocation, useNavigate } from "react-router-dom";
import GradientButton from "./GradientButton";

const links = [
  { name: "Home",           id: "home" },
  { name: "About",          id: "about" },
  { name: "Skills",         id: "skills" },
  { name: "Projects",       id: "projects" },
  { name: "GitHub",         id: "github" },
  { name: "Certificates",   id: "certifications" },
  { name: "Contact",        id: "contact" },
];

const Navbar = ({ dark, setDark, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracker via IntersectionObserver */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openProjectModal = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event("open-project-modal"));
  };

  const openCrewModal = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event("open-crew-modal"));
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-white dark:bg-gray-900 shadow"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-xl font-bold cursor-pointer select-none"
          onClick={() => handleNavClick("home")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-indigo-600">Yash</span>
          <span className="text-gray-900 dark:text-white"> Rajbhar</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-indigo-500"
          >
            .
          </motion.span>
        </motion.h1>

        {/* Desktop Nav */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hidden md:flex gap-4 items-center text-gray-700 dark:text-gray-300 font-medium text-sm"
        >
          {links.map((link, i) => {
            const isActive = activeSection === link.id && location.pathname === "/";
            return (
              <motion.li
                key={i}
                variants={navItem}
                className="relative cursor-pointer"
                onClick={() => handleNavClick(link.id)}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {link.name}
                </motion.span>

                {/* Active indicator dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2
                        w-1 h-1 rounded-full bg-indigo-500"
                    />
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}

          <motion.li variants={navItem}>
            <GradientButton onClick={openProjectModal}>
              Start a Project
            </GradientButton>
          </motion.li>

          <motion.li variants={navItem}>
            <GradientButton onClick={openCrewModal}>
              Join My Crew
            </GradientButton>
          </motion.li>

          {user && (
            <motion.li
              variants={navItem}
              className="flex items-center gap-2 px-3 py-1 rounded-full
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700"
            >
              {user.photoURL && (
                <img src={user.photoURL} alt="avatar" className="w-7 h-7 rounded-full" />
              )}
              <span className="text-sm text-gray-800 dark:text-gray-200 max-w-[140px] truncate">
                {user.email}
              </span>
            </motion.li>
          )}

          {/* Theme toggle */}
          <motion.button
            variants={navItem}
            onClick={() => setDark(!dark)}
            whileHover={{ rotate: 20, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="ml-2 px-3 py-1 rounded-lg border text-sm
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <motion.span
              key={dark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="block"
            >
              {dark ? "☀️" : "🌙"}
            </motion.span>
          </motion.button>
        </motion.ul>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-3">
          <motion.button
            onClick={() => setDark(!dark)}
            whileHover={{ rotate: 20, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="px-3 py-1 rounded-lg border text-sm
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {dark ? "☀️" : "🌙"}
          </motion.button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden
              bg-white/95 dark:bg-gray-900/95 backdrop-blur-md
              border-t border-gray-100 dark:border-gray-800"
          >
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col px-6 py-4 gap-3
                text-gray-700 dark:text-gray-300 font-medium"
            >
              {links.map((link, i) => {
                const isActive = activeSection === link.id && location.pathname === "/";
                return (
                  <motion.li
                    key={i}
                    variants={elasticPop}
                    onClick={() => handleNavClick(link.id)}
                    className={`cursor-pointer py-1 flex items-center gap-2 transition-colors
                      ${isActive
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mobileActiveDot"
                        className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                      />
                    )}
                    {link.name}
                  </motion.li>
                );
              })}

              <motion.li variants={elasticPop}>
                <GradientButton onClick={openProjectModal}>
                  Start a Project
                </GradientButton>
              </motion.li>

              <motion.li variants={elasticPop}>
                <GradientButton onClick={openCrewModal}>
                  Join My Crew
                </GradientButton>
              </motion.li>

              {user && (
                <motion.li
                  variants={elasticPop}
                  className="flex items-center gap-2 px-3 py-1 rounded-full w-fit
                    bg-gray-100 dark:bg-gray-800
                    border border-gray-300 dark:border-gray-700"
                >
                  {user.photoURL && (
                    <img src={user.photoURL} alt="avatar" className="w-7 h-7 rounded-full" />
                  )}
                  <span className="text-sm text-gray-800 dark:text-gray-200 max-w-[200px] truncate">
                    {user.email}
                  </span>
                </motion.li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
