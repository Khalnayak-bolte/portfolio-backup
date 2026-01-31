import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/* 🔽 READ: ADMIN DASHBOARD */
export const getProjectRequests = async () => {
  const q = query(
    collection(db, "projectRequests"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* 🔽 WRITE: START A PROJECT MODAL */
export const createProjectRequest = async ({
  name,
  email,
  phone,
  description,
}) => {
  return await addDoc(collection(db, "projectRequests"), {
    name,
    email,
    phone: phone || null,
    description,
    status: "new",
    createdAt: serverTimestamp(),
  });
};
