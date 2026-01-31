import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import GradientButton from "../components/GradientButton";

const CrewmateLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ 1. FIREBASE AUTH LOGIN (REQUIRED)
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = cred.user;

      // ✅ 2. READ CREWMATE PROFILE (NOW ALLOWED)
      const ref = doc(db, "crewmates", user.email);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setError("Crewmate account not found");
        setLoading(false);
        return;
      }

      const crewmate = snap.data();

      if (!crewmate.active) {
        setError("Your account is disabled");
        setLoading(false);
        return;
      }

      // ✅ 3. LOGIN SUCCESS
      localStorage.setItem(
        "crewmate",
        JSON.stringify({
          email: user.email,
          role: crewmate.role,
          name: crewmate.name,
        })
      );

      navigate("/crewmate", { replace: true });
    } catch (err) {
      console.error("Crewmate login failed:", err);

      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-800 p-8 rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Crewmate Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded bg-gray-700 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded bg-gray-700 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <GradientButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </GradientButton>
      </form>
    </div>
  );
};

export default CrewmateLogin;
