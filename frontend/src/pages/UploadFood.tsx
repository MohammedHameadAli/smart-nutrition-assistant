import { useState } from "react";
import api from "../api/axios";

const UploadFood = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await api.post("/food/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📸 Upload Food Image</h2>
        <p style={styles.subtitle}>
          Upload a food photo to analyze nutrition & calories
        </p>

        <div style={styles.uploadBox}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            style={styles.fileInput}
          />

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            style={{
              ...styles.button,
              opacity: !file || loading ? 0.6 : 1,
            }}
          >
            {loading ? "Analyzing..." : "Analyze Food"}
          </button>
        </div>

        {loading && (
          <p style={styles.loading}>🔍 Analyzing image...</p>
        )}

        {result && (
          <div style={styles.resultCard}>
            <h3 style={styles.foodName}>
              🍽 {result.food.toUpperCase()}
            </h3>

            <p style={styles.confidence}>
              Confidence: <b>{result.confidence}%</b>
            </p>

            {result.nutrition && (
              <div style={styles.nutritionGrid}>
                <div>🔥 {result.nutrition.calories} kcal</div>
                <div>💪 {result.nutrition.protein} g protein</div>
                <div>🍞 {result.nutrition.carbs} g carbs</div>
                <div>🥑 {result.nutrition.fats} g fats</div>
              </div>
            )}
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
    padding: "24px",
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
    marginBottom: "20px",
  },
  uploadBox: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  fileInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    padding: "12px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "#fff",
  },
  loading: {
    marginTop: "14px",
    color: "#555",
    fontSize: "14px",
  },
  resultCard: {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "10px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
  },
  foodName: {
    margin: 0,
    marginBottom: "6px",
    fontSize: "18px",
  },
  confidence: {
    fontSize: "14px",
    marginBottom: "12px",
  },
  nutritionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    fontSize: "14px",
    fontWeight: 500,
  },
};

export default UploadFood;
