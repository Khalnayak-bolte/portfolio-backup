import { useEffect, useState } from "react";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import AssignCrewModal from "../components/admin/AssignCrewModal";
import ProjectRequests from "../components/admin/ProjectRequests";
import CertificationsAdmin from "../components/admin/CertificationsAdmin";
import TestimonialsAdmin from "../components/admin/TestimonialsAdmin";
import {
  collection, getDocs, orderBy, query,
  doc, updateDoc, deleteDoc, setDoc, getDoc, serverTimestamp,
} from "firebase/firestore";
import { auth, db, secondaryAuth } from "../firebase/firebase";

const statusColor = {
  accepted: "text-emerald-400",
  rejected: "text-red-400",
  new:      "text-gray-400",
};

const AdminCard = ({ children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 space-y-3">
    {children}
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab]             = useState("projects");
  const [crew, setCrew]                       = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [search, setSearch]                   = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchCrew = async () => {
    const q = query(collection(db, "crewApplications"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setCrew(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { fetchCrew().finally(() => setLoading(false)); }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin-login";
  };

  const acceptCrew = async (crewApp) => {
    try {
      if (crewApp.status === "accepted") return;
      const password = prompt(`Create login password for ${crewApp.email}:`);
      if (!password || password.length < 6) { alert("Password must be at least 6 characters."); return; }
      await createUserWithEmailAndPassword(secondaryAuth, crewApp.email, password);
      const existing = await getDoc(doc(db, "crewmates", crewApp.email));
      if (existing.exists()) { alert("Crewmate already exists."); return; }
      await setDoc(doc(db, "crewmates", crewApp.email), {
        email: crewApp.email,
        name: `${crewApp.firstName} ${crewApp.lastName || ""}`.trim(),
        role: crewApp.role || "", active: true, createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "crewApplications", crewApp.id), { status: "accepted", updatedAt: serverTimestamp() });
      alert(`Crewmate account created!\n\nEmail: ${crewApp.email}\nPassword: ${password}\n\nShare credentials securely.`);
      fetchCrew();
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") alert("Auth account already exists for this email.");
      else alert("Failed to create crewmate account.");
    }
  };

  const rejectCrew = async (id) => {
    await updateDoc(doc(db, "crewApplications", id), { status: "rejected", updatedAt: serverTimestamp() });
    fetchCrew();
  };

  const removeDoc = async (collectionName, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    await deleteDoc(doc(db, collectionName, id));
    fetchCrew();
  };

  const filteredCrew = crew.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const TABS = [
    { id: "projects",       label: "Project Requests" },
    { id: "crew",           label: "Crew Applications" },
    { id: "certifications", label: "🏆 Certifications" },
    { id: "testimonials",   label: "🌟 Testimonials" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm transition">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-4">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        {(activeTab === "projects" || activeTab === "crew") && (
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 px-4 py-2.5 rounded-lg bg-gray-800 text-white text-sm
              outline-none border border-gray-700 focus:border-indigo-500 transition
              placeholder:text-gray-500"
          />
        )}

        {loading && (activeTab === "projects" || activeTab === "crew") && (
          <p className="text-gray-500 text-sm">Loading data...</p>
        )}

        {/* Project Requests */}
        {!loading && activeTab === "projects" && (
          <ProjectRequests search={search} onAssign={(project) => {
            setSelectedProject(project);
            setShowAssignModal(true);
          }} />
        )}

        {/* Crew Applications */}
        {!loading && activeTab === "crew" && (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCrew.length === 0 && (
              <p className="text-gray-500 text-sm">No crew applications found.</p>
            )}
            {filteredCrew.map((c) => (
              <AdminCard key={c.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-white">{c.firstName} {c.lastName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.role}</p>
                  </div>
                  <span className={`text-xs font-semibold capitalize ${statusColor[c.status] || statusColor.new}`}>
                    {c.status || "new"}
                  </span>
                </div>
                <p className="text-sm text-gray-400">📧 {c.email}</p>
                <div className="flex gap-2 pt-2 border-t border-gray-700">
                  {c.status !== "accepted" && (
                    <button onClick={() => acceptCrew(c)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs text-white transition">
                      Accept
                    </button>
                  )}
                  {c.status !== "rejected" && (
                    <button onClick={() => rejectCrew(c.id)}
                      className="px-3 py-1.5 bg-red-700 hover:bg-red-600 rounded-lg text-xs text-white transition">
                      Reject
                    </button>
                  )}
                  <button onClick={() => removeDoc("crewApplications", c.id)}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-red-700 rounded-lg text-xs text-white transition">
                    Delete
                  </button>
                </div>
              </AdminCard>
            ))}
          </div>
        )}

        {/* Certifications */}
        {activeTab === "certifications" && <CertificationsAdmin />}

        {/* Testimonials */}
        {activeTab === "testimonials" && <TestimonialsAdmin />}
      </div>

      {/* Assign Modal */}
      {showAssignModal && selectedProject && (
        <AssignCrewModal
          open={showAssignModal}
          project={selectedProject}
          onClose={() => { setShowAssignModal(false); setSelectedProject(null); }}
          onAssigned={() => { setShowAssignModal(false); setSelectedProject(null); }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
