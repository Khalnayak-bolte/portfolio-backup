import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GradientButton from "./GradientButton";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const roles = [
  "Video Editor",
  "Photo Editor",
  "Photographer",
  "Videographer",
  "Social Media Manager",
  "Graphic Designer",
  "Web Developer",
  "Content Writer",
  "Other",
];

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 " +
  "text-gray-900 dark:text-gray-100 placeholder-gray-500 " +
  "dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500";

const JoinCrewModal = ({ open, onClose }) => {
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;

    setLoading(true);

    await addDoc(collection(db, "crewApplications"), {
      firstName: f.firstName.value,
      middleName: f.middleName.value || null,
      lastName: f.lastName.value,
      email: f.email.value,
      phone: f.phone.value,
      portfolio: f.portfolio.value || null,
      role,
      otherRole: role === "Other" ? f.otherRole.value : null,
      roleDescription: role === "Other" ? f.roleDescription.value : null,
      whyYou: f.whyYou.value,
      status: "new",
      createdAt: serverTimestamp(),
    });

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 3500);
  };

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
            className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 p-8 relative max-h-[90vh] overflow-y-auto"
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
                  Apply Now
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <input name="firstName" required placeholder="First Name *" className={inputClass} />
                    <input name="middleName" placeholder="Middle Name" className={inputClass} />
                    <input name="lastName" required placeholder="Last Name *" className={inputClass} />
                  </div>

                  <input name="email" type="email" required placeholder="Email *" className={inputClass} />
                  <input name="phone" required placeholder="Phone No *" className={inputClass} />
                  <input name="portfolio" placeholder="Portfolio (optional)" className={inputClass} />

                  <select
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select Role *</option>
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  {role === "Other" && (
                    <>
                      <input name="otherRole" required placeholder="What role?" className={inputClass} />
                      <textarea name="roleDescription" required rows="3" placeholder="Describe your role" className={inputClass} />
                    </>
                  )}

                  <textarea name="whyYou" required rows="4" placeholder="WHY You?" className={inputClass} />

                  <GradientButton className="w-full" type="submit">
                    {loading ? "Submitting..." : "Apply"}
                  </GradientButton>
                </form>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  🎉 Thank you for applying!
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

export default JoinCrewModal;
