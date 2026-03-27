import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  collection, getDocs, addDoc, orderBy, query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/* ── Star renderer ── */
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-sm ${s <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

/* ── Single marquee card ── */
function TestimonialCard({ t }) {
  return (
    <div className="w-[340px] shrink-0 group relative rounded-2xl p-6 overflow-hidden
      bg-white/80 dark:bg-gray-800/60
      border border-gray-200/80 dark:border-white/10
      backdrop-blur-md
      shadow-lg shadow-black/5 dark:shadow-black/20
      hover:shadow-xl hover:shadow-indigo-500/10
      transition-all duration-300"
    >
      {/* Top gradient bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative quote mark */}
      <div className="absolute top-4 right-5 text-5xl font-serif leading-none
        text-indigo-200 dark:text-indigo-800 select-none pointer-events-none">
        "
      </div>

      {/* Stars */}
      <div className="mb-3">
        <Stars rating={t.rating} />
      </div>

      {/* Message */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic relative z-10">
        "{t.message}"
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-4" />

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full shrink-0
          bg-gradient-to-br from-indigo-500 to-purple-500
          flex items-center justify-center text-white text-sm font-bold shadow-md">
          {t.name?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{t.name}</p>
          <p className="text-xs text-indigo-500 dark:text-indigo-400">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Marquee row ── */
function MarqueeRow({ testimonials, reverse = false }) {
  if (testimonials.length === 0) return null;
  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10
        bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10
        bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Submit modal ── */
function TestimonialModal({ onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    await addDoc(collection(db, "testimonials"), {
      name: form.name.value, role: form.role.value,
      message: form.message.value, rating: Number(form.rating.value),
      createdAt: new Date(), status: "pending",
    });
    setSubmitting(false);
    setDone(true);
    setTimeout(() => { form.reset(); onClose(); }, 2000);
  };

  const inputCls = "w-full p-3 rounded-xl text-sm outline-none transition-all duration-200 " +
    "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white " +
    "border border-gray-200 dark:border-gray-700 " +
    "focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 " +
    "placeholder:text-gray-400";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl overflow-hidden
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800 shadow-2xl"
      >
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Share Your Experience ✨</h3>
            <button type="button" onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center
                text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-800 transition">✕</button>
          </div>
          {done ? (
            <div className="flex flex-col items-center py-8 gap-3 text-center">
              <div className="text-4xl">🎉</div>
              <p className="font-semibold text-gray-900 dark:text-white">Thank you!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your testimonial is under review.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="name" required placeholder="Your Name" className={inputCls} />
              <input name="role" required placeholder="Your Role / Company" className={inputCls} />
              <textarea name="message" required rows="4" placeholder="Your Message"
                className={inputCls + " resize-none"} />
              <select name="rating" className={inputCls}>
                {[5,4,3,2,1].map((r) => (
                  <option key={r} value={r}>{r} ⭐ {r===5?"— Excellent":r===4?"— Great":r===3?"— Good":r===2?"— Fair":"— Poor"}</option>
                ))}
              </select>
              <button type="submit" disabled={submitting}
                className="mt-1 py-3 rounded-xl font-semibold text-sm text-white
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-60 transition-all">
                {submitting ? "Submitting..." : "Submit Testimonial →"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

/* ── Main ── */
export default function Testimonials() {
  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setTestimonials(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((t) => t.status === "approved")
        );
      } catch (err) { console.error("Failed to load testimonials", err); }
    };
    fetch();
  }, []);

  return (
    <section id="testimonials"
      className="relative py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-indigo-300/10 dark:bg-indigo-700/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-300/10 dark:bg-purple-700/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 text-center mb-16">
        <p className="text-xs md:text-sm tracking-widest text-purple-500 dark:text-purple-400 uppercase mb-3">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Trusted by <span className="animate-gradient-text">People</span>
        </h2>
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            text-gray-700 dark:text-gray-300
            hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400
            shadow-sm hover:shadow-md transition-all duration-200"
        >
          ✨ Share Your Story
        </motion.button>
      </div>

      {/* Marquee */}
      {testimonials.length > 0 ? (
        <div className="space-y-6">
          <MarqueeRow testimonials={testimonials} />
          <MarqueeRow testimonials={testimonials} reverse />
        </div>
      ) : (
        <p className="text-center text-gray-400 py-10">No testimonials yet. Be the first to share one!</p>
      )}

      {open && <TestimonialModal onClose={() => setOpen(false)} />}
    </section>
  );
}
