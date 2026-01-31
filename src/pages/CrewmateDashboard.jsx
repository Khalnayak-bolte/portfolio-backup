import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import TiltCard from "../components/effects/TiltCard";
import CardFX from "../components/CardFX";

const CrewmateDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  /* 🔐 CHECK LOGIN (LOCAL STORAGE) */
  useEffect(() => {
    const stored = localStorage.getItem("crewmate");
    if (!stored) {
      navigate("/crewmate-login", { replace: true });
      return;
    }

    const data = JSON.parse(stored);
    setUsername(data.username);
  }, [navigate]);

  /* 🔴 REAL-TIME ASSIGNED PROJECTS (USERNAME BASED) */
  useEffect(() => {
    if (!username) return;

    const q = query(
      collection(db, "projectRequests"),
      where("assignedTo", "==", username)
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
  }, [username]);

  /* 🔄 UPDATE STATUS */
  const updateStatus = async (projectId, status) => {
    try {
      await updateDoc(doc(db, "projectRequests", projectId), {
        status,
        ...(status === "completed" && {
          completedAt: serverTimestamp(),
        }),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update project");
    }
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    localStorage.removeItem("crewmate");
    navigate("/crewmate-login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crewmate Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading assigned work...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-400">No assigned work yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <TiltCard key={p.id}>
                <CardFX>
                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold text-lg">
                      {p.serviceType || "Project"}
                    </h3>

                    <p className="text-sm text-gray-300">
                      {p.description}
                    </p>

                    {p.adminComment && (
                      <p className="text-sm text-indigo-400">
                        📝 Admin: {p.adminComment}
                      </p>
                    )}

                    {/* STATUS BADGE */}
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full ${
                        p.status === "completed"
                          ? "bg-green-600"
                          : p.status === "in_progress"
                          ? "bg-yellow-600"
                          : "bg-indigo-600"
                      }`}
                    >
                      {p.status}
                    </span>

                    {/* ACTIONS */}
                    {p.status !== "completed" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() =>
                            updateStatus(p.id, "in_progress")
                          }
                          className="px-3 py-1 text-sm rounded bg-yellow-600 hover:bg-yellow-700"
                        >
                          In Progress
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(p.id, "completed")
                          }
                          className="px-3 py-1 text-sm rounded bg-green-600 hover:bg-green-700"
                        >
                          Completed
                        </button>
                      </div>
                    )}
                  </div>
                </CardFX>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewmateDashboard;
