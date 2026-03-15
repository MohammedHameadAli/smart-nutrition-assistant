import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    try {
      await api.post("/auth/register", { email, password });
      navigate("/login"); // ✅ go to login after register
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Register</h2>

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

        <button style={styles.button} onClick={handleRegister}>
          Create Account
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.switch}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

/* reuse same styles as Login */

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
    background: "#16a34a",
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
