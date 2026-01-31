import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const ADMIN_EMAIL = "yashrajbhar41@gmail.com"; // admin email

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  // ⏳ WAIT until Firebase fully resolves auth
  if (loading) {
    return null; // or loader component
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // ❌ Logged in but not admin
  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authenticated admin
  return children;
};

export default AdminRoute;
