import { useEffect, useState } from "react";
import TiltCard from "../effects/TiltCard";
import CardFX from "../CardFX";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CrewApplications = ({ search = "" }) => {
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCrew = async () => {
    setLoading(true);
    const q = query(
      collection(db, "crewApplications"),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    setCrew(
      snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchCrew();
  }, []);

  /* ✅ ACCEPT / ❌ REJECT */
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "crewApplications", id), { status });
    fetchCrew();
  };

  /* 🗑 DELETE */
  const remove = async (id) => {
    if (window.confirm("Delete this crew application?")) {
      await deleteDoc(doc(db, "crewApplications", id));
      fetchCrew();
    }
  };

  const filtered = crew.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-gray-500">Loading crew applications...</p>;
  }

  if (filtered.length === 0) {
    return <p className="text-gray-500">No crew applications found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {filtered.map((c) => (
        <TiltCard key={c.id}>
          <CardFX>
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {c.firstName} {c.lastName}
                </h3>
                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                  {c.role}
                </span>
              </div>

              <p className="text-sm">📧 {c.email}</p>
              <p className="text-sm">📞 {c.phone}</p>

              {c.portfolio && (
                <a
                  href={c.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  🔗 Portfolio
                </a>
              )}

              {c.otherRole && (
                <p className="text-sm">
                  <strong>Other Role:</strong> {c.otherRole}
                </p>
              )}

              {c.roleDescription && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {c.roleDescription}
                </p>
              )}

              <p className="text-gray-700 dark:text-gray-200">
                <strong>Why You?</strong> {c.whyYou}
              </p>

              {/* STATUS DISPLAY */}
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

              {c.createdAt && (
                <p className="text-xs text-gray-400">
                  {c.createdAt.toDate().toLocaleString()}
                </p>
              )}

              {/* ACTIONS */}
              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => updateStatus(c.id, "accepted")}
                  className="px-3 py-1 bg-green-600 rounded text-sm text-white"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(c.id, "rejected")}
                  className="px-3 py-1 bg-red-600 rounded text-sm text-white"
                >
                  Reject
                </button>
                <button
                  onClick={() => remove(c.id)}
                  className="px-3 py-1 bg-gray-700 rounded text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </CardFX>
        </TiltCard>
      ))}
    </div>
  );
};

export default CrewApplications;
