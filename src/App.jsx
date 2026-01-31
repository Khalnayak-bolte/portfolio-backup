import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import CustomCursor from "./components/CustomCursor";
import StartProjectModal from "./components/StartProjectModal";
import JoinCrewModal from "./components/JoinCrewModal";
import AssignCrewModal from "./components/admin/AssignCrewModal";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Testimonials from "./sections/Testimonials";
import { sectionParallax } from "./animations/variants";

/* PAGE TRANSITION */
const pageVariants = {
  initial: { opacity: 0, y: 40, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(8px)",
    transition: { duration: 0.45, ease: "easeInOut" },
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
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <motion.div variants={sectionParallax} initial="hidden" animate="visible">
                <Hero />
              </motion.div>

              <motion.div variants={sectionParallax} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <About />
              </motion.div>

              <motion.div variants={sectionParallax} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <Skills />
              </motion.div>

              <motion.div variants={sectionParallax} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <Projects />
              </motion.div>

              <motion.div variants={sectionParallax} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <Testimonials user={user} />
              </motion.div>

              <motion.div variants={sectionParallax} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <Contact />
              </motion.div>
            </motion.div>
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/admin-login" element={<AdminLogin />} />

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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();

  const isSystemRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/crewmate");

  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [crewModalOpen, setCrewModalOpen] = useState(false);

  // 🔑 SINGLE SOURCE OF AUTH TRUTH
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🔥 Auth state changed:", firebaseUser);
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
    const openCrew = () => setCrewModalOpen(true);

    window.addEventListener("open-project-modal", openProject);
    window.addEventListener("open-crew-modal", openCrew);

    return () => {
      window.removeEventListener("open-project-modal", openProject);
      window.removeEventListener("open-crew-modal", openCrew);
    };
  }, []);

  return (
    <>
      <CustomCursor />

      {!isSystemRoute && <Navbar dark={dark} setDark={setDark} user={user} />}

      <main
        className={
          isSystemRoute
            ? "min-h-screen bg-gray-100 dark:bg-gray-900"
            : "pt-20 overflow-x-hidden overflow-y-visible"
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
