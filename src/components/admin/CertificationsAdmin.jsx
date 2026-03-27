import { useEffect, useState } from "react";
import {
  collection, addDoc, getDocs, deleteDoc, doc,
  updateDoc, orderBy, query, serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CATEGORIES = ["Frontend", "Backend", "Cloud", "Database", "DevOps", "Other"];

const EMPTY_FORM = {
  title: "", issuer: "", category: "Frontend", issuedDate: "",
  credentialId: "", credentialUrl: "", description: "", badgeEmoji: "",
};

const AdminCard = ({ children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
    {children}
  </div>
);

const CertificationsAdmin = () => {
  const [certs,      setCerts]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [editId,     setEditId]     = useState(null);
  const [showForm,   setShowForm]   = useState(false);
  const [toast,      setToast]      = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCerts = async () => {
    const q = query(collection(db, "certifications"), orderBy("issuedDate", "desc"));
    const snap = await getDocs(q);
    setCerts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.issuer) return;
    setSubmitting(true);
    try {
      const payload = { ...form, updatedAt: serverTimestamp() };
      if (!editId) payload.createdAt = serverTimestamp();
      if (editId) {
        await updateDoc(doc(db, "certifications", editId), payload);
        showToast("Certification updated!");
      } else {
        await addDoc(collection(db, "certifications"), payload);
        showToast("Certification added!");
      }
      setForm(EMPTY_FORM); setEditId(null); setShowForm(false);
      fetchCerts();
    } catch (err) {
      console.error(err);
      showToast("Something went wrong.", "error");
    } finally { setSubmitting(false); }
  };

  const startEdit = (cert) => {
    setForm({
      title: cert.title || "", issuer: cert.issuer || "",
      category: cert.category || "Frontend", issuedDate: cert.issuedDate || "",
      credentialId: cert.credentialId || "", credentialUrl: cert.credentialUrl || "",
      description: cert.description || "", badgeEmoji: cert.badgeEmoji || "",
    });
    setEditId(cert.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCert = async (id) => {
    if (!window.confirm("Delete this certification?")) return;
    await deleteDoc(doc(db, "certifications", id));
    showToast("Deleted.");
    fetchCerts();
  };

  const inputCls = "w-full px-3 py-2 rounded-lg text-sm bg-gray-700 text-white border border-gray-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder:text-gray-500";
  const labelCls = "block text-xs text-gray-400 mb-1 font-medium";

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
        <h2 className="text-xl font-bold text-white">🏆 Certifications</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm(EMPTY_FORM); }}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition">
          {showForm ? "✕ Cancel" : "+ Add Certificate"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <AdminCard>
          <h3 className="text-base font-semibold text-white mb-4">
            {editId ? "✏️ Edit Certification" : "➕ Add New Certification"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. React Developer Certificate" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Issuer *</label>
              <input required value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                placeholder="e.g. Udemy, Coursera, Google" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Issued Date</label>
              <input type="date" value={form.issuedDate} onChange={(e) => setForm({ ...form, issuedDate: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Credential ID</label>
              <input value={form.credentialId} onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                placeholder="UC-XXXXXXXX" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Verify URL</label>
              <input type="url" value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                placeholder="https://..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Badge Emoji (optional)</label>
              <input value={form.badgeEmoji} onChange={(e) => setForm({ ...form, badgeEmoji: e.target.value })}
                placeholder="🏆" className={inputCls} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Short Description</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description..." className={inputCls + " resize-none"} />
            </div>
            <div className="md:col-span-2 flex gap-3 pt-1">
              <button type="submit" disabled={submitting}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold disabled:opacity-60 transition">
                {submitting ? "Saving..." : editId ? "Update" : "Add Certification"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm transition">
                Cancel
              </button>
            </div>
          </form>
        </AdminCard>
      )}

      {/* List */}
      {loading && <p className="text-gray-400 text-sm">Loading certifications...</p>}
      {!loading && certs.length === 0 && <p className="text-gray-500 text-sm">No certifications added yet.</p>}

      {!loading && certs.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((cert) => (
            <AdminCard key={cert.id}>
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold text-white text-sm">{cert.title}</p>
                  <p className="text-xs text-indigo-400 mt-0.5">{cert.issuer}</p>
                </div>
                <span className="px-2.5 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300 border border-gray-600 shrink-0">
                  {cert.category}
                </span>
              </div>
              {cert.description && (
                <p className="text-xs text-gray-400 leading-relaxed mt-2">{cert.description}</p>
              )}
              <div className="text-xs text-gray-500 space-y-0.5 mt-1">
                {cert.issuedDate && <p>📅 {new Date(cert.issuedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>}
                {cert.credentialId && <p className="font-mono">ID: {cert.credentialId}</p>}
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-700">
                <button onClick={() => startEdit(cert)}
                  className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs text-white transition">
                  ✏️ Edit
                </button>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs text-white transition">
                    🔗 Verify
                  </a>
                )}
                <button onClick={() => deleteCert(cert.id)}
                  className="px-3 py-1.5 bg-gray-700 hover:bg-red-700 rounded-lg text-xs text-white transition">
                  🗑 Delete
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsAdmin;
