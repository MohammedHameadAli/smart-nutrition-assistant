// import { useEffect, useState } from "react";
// import api from "../api/axios";

// interface Nutrition {
//   calories: number;
//   protein: number;
//   carbs: number;
//   fats: number;
// }

// interface FoodLog {
//   _id: string;
//   food: string;
//   nutrition: Nutrition;
//   timestamp: string;
// }

// const Dashboard = () => {
//   const [history, setHistory] = useState<FoodLog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await api.get("/food/history");
//         setHistory(res.data.history);
//       } catch (err) {
//         console.error("Failed to fetch food history", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) {
//     return (
//       <div style={styles.center}>
//         <p style={styles.loading}>Loading food history…</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.title}>Food History</h1>
//       <p style={styles.subtitle}>Track everything you’ve eaten so far</p>

//       {history.length === 0 && (
//         <p style={styles.empty}>No food logged yet.</p>
//       )}

//       <div style={styles.grid}>
//         {history.map((log) => (
//           <div key={log._id} style={styles.card}>
//             <div style={styles.cardHeader}>
//               <h3 style={styles.food}>{log.food.toUpperCase()}</h3>
//               <span style={styles.time}>
//                 {new Date(log.timestamp).toLocaleString()}
//               </span>
//             </div>

//             <div style={styles.macros}>
//               <span>calories {log.nutrition.calories} kcal</span>
//               <span>protein {log.nutrition.protein} g</span>
//               <span>carbs {log.nutrition.carbs} g</span>
//               <span>fats {log.nutrition.fats} g</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ---------- STYLES ---------- */

// const styles: { [key: string]: React.CSSProperties } = {
//   page: {
//     maxWidth: "1400px",
//     margin: "0 auto",
//     padding: "32px 24px",
//   },
//   title: {
//     fontSize: "32px",
//     fontWeight: 700,
//     marginBottom: "4px",
//   },
//   subtitle: {
//     color: "#666",
//     marginBottom: "28px",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//     gap: "20px",
//   },
//   card: {
//     background: "#fff",
//     borderRadius: "14px",
//     padding: "18px",
//     boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
//     border: "1px solid #eee",
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "14px",
//   },
//   food: {
//     margin: 0,
//     fontSize: "18px",
//     fontWeight: 600,
//   },
//   time: {
//     fontSize: "12px",
//     color: "#888",
//   },
//   macros: {
//     display: "flex",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: "10px",
//     fontSize: "14px",
//     fontWeight: 500,
//   },
//   empty: {
//     textAlign: "center",
//     color: "#777",
//     marginTop: "40px",
//   },
//   center: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "60vh",
//   },
//   loading: {
//     fontSize: "16px",
//     color: "#555",
//   },
// };

// export default Dashboard;





import { useEffect, useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/food/history");

        const sortedHistory = res.data.history.sort(
          (a: FoodLog, b: FoodLog) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setHistory(sortedHistory);
      } catch (err) {
        console.error("Failed to fetch food history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  const isLast7Days = (date: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const filteredHistory = useMemo(() => {
    return history.filter((log) => {
      const matchesSearch = log.food
        .toLowerCase()
        .includes(search.toLowerCase());

      const logDate = new Date(log.timestamp);

      let matchesTime = true;

      if (timeFilter === "today") {
        matchesTime = isToday(logDate);
      } else if (timeFilter === "yesterday") {
        matchesTime = isYesterday(logDate);
      } else if (timeFilter === "last7") {
        matchesTime = isLast7Days(logDate);
      } else if (timeFilter === "older") {
        matchesTime =
          !isToday(logDate) && !isYesterday(logDate) && !isLast7Days(logDate);
      }

      return matchesSearch && matchesTime;
    });
  }, [history, search, timeFilter]);

  if (loading) {
    return (
      <div style={styles.center}>
        <p style={styles.loading}>⏳ Loading food history…</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>◴ Food History</h1>
      <p style={styles.subtitle}>📊 Track everything you’ve eaten so far</p>

      {/* Search + Filter Row */}
      <div style={styles.topControls}>
        <input
          type="text"
          placeholder="Search food (e.g. pizza, banana)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          style={styles.selectInput}
        >
          <option value="all">♾️ All Time</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7">Last 7 Days</option>
          <option value="older">Older</option>
        </select>
      </div>

      {filteredHistory.length === 0 ? (
        <p style={styles.empty}>No matching food found.</p>
      ) : (
        <div style={styles.grid}>
          {filteredHistory.map((log) => (
            <div key={log._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.food}>{log.food.toUpperCase()}</h3>
                <span style={styles.time}>
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>

              <div style={styles.macros}>
                <span>🔥 calories {log.nutrition.calories} kcal</span>
                <span>🍗 protein {log.nutrition.protein} g</span>
                <span>🥖 carbs {log.nutrition.carbs} g</span>
                <span>🥑 fats {log.nutrition.fats} g</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------- STYLES ---------- */

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px",
    background: "#f9fafb",
    minHeight: "100vh",
  },

  title: {
    fontSize: "34px",
    fontWeight: 700,
    marginBottom: "6px",
    color: "#111",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "28px",
    fontSize: "15px",
  },

  /* Top Controls */
  topControls: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "32px",
  },

  searchInput: {
    flex: 1,
    minWidth: "260px",
    maxWidth: "420px",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
  },

  selectInput: {
    minWidth: "200px",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "22px",
  },

  /* Card */
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    transition: "all 0.25s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
    gap: "10px",
  },

  food: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#111827",
    letterSpacing: "0.3px",
  },

  time: {
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "right",
    whiteSpace: "nowrap",
  },

  /* Macros */
  macros: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  macroItem: {
    background: "#f9fafb",
    padding: "10px 12px",
    borderRadius: "10px",
    fontSize: "13px",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 500,
  },

  macroLabel: {
    color: "#6b7280",
  },

  macroValue: {
    color: "#111827",
    fontWeight: 600,
  },

  empty: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: "50px",
    fontSize: "15px",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },

  loading: {
    fontSize: "16px",
    color: "#6b7280",
  },
};


export default Dashboard;