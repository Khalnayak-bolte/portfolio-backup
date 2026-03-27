import { useEffect, useState } from "react";
import {
  collection, doc, updateDoc, deleteDoc,
  orderBy, query, onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const statusColor = {
  new:       "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  contacted: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  closed:    "bg-green-500/20 text-green-300 border-green-500/30",
  assigned:  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const AdminCard = ({ children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-3">
    {children}
  </div>
);

const ProjectRequests = ({ search = "", onAssign }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projectRequests"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q,
      (snap) => { setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); setLoading(false); },
      (err)  => { console.error(err); setLoading(false); }
    );
    return () => unsub();
  }, []);

  const updateStatus = async (id, status) => {
    try { await updateDoc(doc(db, "projectRequests", id), { status, updatedAt: new Date() }); }
    catch (err) { console.error(err); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project request?")) return;
    try { await deleteDoc(doc(db, "projectRequests", id)); }
    catch (err) { console.error(err); }
  };

  const filtered = projects.filter((p) =>
    `${p.name} ${p.email}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-gray-500 text-sm">Loading project requests...</p>;
  if (filtered.length === 0) return <p className="text-gray-500 text-sm">No project requests found.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {filtered.map((req) => {
        const isAssigned  = req.status === "assigned" && req.assignedTo;
        const isCompleted = req.status === "completed";
        return (
          <AdminCard key={req.id}>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-white">{req.name}</h3>
              <span className={`px-2.5 py-0.5 text-xs rounded-full border font-medium ${statusColor[req.status || "new"]}`}>
                {req.status || "new"}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-400">
              <p>📧 {req.email}</p>
              {req.phone && <p>📞 {req.phone}</p>}
              {req.serviceType && <p className="text-indigo-400 font-medium">🛠 {req.serviceType}</p>}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{req.description}</p>
            {(isAssigned || isCompleted) && (
              <div className="text-sm text-purple-400 space-y-0.5">
                <p>👤 Assigned to: <b>{req.assignedToName}</b></p>
                {req.adminComment && <p>📝 {req.adminComment}</p>}
              </div>
            )}
            {isCompleted && <p className="text-sm text-emerald-400 font-medium">✅ Work completed</p>}
            {req.createdAt && <p className="text-xs text-gray-600">{req.createdAt.toDate().toLocaleString()}</p>}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-700">
              <button onClick={() => updateStatus(req.id, "contacted")} disabled={isCompleted}
                className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-xs text-white disabled:opacity-40 transition">
                Contacted
              </button>
              <button onClick={() => updateStatus(req.id, "closed")} disabled={isCompleted}
                className="px-3 py-1.5 bg-green-700 hover:bg-green-600 rounded-lg text-xs text-white disabled:opacity-40 transition">
                Closed
              </button>
              <button type="button" disabled={isAssigned || isCompleted} onClick={() => onAssign?.(req)}
                className={`px-3 py-1.5 rounded-lg text-xs text-white transition ${isAssigned || isCompleted ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}`}>
                {isCompleted ? "Completed" : isAssigned ? "Assigned" : "Assign"}
              </button>
              <button onClick={() => remove(req.id)}
                className="px-3 py-1.5 bg-gray-700 hover:bg-red-700 rounded-lg text-xs text-white transition">
                Delete
              </button>
            </div>
          </AdminCard>
        );
      })}
    </div>
  );
};

export default ProjectRequests;
