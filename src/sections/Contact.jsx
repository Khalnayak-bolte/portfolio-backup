import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { fadeUp, staggerContainer } from "../animations/variants";
import CardFX from "../components/CardFX";
import TiltCard from "../components/effects/TiltCard";

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  // idle | sending | success | error

  const sendEmail = (e) => {
    e.preventDefault();

    // 🕷 Honeypot spam protection
    if (formRef.current?.bot?.value) return;

    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
          setTimeout(() => setStatus("idle"), 3500);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 3500);
        }
      );
  };

  return (
    <>
      {/* 🔔 TOAST */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
              px-6 py-4 rounded-xl flex items-center gap-3
              shadow-2xl backdrop-blur
              ${
                status === "success"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }
            `}
          >
            <span className="text-xl">
              {status === "success" ? "✔" : "✖"}
            </span>
            <span className="font-medium">
              {status === "success"
                ? "Message sent successfully!"
                : "Something went wrong. Try again."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📩 CONTACT SECTION */}
      <motion.section
        id="contact"
        className="relative py-20 bg-white dark:bg-gray-900 transition-colors overflow-visible"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Get In{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Touch
            </span>
          </motion.h2>

          {/* ✅ SAME CARD SYSTEM AS ABOUT & PROJECTS */}
          <motion.div variants={fadeUp}>
            <TiltCard>
              <CardFX>
                <div className="p-8">
                  <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="grid gap-6"
                  >
                    {/* 🕷 Honeypot */}
                    <input type="text" name="bot" className="hidden" />

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="px-4 py-3 rounded-lg
                        bg-gray-100 dark:bg-gray-800
                        text-gray-900 dark:text-white
                        outline-none
                        focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      className="px-4 py-3 rounded-lg
                        bg-gray-100 dark:bg-gray-800
                        text-gray-900 dark:text-white
                        outline-none
                        focus:ring-2 focus:ring-indigo-500"
                    />

                    <textarea
                      name="message"
                      required
                      rows="5"
                      placeholder="Your Message"
                      className="px-4 py-3 rounded-lg
                        bg-gray-100 dark:bg-gray-800
                        text-gray-900 dark:text-white
                        outline-none
                        focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="
                        mt-4 px-8 py-3 rounded-full font-semibold
                        text-white bg-gradient-to-r
                        from-indigo-500 via-purple-500 to-pink-500
                        shadow-lg shadow-indigo-500/30
                        hover:shadow-pink-500/40
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {status === "sending"
                        ? "Sending..."
                        : "Send Message"}
                    </button>
                  </form>
                </div>
              </CardFX>
            </TiltCard>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Contact;
