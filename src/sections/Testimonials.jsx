import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/* 🔁 Infinite Marquee Row */
function MarqueeRow({ testimonials, reverse = false }) {
  if (testimonials.length === 0) return null;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="w-[320px] shrink-0 rounded-2xl bg-zinc-900 p-6 border border-zinc-800"
          >
            <p className="text-gray-300 italic mb-4">
              “{t.message}”
            </p>

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <p className="font-semibold text-white">
                  {t.name}
                </p>
                <p className="text-gray-500">{t.role}</p>
              </div>

              <div className="text-yellow-400 text-sm">
                {"⭐".repeat(t.rating)}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  /* 🔥 FETCH TESTIMONIALS */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to load testimonials", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-28 bg-black text-white overflow-hidden"
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <p className="text-sm tracking-widest text-purple-400 mb-3">
          TESTIMONIALS
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Trusted by <span className="text-indigo-400">People</span>
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          + Share Your Story
        </button>
      </div>

      {/* MARQUEE */}
      {testimonials.length > 0 ? (
        <div className="space-y-10">
          <MarqueeRow testimonials={testimonials} />
          <MarqueeRow testimonials={testimonials} reverse />
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No testimonials yet. Be the first to share one!
        </p>
      )}

      {/* MODAL FORM */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;

              const data = {
                name: form.name.value,
                role: form.role.value,
                message: form.message.value,
                rating: Number(form.rating.value),
                createdAt: new Date(),
              };

              await fetch("/__/firebase/init.json"); // ensure Firebase ready
              await (await import("firebase/firestore")).addDoc(
                collection(db, "testimonials"),
                data
              );

              setOpen(false);
              setTestimonials((prev) => [data, ...prev]);
              form.reset();
            }}
            className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 border border-zinc-800"
          >
            <h3 className="text-lg font-semibold mb-4">
              Share Your Experience
            </h3>

            <input
              name="name"
              required
              placeholder="Your Name"
              className="w-full mb-3 p-2 rounded bg-zinc-800"
            />

            <input
              name="role"
              required
              placeholder="Your Role / Company"
              className="w-full mb-3 p-2 rounded bg-zinc-800"
            />

            <textarea
              name="message"
              required
              rows="4"
              placeholder="Your Message"
              className="w-full mb-3 p-2 rounded bg-zinc-800"
            />

            <select
              name="rating"
              className="w-full mb-4 p-2 rounded bg-zinc-800"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full py-3 rounded bg-indigo-600 hover:bg-indigo-500 transition"
            >
              Submit Testimonial
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
