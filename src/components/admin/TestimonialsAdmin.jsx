import { useEffect, useState } from "react";
import {
  collection, query, orderBy, onSnapshot,
  deleteDoc, doc, updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const STATUS_COLORS = {
  pending:  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  approved: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  rejected: "bg-red-500/20 text-red-300 border-red-500/30",
};

const AdminCard = ({ children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
    {children}
  </div>
);

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [filter,       setFilter]       = useState("all");
  const [toast,        setToast]        = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      showToast("Testimonial deleted.");
    } catch (err) { showToast("Failed to delete.", "error"); }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { status });
      showToast(`Marked as ${status}.`);
    } catch (err) { showToast("Failed to update.", "error"); }
  };

  const filtered = filter === "all"
    ? testimonials
    : testimonials.filter((t) => (t.status || "pending") === filter);

  const counts = {
    all:      testimonials.length,
    pending:  testimonials.filter((t) => (t.status || "pending") === "pending").length,
    approved: testimonials.filter((t) => t.status === "approved").length,
    rejected: testimonials.filter((t) => t.status === "rejected").length,
  };

  return (
    <div className="space-y-5">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl
          shadow-2xl text-sm font-medium text-white
          ${toast.type === "error" ? "bg-red-600" : "bg-emerald-600"}`}>
          {toast.type === "error" ? "✖" : "✔"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">🌟 Testimonials</h2>
        <span className="text-sm text-gray-400">{counts.all} total</span>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition
              ${filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}>
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-400 text-sm">Loading testimonials...</p>}
      {!loading && filtered.length === 0 && (
        <p className="text-gray-500 text-sm">No {filter !== "all" ? filter : ""} testimonials found.</p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((t) => {
            const status = t.status || "pending";
            const date   = t.createdAt?.toDate?.()?.toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            });

            return (
              <AdminCard key={t.id}>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-indigo-400">{t.role}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs rounded-full border font-medium ${STATUS_COLORS[status]}`}>
                    {status}
                  </span>
                </div>

                <p className="text-sm text-gray-300 italic leading-relaxed mt-2">
                  "{t.message}"
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span className="text-yellow-400">{"★".repeat(t.rating || 0)}{"☆".repeat(5 - (t.rating || 0))}</span>
                  {date && <span>{date}</span>}
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-700">
                  {status !== "approved" && (
                    <button onClick={() => updateStatus(t.id, "approved")}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs text-white transition">
                      ✔ Approve
                    </button>
                  )}
                  {status !== "rejected" && (
                    <button onClick={() => updateStatus(t.id, "rejected")}
                      className="px-3 py-1.5 bg-yellow-700 hover:bg-yellow-600 rounded-lg text-xs text-white transition">
                      ✖ Reject
                    </button>
                  )}
                  <button onClick={() => deleteTestimonial(t.id)}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-red-700 rounded-lg text-xs text-white transition">
                    🗑 Delete
                  </button>
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestimonialsAdmin;
