import { useState } from "react";
import api from "../api/axios";

const Diet = () => {
  const [goal, setGoal] = useState("weight_loss");
  const [plan, setPlan] = useState<string[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getDietPlan = async () => {
    setError("");
    setPlan(null);
    setLoading(true);

    try {
      const res = await api.post("/diet/plan", {
        tdee: 2200,
        goal: goal,
        detected_food: "burger",
        detected_calories: 700,
      });

      setPlan(res.data.diet_plan);
    } catch (err) {
      console.error(err);
      setError("Failed to generate diet plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🥗 Personalized Diet Plan</h2>
        <p style={styles.subtitle}>
          Choose your fitness goal and generate a tailored diet plan
        </p>

        {/* Goal Selector */}
        <div style={styles.field}>
          <label style={styles.label}>Select Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={styles.select}
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={getDietPlan}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Diet Plan"}
        </button>

        {/* Error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Result */}
        {plan && (
          <div style={styles.planBox}>
            <h3 style={styles.planTitle}>📋 Recommended Diet</h3>
            <ul style={styles.list}>
              {plan.map((item, idx) => (
                <li key={idx} style={styles.listItem}>
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- styles ---------- */

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    padding: "26px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "22px",
  },
  field: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "6px",
    fontWeight: 500,
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#16a34a",
    color: "#fff",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "14px",
    fontSize: "14px",
  },
  planBox: {
    marginTop: "26px",
    padding: "16px",
    background: "#f0fdf4",
    borderRadius: "10px",
    border: "1px solid #bbf7d0",
  },
  planTitle: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: 600,
  },
  list: {
    paddingLeft: "0",
    listStyle: "none",
    margin: 0,
  },
  listItem: {
    marginBottom: "8px",
    fontSize: "14px",
  },
};

export default Diet;
