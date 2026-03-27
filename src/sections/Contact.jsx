import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  fadeUp, fadeLeft, fadeRight, zoomIn,
  staggerContainer, fastStagger, elasticPop, slideUpFade,
} from "../animations/variants";

const contactInfo = [
  {
    icon: "✉️",
    label: "Email",
    value: "yashrajbhar41@gmail.com",
    href: "mailto:yashrajbhar41@gmail.com",
    gradient: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/10",
    border: "border-indigo-500/20 dark:border-indigo-500/30",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Maharashtra, India",
    href: null,
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10 dark:bg-pink-500/10",
    border: "border-pink-500/20 dark:border-pink-500/30",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "yash-rajbhar",
    href: "https://www.linkedin.com/in/yash-rajbhar-5b6b622a3/",
    gradient: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-500/10 dark:bg-cyan-500/10",
    border: "border-cyan-500/20 dark:border-cyan-500/30",
  },
];

/* ── Glassmorphism input ── */
function GlassInput({ name, type = "text", placeholder, required, index }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div variants={slideUpFade} custom={index} className="relative group">
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl text-sm
          bg-white/50 dark:bg-white/5
          text-gray-900 dark:text-white
          outline-none
          border border-gray-200 dark:border-white/10
          focus:border-indigo-500 dark:focus:border-indigo-400
          transition-all duration-300
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          backdrop-blur-sm"
      />
      {/* glow line */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-4 right-4 h-px rounded-full
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
      />
    </motion.div>
  );
}

function GlassTextarea({ name, placeholder, required, rows, index }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div variants={slideUpFade} custom={index} className="relative group">
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl text-sm
          bg-white/50 dark:bg-white/5
          text-gray-900 dark:text-white
          outline-none
          border border-gray-200 dark:border-white/10
          focus:border-indigo-500 dark:focus:border-indigo-400
          transition-all duration-300
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          backdrop-blur-sm resize-none"
      />
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-4 right-4 h-px rounded-full
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
      />
    </motion.div>
  );
}

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
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
        () => { setStatus("success"); formRef.current.reset(); setTimeout(() => setStatus("idle"), 3500); },
        () => { setStatus("error");   setTimeout(() => setStatus("idle"), 3500); }
      );
  };

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
              px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl backdrop-blur mx-4
              ${status === "success" ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"}`}
          >
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="text-lg"
            >
              {status === "success" ? "✔" : "✖"}
            </motion.span>
            <span className="font-medium text-sm">
              {status === "success" ? "Message sent successfully!" : "Something went wrong. Try again."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        id="contact"
        className="relative py-20 md:py-28 bg-white dark:bg-gray-900 transition-colors overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full
            bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full
            bg-pink-400/10 dark:bg-pink-600/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full
            bg-purple-400/5 dark:bg-purple-600/5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-6">

          {/* Heading */}
          <motion.div variants={fadeUp} className="text-center mb-4">
            <p className="text-xs md:text-sm tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
              Let's talk
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Get In <span className="animate-gradient-text">Touch</span>
            </h2>
          </motion.div>

          <motion.div
            variants={zoomIn}
            className="mx-auto mt-4 mb-12 md:mb-16 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-start">

            {/* ── Left — Contact Info ── */}
            <motion.div variants={fadeLeft} className="md:col-span-2 flex flex-col gap-4">

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-2">
                Have a project in mind or just want to say hi? My inbox is always open. I'll try my best to get back to you!
              </p>

              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  variants={elasticPop}
                  whileHover={{ x: 6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl
                    ${item.bg} border ${item.border}
                    backdrop-blur-sm overflow-hidden group cursor-default`}
                >
                  {/* Gradient left bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl
                    bg-gradient-to-b ${item.gradient}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Icon bubble */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                    bg-gradient-to-br ${item.gradient} shadow-lg shrink-0`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-800 dark:text-gray-100
                          hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Availability badge */}
              <motion.div
                variants={zoomIn}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl w-fit
                  bg-emerald-50 dark:bg-emerald-900/20
                  border border-emerald-200 dark:border-emerald-800
                  text-emerald-700 dark:text-emerald-400 text-xs font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Currently available for new projects
              </motion.div>
            </motion.div>

            {/* ── Right — Form ── */}
            <motion.div variants={fadeRight} className="md:col-span-3">
              {/* Glass card */}
              <div className="relative rounded-3xl overflow-hidden
                bg-white/70 dark:bg-gray-800/50
                border border-gray-200/80 dark:border-white/10
                backdrop-blur-xl shadow-2xl shadow-indigo-500/5 dark:shadow-indigo-500/10">

                {/* Top gradient bar */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                          className="w-16 h-16 rounded-2xl
                            bg-gradient-to-br from-emerald-400 to-teal-500
                            flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30"
                        >
                          ✅
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                          Message Sent!
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-gray-500 dark:text-gray-400 text-sm max-w-xs"
                        >
                          Thanks for reaching out. I'll get back to you as soon as possible.
                        </motion.p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        ref={formRef}
                        onSubmit={sendEmail}
                        variants={fastStagger}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-4"
                      >
                        <input type="text" name="bot" className="hidden" />

                        {/* Name + Email row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <GlassInput name="name"  placeholder="Your Name"  required index={0} />
                          <GlassInput name="email" placeholder="Your Email" required index={1} type="email" />
                        </div>

                        <GlassTextarea name="message" placeholder="Your Message..." required rows={5} index={2} />

                        <motion.button
                          variants={slideUpFade}
                          custom={3}
                          type="submit"
                          disabled={status === "sending"}
                          whileHover={status !== "sending" ? { scale: 1.02, y: -2 } : {}}
                          whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                          className="relative mt-1 py-3.5 rounded-xl font-semibold text-sm
                            text-white overflow-hidden
                            disabled:opacity-60 disabled:cursor-not-allowed
                            shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                            transition-shadow duration-300"
                        >
                          {/* Gradient background */}
                          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                          {/* Shimmer on hover */}
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                            -translate-x-full hover:translate-x-full transition-transform duration-700" />
                          <span className="relative flex items-center justify-center gap-2">
                            {status === "sending" ? (
                              <>
                                <motion.span
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                  className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <motion.span
                                  animate={{ x: [0, 4, 0] }}
                                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                  →
                                </motion.span>
                              </>
                            )}
                          </span>
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Contact;
