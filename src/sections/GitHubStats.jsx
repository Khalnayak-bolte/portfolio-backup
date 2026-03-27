import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import CardFX from "../components/CardFX";
import {
  fadeUp, fadeLeft, fadeRight, zoomIn,
  staggerContainer, fastStagger, elasticPop,
} from "../animations/variants";

const GITHUB_USERNAME = "Khalnayak-bolte";

const HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
};

/* ── Language color map ─────────────────────────────────── */
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Python:     "#3572A5",
  Dart:       "#00B4AB",
  PHP:        "#4F5D95",
  Java:       "#b07219",
  Shell:      "#89e051",
  Other:      "#8b8b8b",
};

/* ── Animated number ────────────────────────────────────── */
function CountUp({ target, duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ── Single stat pill ───────────────────────────────────── */
function StatPill({ icon, label, value, color, delay }) {
  return (
    <motion.div
      variants={zoomIn}
      whileHover={{ scale: 1.07, y: -4 }}
      transition={{ type: "spring", stiffness: 300, delay }}
      className="flex flex-col items-center text-center px-4 py-5 rounded-2xl
        bg-indigo-50 dark:bg-indigo-900/20
        border border-indigo-100 dark:border-indigo-800"
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className={`text-2xl font-extrabold ${color}`}>
        <CountUp target={value} />
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</span>
    </motion.div>
  );
}

/* ── Language bar ───────────────────────────────────────── */
function LangBar({ name, percent, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} variants={elasticPop} custom={index} className="group">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300
            group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
            {name}
          </span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.4 }}
          className="text-xs text-gray-400 font-mono"
        >
          {percent}%
        </motion.span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : {}}
          transition={{ duration: 1, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

/* ── Repo card ──────────────────────────────────────────── */
function RepoCard({ repo, index }) {
  const variant = index % 3 === 0 ? fadeLeft : index % 3 === 1 ? fadeUp : fadeRight;

  return (
    <motion.div variants={variant}>
      <CardFX>
        <div className="p-5 flex flex-col h-full gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl">📦</span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {repo.name}
              </h3>
            </div>
            {repo.language && (
              <span
                className="shrink-0 px-2 py-0.5 text-xs rounded-full font-medium text-white"
                style={{ background: LANG_COLORS[repo.language] || LANG_COLORS.Other }}
              >
                {repo.language}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
            {repo.description || "No description provided."}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-xs text-gray-400">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-lg text-xs font-semibold
                border border-indigo-500 text-indigo-600
                hover:bg-indigo-600 hover:text-white
                dark:text-indigo-400 dark:border-indigo-400
                dark:hover:bg-indigo-500 transition-colors"
            >
              View →
            </motion.a>
          </div>
        </div>
      </CardFX>
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────────── */
const GitHubStats = () => {
  const [profile,  setProfile]  = useState(null);
  const [repos,    setRepos]    = useState([]);
  const [langs,    setLangs]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: HEADERS }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers: HEADERS }),
        ]);

        if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const profileData = await profileRes.json();
        const reposData   = await reposRes.json();

        setProfile(profileData);

        /* Top repos by stars */
        const sorted = [...reposData]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        setRepos(sorted);

        /* Language aggregation */
        const langCount = {};
        reposData.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
        const total = Object.values(langCount).reduce((a, b) => a + b, 0);
        const sorted_langs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            percent: Math.round((count / total) * 100),
            color: LANG_COLORS[name] || LANG_COLORS.Other,
          }));
        setLangs(sorted_langs);
      } catch (err) {
        setError("Could not load GitHub data. Check your username or API rate limit.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const stats = profile
    ? [
        { icon: "📁", label: "Public Repos",  value: profile.public_repos,  color: "text-indigo-600 dark:text-indigo-400",  delay: 0 },
        { icon: "👥", label: "Followers",      value: profile.followers,      color: "text-purple-600 dark:text-purple-400",  delay: 0.05 },
        { icon: "➡️", label: "Following",      value: profile.following,      color: "text-cyan-600 dark:text-cyan-400",      delay: 0.1 },
        { icon: "⭐", label: "Total Stars",    value: repos.reduce((a, r) => a + r.stargazers_count, 0), color: "text-yellow-600 dark:text-yellow-400", delay: 0.15 },
      ]
    : [];

  return (
    <motion.section
      id="github"
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
            Open Source Activity
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            GitHub <span className="animate-gradient-text">Stats</span>
          </h2>
        </motion.div>

        <motion.div
          variants={zoomIn}
          className="mx-auto mt-4 mb-12 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />

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

        {/* Error */}
        {error && (
          <motion.p variants={fadeUp} className="text-center text-red-400 py-10">
            {error}
          </motion.p>
        )}

        {!loading && !error && profile && (
          <>
            {/* Profile banner */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-5 mb-12
                p-5 md:p-6 rounded-2xl
                bg-gradient-to-r from-indigo-50 via-white to-cyan-50
                dark:from-indigo-900/20 dark:via-gray-800/50 dark:to-cyan-900/20
                border border-indigo-100 dark:border-indigo-800"
            >
              <motion.img
                src={profile.avatar_url}
                alt="GitHub Avatar"
                whileHover={{ scale: 1.08 }}
                className="w-16 h-16 rounded-full ring-4 ring-indigo-500/30"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {profile.name || profile.login}
                </h3>
                {profile.bio && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                    {profile.bio}
                  </p>
                )}
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-500 hover:underline mt-1 inline-block"
                >
                  @{profile.login} →
                </a>
              </div>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              variants={fastStagger}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
            >
              {stats.map((s, i) => (
                <StatPill key={i} {...s} />
              ))}
            </motion.div>

            {/* Languages + Top Repos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

              {/* Languages */}
              <motion.div variants={fadeLeft}>
                <CardFX>
                  <div className="p-5 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      🧑‍💻 Top Languages
                    </h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5"
                    />
                    <motion.div variants={fastStagger} className="flex flex-col gap-3">
                      {langs.map((l, i) => (
                        <LangBar key={i} {...l} index={i} />
                      ))}
                    </motion.div>
                  </div>
                </CardFX>
              </motion.div>

              {/* Contribution embed */}
              <motion.div variants={fadeRight}>
                <CardFX>
                  <div className="p-5 md:p-6 flex flex-col h-full">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      📊 Contribution Graph
                    </h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5"
                    />
                    <div className="flex-1 flex items-center justify-center overflow-hidden rounded-xl">
                      <img
                        src={`https://ghchart.rshah.org/6366f1/${GITHUB_USERNAME}`}
                        alt="GitHub Contribution Chart"
                        className="w-full h-auto rounded-xl"
                        onError={(e) => {
                          e.target.parentNode.innerHTML =
                            `<p class="text-sm text-gray-400 text-center">Contribution graph unavailable.</p>`;
                        }}
                      />
                    </div>
                  </div>
                </CardFX>
              </motion.div>
            </div>

            {/* Top repos */}
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                🔥 Top Repositories
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>

            {/* View all button */}
            <motion.div variants={fadeUp} className="mt-12 flex justify-center">
              <motion.a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-full font-semibold text-sm
                  text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  shadow-lg shadow-indigo-500/30 hover:shadow-pink-500/40"
              >
                View Full GitHub Profile →
              </motion.a>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default GitHubStats;
