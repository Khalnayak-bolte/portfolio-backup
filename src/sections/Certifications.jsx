import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  fadeUp, fadeLeft, fadeRight, zoomIn,
  staggerContainer, fastStagger, elasticPop,
} from "../animations/variants";

const CATEGORY_COLORS = {
  Frontend:  { gradient: "from-indigo-500 to-cyan-500",    glow: "shadow-indigo-500/25",  bg: "bg-indigo-500/10",  border: "border-indigo-500/20",  text: "text-indigo-600 dark:text-indigo-400" },
  Backend:   { gradient: "from-purple-500 to-pink-500",    glow: "shadow-purple-500/25",  bg: "bg-purple-500/10",  border: "border-purple-500/20",  text: "text-purple-600 dark:text-purple-400" },
  Cloud:     { gradient: "from-cyan-500 to-blue-500",      glow: "shadow-cyan-500/25",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    text: "text-cyan-600 dark:text-cyan-400" },
  Database:  { gradient: "from-orange-500 to-yellow-500",  glow: "shadow-orange-500/25",  bg: "bg-orange-500/10",  border: "border-orange-500/20",  text: "text-orange-600 dark:text-orange-400" },
  DevOps:    { gradient: "from-emerald-500 to-teal-500",   glow: "shadow-emerald-500/25", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400" },
  Other:     { gradient: "from-gray-500 to-gray-400",      glow: "shadow-gray-500/25",    bg: "bg-gray-500/10",    border: "border-gray-500/20",    text: "text-gray-600 dark:text-gray-400" },
};

const CATEGORY_ICONS = {
  Frontend: "🎨", Backend: "⚙️", Cloud: "☁️",
  Database: "🗄️", DevOps: "🛠️", Other: "📜",
};

const ALL_CATEGORIES = ["All", "Frontend", "Backend", "Cloud", "Database", "DevOps", "Other"];

/* ── Achievement badge card ── */
function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false);
  const variant = index % 3 === 0 ? fadeLeft : index % 3 === 1 ? fadeUp : fadeRight;
  const style   = CATEGORY_COLORS[cert.category] || CATEGORY_COLORS.Other;
  const icon    = CATEGORY_ICONS[cert.category]  || CATEGORY_ICONS.Other;

  const issued = cert.issuedDate
    ? new Date(cert.issuedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;

  return (
    <motion.div
      variants={variant}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group"
    >
      {/* Glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${style.gradient}
          blur-lg -z-10 ${style.glow}`}
      />

      {/* Card */}
      <div className={`relative h-full rounded-2xl overflow-hidden
        bg-white dark:bg-gray-800/90
        border border-gray-200 dark:border-gray-700/50
        transition-all duration-300`}
      >
        {/* Gradient header strip */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${style.gradient}`} />

        {/* Shimmer diagonal bg decoration */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full
          bg-gradient-to-br ${style.gradient} opacity-5 -z-0`} />

        <div className="relative z-10 p-5 flex flex-col h-full gap-3">

          {/* Top row — badge icon + category pill */}
          <div className="flex items-start justify-between gap-2">
            <motion.div
              variants={elasticPop}
              whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1, transition: { duration: 0.4 } }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0
                bg-gradient-to-br ${style.gradient} shadow-lg ${style.glow}`}
            >
              {cert.badgeEmoji || icon}
            </motion.div>

            <span className={`px-2.5 py-1 text-xs rounded-full font-semibold
              ${style.bg} ${style.text}
              border ${style.border}`}
            >
              {cert.category || "Other"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-snug">
            {cert.title}
          </h3>

          {/* Issuer */}
          <div className="flex items-center gap-1.5">
            <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${style.gradient}`} />
            <p className={`text-xs font-semibold ${style.text}`}>
              {cert.issuer}
            </p>
          </div>

          {/* Description */}
          {cert.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
              {cert.description}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/50
            flex items-center justify-between gap-2 flex-wrap">

            <div className="flex flex-col gap-0.5">
              {issued && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  📅 {issued}
                </span>
              )}
              {cert.credentialId && (
                <span className="text-xs text-gray-400 dark:text-gray-600 font-mono truncate max-w-[120px]">
                  ID: {cert.credentialId}
                </span>
              )}
            </div>

            {cert.credentialUrl && (
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                  bg-gradient-to-r ${style.gradient}
                  text-white shadow-md ${style.glow}
                  hover:shadow-lg transition-shadow`}
              >
                Verify ↗
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
const Certifications = () => {
  const [certs,     setCerts]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const q = query(collection(db, "certifications"), orderBy("issuedDate", "desc"));
        const snap = await getDocs(q);
        setCerts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed to fetch certifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const filtered = activeTab === "All"
    ? certs
    : certs.filter((c) => c.category === activeTab);

  const activeCats = ALL_CATEGORIES.filter(
    (cat) => cat === "All" || certs.some((c) => c.category === cat)
  );

  return (
    <motion.section
      id="certifications"
      className="py-20 md:py-24 bg-white dark:bg-gray-900 transition-colors"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <motion.div variants={fadeUp} className="text-center mb-4">
          <p className="text-xs md:text-sm tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
            My Learning Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Certifi<span className="animate-gradient-text">cations</span>
          </h2>
        </motion.div>

        <motion.div
          variants={zoomIn}
          className="mx-auto mt-4 mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />

        {/* Category filter */}
        {!loading && certs.length > 0 && (
          <motion.div variants={fastStagger} className="flex flex-wrap justify-center gap-2 mb-10">
            {activeCats.map((cat) => {
              const s = CATEGORY_COLORS[cat];
              return (
                <motion.button
                  key={cat}
                  variants={elasticPop}
                  onClick={() => setActiveTab(cat)}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all
                    ${activeTab === cat
                      ? `bg-gradient-to-r ${s?.gradient || "from-indigo-500 to-purple-500"} text-white shadow-lg`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {CATEGORY_ICONS[cat] || "📋"} {cat}
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Empty */}
        {!loading && certs.length === 0 && (
          <motion.div variants={fadeUp} className="text-center py-16">
            <span className="text-5xl">🎓</span>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No certifications added yet. Add them from the Admin panel!
            </p>
          </motion.div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Count badge */}
        {!loading && certs.length > 0 && (
          <motion.div variants={fadeUp} className="mt-10 flex justify-center">
            <span className="px-5 py-2 rounded-full text-xs font-semibold
              bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10
              text-indigo-600 dark:text-indigo-400
              border border-indigo-200 dark:border-indigo-800">
              🏆 {certs.length} Certification{certs.length !== 1 ? "s" : ""} Earned
            </span>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Certifications;
