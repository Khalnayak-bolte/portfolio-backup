import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GradientButton from "./GradientButton";
import { createProjectRequest } from "../services/projectRequests";

const SERVICES = [
  "Video Editing",
  "Photo Editing",
  "Photographer",
  "Videographer",
  "Social Media Management",
  "Graphic Designing",
  "Web Development",
  "Content Writing",
];

const StartProjectModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setLoading(true);

    await createProjectRequest({
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      serviceType: form.serviceType.value, // 🔥 NEW
      description: form.description.value,
      status: "new", // ✅ default status
    });

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 3000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg " +
    "bg-gray-100 dark:bg-gray-800 " +
    "text-gray-900 dark:text-gray-100 " +
    "placeholder-gray-500 dark:placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            {!success ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Start a Project
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    required
                    placeholder="Your Name"
                    className={inputClass}
                  />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className={inputClass}
                  />

                  <input
                    name="phone"
                    placeholder="Phone Number"
                    className={inputClass}
                  />

                  {/* 🔥 SERVICE TYPE */}
                  <select
                    name="serviceType"
                    required
                    className={inputClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      What service do you want?
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  <textarea
                    name="description"
                    required
                    rows="4"
                    placeholder="Briefly describe your project"
                    className={inputClass}
                  />

                  <GradientButton className="w-full" type="submit">
                    {loading ? "Submitting..." : "Submit Request"}
                  </GradientButton>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">
                  🎉 Request Received
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We’ll reach you within 48 working hours.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartProjectModal;
