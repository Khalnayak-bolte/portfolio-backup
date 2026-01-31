import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

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

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

        {/* 🔹 LEFT — ABOUT / BRAND */}
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            About Me
          </h3>
          <p>
            We’re a collective of creators and problem-solvers, crafting digital
            experiences that are fast, scalable, and impossible to ignore.
            Based in Maharashtra, India — working globally.
          </p>
        </div>

        {/* 🔹 CENTER — VERTICAL NAV */}
        <div className="flex flex-col gap-3 items-start md:items-center text-gray-600 dark:text-gray-400">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Navigation
          </h3>

          {["home", "about", "skills", "projects", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="capitalize hover:text-indigo-600 transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* 🔹 RIGHT — CONTACT INFO */}
        <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Contact
          </h3>

          <div className="flex items-center gap-2">
            <Mail size={16} className="text-indigo-500" />
            <a
              href="mailto:yashrajbhar41@gmail.com"
              className="hover:text-indigo-600 transition"
            >
              yashrajbhar41@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} className="text-indigo-500" />
            <span>+91 9029703989</span>
          </div>
<div className="flex items-center gap-2">
  <Linkedin size={16} className="text-indigo-500" />
  <a
    href="https://www.linkedin.com/in/yash-rajbhar-5b6b622a3/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-indigo-600 transition"
  >
    linkedin
  </a>
</div>



          <div className="flex items-center gap-2">
            <Instagram size={16} className="text-indigo-500" />
            <a
    href="https://www.instagram.com/00__yashuuuuu_"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-indigo-600 transition"
  >
    instagram
  </a>
</div>


          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-indigo-500" />
            <span>Maharashtra, India</span>
          </div>
        </div>
      </div>

      {/* 🔻 BOTTOM BAR */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Yash Rajbhar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
