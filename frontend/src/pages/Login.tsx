import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";//link means navigate to register page
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.access_token);
      navigate("/dashboard"); //redirect after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.switch}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

/* ---------- styles ---------- */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "8px",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
  switch: {
    marginTop: "16px",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    fontWeight: 600,
    textDecoration: "none",
  },
};
