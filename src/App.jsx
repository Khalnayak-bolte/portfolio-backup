import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import AboutPage from "./pages/AboutPage";
import AllProjects from "./pages/AllProjects";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CrewmateLogin from "./pages/CrewmateLogin";
import CrewmateDashboard from "./pages/CrewmateDashboard";

import AdminRoute from "./routes/AdminRoute";
import CrewmateRoute from "./routes/CrewmateRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StartProjectModal from "./components/StartProjectModal";
import JoinCrewModal from "./components/JoinCrewModal";
import AssignCrewModal from "./components/admin/AssignCrewModal";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import GitHubStats from "./sections/GitHubStats";       // ✅ NEW
import Certifications from "./sections/Certifications"; // ✅ NEW
import NotFound from "./pages/NotFound";                // ✅ NEW
import Contact from "./sections/Contact";
import Testimonials from "./sections/Testimonials";

/* ── Page titles per route ── */
const PAGE_TITLES = {
  "/":              "Yash Rajbhar | Full-Stack Developer",
  "/about":         "About | Yash Rajbhar",
  "/projects":      "Projects | Yash Rajbhar",
  "/admin-login":   "Admin Login | Yash Rajbhar",
  "/admin":         "Admin Dashboard | Yash Rajbhar",
  "/crewmate-login":"Crewmate Login | Yash Rajbhar",
  "/crewmate":      "Crewmate Dashboard | Yash Rajbhar",
};

function usePageTitle() {
  const location = useLocation();
  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || "Yash Rajbhar | Full-Stack Developer";
    document.title = title;
  }, [location.pathname]);
}

/* ── Scroll progress bar ── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[99999]
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    />
  );
}

/* ── Floating back to top button ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-6 z-50
            w-11 h-11 rounded-full
            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
            text-white shadow-lg shadow-indigo-500/40
            flex items-center justify-center text-lg
            hover:shadow-xl hover:shadow-indigo-500/50 transition-shadow"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Page transition ── */
const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function AnimatedRoutes({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        navigate(location.pathname, { replace: true, state: {} });
      }, 300);
    }
  }, [location, navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Home */}
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hero />
              <About />
              <Skills />
              <Projects />
              <GitHubStats />       {/* ✅ NEW */}
              <Certifications />    {/* ✅ NEW */}
              <Testimonials />
              <Contact />
            </motion.div>
          }
        />

        <Route path="/about"          element={<AboutPage />} />
        <Route path="/projects"       element={<AllProjects />} />
        <Route path="/admin-login"    element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/crewmate-login" element={<CrewmateLogin />} />

        <Route
          path="/crewmate"
          element={
            <CrewmateRoute>
              <CrewmateDashboard />
            </CrewmateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();
  usePageTitle();

  const isSystemRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/crewmate");

  const [user, setUser]                         = useState(null);
  const [dark, setDark]                         = useState(localStorage.getItem("theme") === "dark");
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [crewModalOpen, setCrewModalOpen]       = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const openProject = () => setProjectModalOpen(true);
    const openCrew    = () => setCrewModalOpen(true);

    window.addEventListener("open-project-modal", openProject);
    window.addEventListener("open-crew-modal",    openCrew);

    return () => {
      window.removeEventListener("open-project-modal", openProject);
      window.removeEventListener("open-crew-modal",    openCrew);
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar — always visible */}
      {!isSystemRoute && <ScrollProgressBar />}

      {/* Floating back to top */}
      {!isSystemRoute && <BackToTop />}

      {!isSystemRoute && (
        <Navbar dark={dark} setDark={setDark} user={user} />
      )}

      <main
        className={
          isSystemRoute
            ? "min-h-screen bg-gray-100 dark:bg-gray-900"
            : "pt-20 overflow-x-hidden"
        }
      >
        <AnimatedRoutes user={user} />
      </main>

      {!isSystemRoute && <Footer />}

      <StartProjectModal
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />

      <JoinCrewModal
        open={crewModalOpen}
        onClose={() => setCrewModalOpen(false)}
      />

      <AssignCrewModal />
    </>
  );
}

export default App;
