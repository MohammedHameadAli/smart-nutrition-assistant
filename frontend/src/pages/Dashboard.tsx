import { useEffect, useState } from "react";
import api from "../api/axios";

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface FoodLog {
  _id: string;
  food: string;
  nutrition: Nutrition;
  timestamp: string;
}

const Dashboard = () => {
  const [history, setHistory] = useState<FoodLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/food/history");
        setHistory(res.data.history);
      } catch (err) {
        console.error("Failed to fetch food history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div style={styles.center}>
        <p style={styles.loading}>Loading food history…</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🍽 Food History</h1>
      <p style={styles.subtitle}>Track everything you’ve eaten so far</p>

      {history.length === 0 && (
        <p style={styles.empty}>No food logged yet.</p>
      )}

      <div style={styles.grid}>
        {history.map((log) => (
          <div key={log._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.food}>{log.food.toUpperCase()}</h3>
              <span style={styles.time}>
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>

            <div style={styles.macros}>
              <span>🔥 {log.nutrition.calories} kcal</span>
              <span>💪 {log.nutrition.protein} g</span>
              <span>🍞 {log.nutrition.carbs} g</span>
              <span>🥑 {log.nutrition.fats} g</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- STYLES ---------- */

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "32px 24px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "4px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "28px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
    border: "1px solid #eee",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },
  food: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
  },
  time: {
    fontSize: "12px",
    color: "#888",
  },
  macros: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    fontSize: "14px",
    fontWeight: 500,
  },
  empty: {
    textAlign: "center",
    color: "#777",
    marginTop: "40px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },
  loading: {
    fontSize: "16px",
    color: "#555",
  },
};

export default Dashboard;
