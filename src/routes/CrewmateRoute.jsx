import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const CrewmateRoute = ({ children }) => {
  const user = auth.currentUser;

  // 🚫 Not logged in → redirect to crewmate login
  if (!user) {
    return <Navigate to="/crewmate-login" replace />;
  }

  return children;
};

export default CrewmateRoute;
