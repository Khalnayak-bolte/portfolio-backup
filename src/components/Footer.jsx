import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, ArrowUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  zoomIn,
  fastStagger,
  elasticPop,
  staggerContainer,
} from "../animations/variants";

const navLinks = ["home", "about", "skills", "projects", "github", "certifications", "contact"];

const socials = [
  {
    icon: <Linkedin size={18} />,
    href: "https://www.linkedin.com/in/yash-rajbhar-5b6b622a3/",
    label: "LinkedIn",
    color: "hover:text-blue-500 hover:border-blue-500",
  },
  {
    icon: <Instagram size={18} />,
    href: "https://www.instagram.com/00__yashuuuuu_",
    label: "Instagram",
    color: "hover:text-pink-500 hover:border-pink-500",
  },
  {
    icon: <Github size={18} />,
    href: "https://github.com/Khalnayak-bolte",
    label: "GitHub",
    color: "hover:text-gray-900 dark:hover:text-white hover:border-gray-900 dark:hover:border-white",
  },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors relative"
    >
      {/* Scroll to top button */}
      <div className="flex justify-center -translate-y-5">
        <motion.button
          variants={elasticPop}
          onClick={scrollToTop}
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-10 h-10 rounded-full
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            text-white flex items-center justify-center
            shadow-lg shadow-indigo-500/30"
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

        {/* LEFT — brand */}
        <motion.div
          variants={fadeLeft}
          className="text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          <motion.h3
            whileHover={{ scale: 1.03 }}
            className="text-xl font-bold mb-3 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <span className="text-indigo-600">Yash</span>
            <span className="text-gray-900 dark:text-white"> Rajbhar</span>
          </motion.h3>

          <p className="mb-5 leading-relaxed">
            I'm a Full-Stack Developer passionate about building scalable,
            real-world web applications — from intuitive frontends to robust
            backend systems. Based in Maharashtra, India — open to opportunities
            globally.
          </p>

          {/* Social icons */}
          <motion.div variants={fastStagger} className="flex gap-3">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                variants={elasticPop}
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700
                  flex items-center justify-center
                  text-gray-500 dark:text-gray-400
                  transition-colors duration-200 ${s.color}`}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* CENTER — nav links */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-1 items-start md:items-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Navigation
          </h3>

          <motion.ul variants={fastStagger} className="flex flex-col gap-2">
            {navLinks.map((item, i) => (
              <motion.li key={i} variants={elasticPop}>
                <motion.button
                  onClick={() => handleNavClick(item)}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="capitalize text-gray-600 dark:text-gray-400
                    hover:text-indigo-600 dark:hover:text-indigo-400
                    transition-colors flex items-center gap-2"
                >
                  <motion.span
                    initial={{ width: 0 }}
                    whileHover={{ width: 12 }}
                    className="inline-block h-0.5 bg-indigo-500 rounded-full"
                  />
                  {item}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* RIGHT — contact */}
        <motion.div
          variants={fadeRight}
          className="flex flex-col gap-3 text-gray-600 dark:text-gray-400"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Contact
          </h3>

          {[
            {
              icon: <Mail size={15} className="text-indigo-500 shrink-0" />,
              content: (
                <a
                  href="mailto:yashrajbhar41@gmail.com"
                  className="hover:text-indigo-600 transition-colors"
                >
                  yashrajbhar41@gmail.com
                </a>
              ),
            },
            {
              icon: <Phone size={15} className="text-indigo-500 shrink-0" />,
              content: <span>+91 9029703989</span>,
            },
            {
              icon: <MapPin size={15} className="text-indigo-500 shrink-0" />,
              content: <span>Maharashtra, India</span>,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={elasticPop}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-2"
            >
              {item.icon}
              {item.content}
            </motion.div>
          ))}

          {/* Availability badge */}
          <motion.div
            variants={zoomIn}
            className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit
              bg-emerald-50 dark:bg-emerald-900/20
              border border-emerald-200 dark:border-emerald-800
              text-emerald-700 dark:text-emerald-400 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for work
          </motion.div>
        </motion.div>
      </div>

      {/* Animated gradient divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent origin-left"
      />

      {/* Bottom bar */}
      <motion.div
        variants={fadeUp}
        className="py-4 text-center text-xs text-gray-500"
      >
        © {new Date().getFullYear()}{" "}
        <span className="text-indigo-500 font-medium">Yash Rajbhar</span>
        . All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
