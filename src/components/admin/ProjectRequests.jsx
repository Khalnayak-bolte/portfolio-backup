import { useEffect, useState } from "react";
import TiltCard from "../effects/TiltCard";
import CardFX from "../CardFX";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const statusColor = {
  new: "bg-indigo-600",
  contacted: "bg-yellow-600",
  closed: "bg-green-600",
  assigned: "bg-purple-600",
  completed: "bg-green-700",
};

const ProjectRequests = ({ search = "", onAssign }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔴 REAL-TIME PROJECTS */
  useEffect(() => {
    const q = query(
      collection(db, "projectRequests"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setProjects(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
        setLoading(false);
      },
      (err) => {
        console.error("Realtime fetch failed:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  /* 🔄 STATUS UPDATE */
  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "projectRequests", id), {
        status,
        updatedAt: new Date(),
      });
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  /* 🗑 DELETE */
  const remove = async (id) => {
    if (!window.confirm("Delete this project request?")) return;
    try {
      await deleteDoc(doc(db, "projectRequests", id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filtered = projects.filter((p) =>
    `${p.name} ${p.email}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-gray-500">Loading project requests...</p>;
  }

  if (filtered.length === 0) {
    return <p className="text-gray-500">No project requests found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {filtered.map((req) => {
        const isAssigned = req.status === "assigned" && req.assignedTo;
        const isCompleted = req.status === "completed";

        return (
          <TiltCard key={req.id}>
            <CardFX>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{req.name}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full text-white ${
                      statusColor[req.status || "new"]
                    }`}
                  >
                    {req.status || "new"}
                  </span>
                </div>

                <p className="text-sm">📧 {req.email}</p>
                {req.phone && <p className="text-sm">📞 {req.phone}</p>}

                {req.serviceType && (
                  <p className="text-sm font-medium text-indigo-400">
                    🛠 {req.serviceType}
                  </p>
                )}

                <p className="text-gray-300">{req.description}</p>

                {/* 🔥 ASSIGNMENT INFO */}
                {(isAssigned || isCompleted) && (
                  <div className="text-sm text-purple-400 space-y-1">
                    <p>
                      👤 Assigned to: <b>{req.assignedToName}</b>
                    </p>
                    {req.adminComment && (
                      <p>📝 Admin note: {req.adminComment}</p>
                    )}
                  </div>
                )}

                {isCompleted && (
                  <p className="text-sm text-green-400 font-semibold">
                    ✅ Work completed by crewmate
                  </p>
                )}

                {req.createdAt && (
                  <p className="text-xs text-gray-500">
                    {req.createdAt.toDate().toLocaleString()}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-3">
                  <button
                    onClick={() => updateStatus(req.id, "contacted")}
                    disabled={isCompleted}
                    className="px-3 py-1 bg-yellow-600 rounded text-sm text-white disabled:opacity-50"
                  >
                    Contacted
                  </button>

                  <button
                    onClick={() => updateStatus(req.id, "closed")}
                    disabled={isCompleted}
                    className="px-3 py-1 bg-green-600 rounded text-sm text-white disabled:opacity-50"
                  >
                    Closed
                  </button>

                  {/* 🔥 ASSIGN BUTTON */}
                  <button
                    type="button"
                    disabled={isAssigned || isCompleted}
                    onClick={() => onAssign?.(req)}
                    className={`px-3 py-1 rounded text-sm text-white ${
                      isAssigned || isCompleted
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-indigo-600"
                    }`}
                  >
                    {isCompleted
                      ? "Completed"
                      : isAssigned
                      ? "Assigned"
                      : "Assign"}
                  </button>

                  <button
                    onClick={() => remove(req.id)}
                    className="px-3 py-1 bg-gray-700 rounded text-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </CardFX>
          </TiltCard>
        );
      })}
    </div>
  );
};

export default ProjectRequests;
