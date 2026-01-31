import { useEffect, useState } from "react";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import AssignCrewModal from "../components/admin/AssignCrewModal";
import ProjectRequests from "../components/admin/ProjectRequests";
import TiltCard from "../components/effects/TiltCard";
import CardFX from "../components/CardFX";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  /* 🔄 FETCH CREW APPLICATIONS */
  const fetchCrew = async () => {
    const q = query(
      collection(db, "crewApplications"),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    setCrew(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchCrew().finally(() => setLoading(false));
  }, []);

  /* 🔐 LOGOUT */
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin-login";
  };

  /* ✅ ACCEPT CREW (SECURE FLOW) */
  const acceptCrew = async (crewApp) => {
    try {
      if (crewApp.status === "accepted") return;

      const password = prompt(
        `Create login password for ${crewApp.email}:`
      );
      if (!password || password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      // 🔐 1. CREATE FIREBASE AUTH USER
      await createUserWithEmailAndPassword(
        auth,
        crewApp.email,
        password
      );

      // 🔎 2. PREVENT DUPLICATE CREWMATE DOC
      const existing = await getDoc(
        doc(db, "crewmates", crewApp.email)
      );
      if (existing.exists()) {
        alert("Crewmate already exists.");
        return;
      }

      // 📄 3. CREATE CREWMATE PROFILE (NO PASSWORD)
      await setDoc(doc(db, "crewmates", crewApp.email), {
        email: crewApp.email,
        name: `${crewApp.firstName} ${crewApp.lastName || ""}`.trim(),
        role: crewApp.role || "",
        active: true,
        createdAt: serverTimestamp(),
      });

      // ✅ 4. MARK APPLICATION ACCEPTED
      await updateDoc(doc(db, "crewApplications", crewApp.id), {
        status: "accepted",
        updatedAt: serverTimestamp(),
      });

      alert(
        `Crewmate account created successfully!\n\nEmail: ${crewApp.email}\nPassword: ${password}\n\nShare credentials securely.`
      );

      fetchCrew();
    } catch (err) {
      console.error("Accept crew failed:", err);

      if (err.code === "auth/email-already-in-use") {
        alert("Auth account already exists for this email.");
      } else {
        alert("Failed to create crewmate account.");
      }
    }
  };

  /* ❌ REJECT CREW */
  const rejectCrew = async (id) => {
    await updateDoc(doc(db, "crewApplications", id), {
      status: "rejected",
      updatedAt: serverTimestamp(),
    });
    fetchCrew();
  };

  /* 🗑 DELETE */
  const removeDoc = async (collectionName, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    await deleteDoc(doc(db, collectionName, id));
    fetchCrew();
  };

  const filteredCrew = crew.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-2 rounded-full ${
              activeTab === "projects"
                ? "bg-indigo-600"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            Project Requests
          </button>

          <button
            onClick={() => setActiveTab("crew")}
            className={`px-5 py-2 rounded-full ${
              activeTab === "crew"
                ? "bg-indigo-600"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            Crew Applications
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded bg-gray-800 outline-none"
        />

        {loading && <p className="text-gray-400">Loading data...</p>}

        {/* PROJECT REQUESTS */}
        {!loading && activeTab === "projects" && (
          <ProjectRequests
            search={search}
            onAssign={(project) => {
              setSelectedProject(project);
              setShowAssignModal(true);
            }}
          />
        )}

        {/* CREW APPLICATIONS */}
        {!loading && activeTab === "crew" && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCrew.map((c) => (
              <TiltCard key={c.id}>
                <CardFX>
                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold">
                      {c.firstName} {c.lastName}
                    </h3>
                    <p>📧 {c.email}</p>
                    <p className="text-sm">{c.role}</p>

                    <p
                      className={`font-semibold ${
                        c.status === "accepted"
                          ? "text-green-500"
                          : c.status === "rejected"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {c.status || "new"}
                    </p>

                    <div className="flex gap-2 pt-2">
                      {c.status !== "accepted" && (
                        <button
                          onClick={() => acceptCrew(c)}
                          className="px-3 py-1 rounded bg-green-600 text-sm"
                        >
                          Accept
                        </button>
                      )}

                      {c.status !== "rejected" && (
                        <button
                          onClick={() => rejectCrew(c.id)}
                          className="px-3 py-1 rounded bg-red-600 text-sm"
                        >
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() =>
                          removeDoc("crewApplications", c.id)
                        }
                        className="px-3 py-1 rounded bg-gray-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </CardFX>
              </TiltCard>
            ))}
          </div>
        )}
      </div>

      {/* ASSIGN MODAL */}
      {showAssignModal && selectedProject && (
        <AssignCrewModal
          open={showAssignModal}
          project={selectedProject}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedProject(null);
          }}
          onAssigned={() => {
            setShowAssignModal(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
