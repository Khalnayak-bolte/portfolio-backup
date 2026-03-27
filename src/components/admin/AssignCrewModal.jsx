import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import GradientButton from "../GradientButton";

/* 🔑 ROLE NORMALIZATION MAP */
const ROLE_MAP = {
  "Web Development": "web",
  "Web Developer": "web",

  "UI/UX Design": "uiux",
  "UI/UX Designer": "uiux",

  "Mobile Development": "mobile",
  "Mobile Developer": "mobile",
};

const AssignCrewModal = ({ open, project, onClose, onAssigned }) => {
  const [crewmates, setCrewmates] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [adminComment, setAdminComment] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔄 RESET STATE WHEN MODAL OPENS */
  useEffect(() => {
    if (open) {
      setSelectedUsername("");
      setAdminComment("");
    }
  }, [open]);

  /* 👥 FETCH ACTIVE CREWMATES (ROLE SAFE) */
  useEffect(() => {
    if (!open || !project) return;

    const fetchCrewmates = async () => {
      try {
        const projectRoleKey = ROLE_MAP[project.serviceType];

        const q = query(
          collection(db, "crewmates"),
          where("active", "==", true)
        );

        const snap = await getDocs(q);

        const filtered = snap.docs
          .map((d) => ({
            username: d.id,
            ...d.data(),
          }))
          .filter((c) => {
            if (!projectRoleKey) return true;
            const crewRoleKey = ROLE_MAP[c.role];
            return crewRoleKey === projectRoleKey;
          });

        setCrewmates(filtered);
      } catch (err) {
        console.error("Failed to fetch crewmates:", err);
      }
    };

    fetchCrewmates();
  }, [open, project]);

  /* ✅ ASSIGN WORK */
  const handleAssign = async () => {
    if (!selectedUsername) {
      alert("Please select a crewmate");
      return;
    }

    const crew = crewmates.find(
      (c) => c.username === selectedUsername
    );

    if (!crew || !project?.id) {
      alert("Invalid crewmate selection");
      return;
    }

    try {
      setLoading(true);

      await updateDoc(doc(db, "projectRequests", project.id), {
        assignedTo: crew.username, // ✅ username-based
        assignedToName: crew.name || crew.username,
        assignedRole: crew.role || "",
        adminComment: adminComment || "",
        status: "assigned",
        assignedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      onAssigned?.();
      onClose();
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Failed to assign crewmate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            className="w-full max-w-xl rounded-2xl bg-white dark:bg-gray-900 p-8 relative"
          >
            {/* ❌ CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2 text-center">
              Assign Crewmate
            </h2>

            {project.serviceType && (
              <p className="text-sm text-center text-gray-500 mb-6">
                Service Required: <b>{project.serviceType}</b>
              </p>
            )}

            {/* 👥 SELECT CREWMATE */}
            {crewmates.length === 0 ? (
              <p className="text-center text-red-500">
                No active crewmates available.
              </p>
            ) : (
              <select
                value={selectedUsername}
                onChange={(e) =>
                  setSelectedUsername(e.target.value)
                }
                className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <option value="">Select Crewmate</option>
                {crewmates.map((c) => (
                  <option key={c.username} value={c.username}>
                    {c.name} — {c.role}
                  </option>
                ))}
              </select>
            )}

            {/* 📝 ADMIN COMMENT */}
            <textarea
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
              placeholder="Admin comment (optional)"
              className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 min-h-[90px]"
            />

            {/* ✅ ACTION */}
            <GradientButton
              onClick={handleAssign}
              disabled={loading || crewmates.length === 0}
            >
              {loading ? "Assigning..." : "Assign Work"}
            </GradientButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssignCrewModal;
