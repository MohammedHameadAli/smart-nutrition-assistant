// import { useState } from "react";
// import api from "../api/axios";

// const Exercise = () => {
//   const [goal, setGoal] = useState("weight_loss");
//   const [plan, setPlan] = useState<string[] | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getExercisePlan = async () => {
//     setError("");
//     setPlan(null);
//     setLoading(true);

//     try {
//       const res = await api.post("/exercise/plan", {
//         bmi: 24.5,
//         goal: goal,
//         activity_level: "moderate",
//       });

//       setPlan(res.data.exercise_plan);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate exercise plan");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>🏋️ Personalized Exercise Plan</h2>
//         <p style={styles.subtitle}>
//           Generate a workout routine based on your fitness goal
//         </p>

//         {/* Goal Selector */}
//         <div style={styles.field}>
//           <label style={styles.label}>Select Goal</label>
//           <select
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//             style={styles.select}
//           >
//             <option value="weight_loss">Weight Loss</option>
//             <option value="muscle_gain">Muscle Gain</option>
//             <option value="maintenance">Maintenance</option>
//           </select>
//         </div>

//         {/* Button */}
//         <button
//           onClick={getExercisePlan}
//           style={{
//             ...styles.button,
//             opacity: loading ? 0.7 : 1,
//           }}
//           disabled={loading}
//         >
//           {loading ? "Generating..." : "Generate Exercise Plan"}
//         </button>

//         {/* Error */}
//         {error && <p style={styles.error}>{error}</p>}

//         {/* Result */}
//         {plan && (
//           <div style={styles.planBox}>
//             <h3 style={styles.planTitle}>🔥 Recommended Workouts</h3>
//             <ul style={styles.list}>
//               {plan.map((item, idx) => (
//                 <li key={idx} style={styles.listItem}>
//                   💪 {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ---------- styles ---------- */

// const styles: { [key: string]: React.CSSProperties } = {
//   page: {
//     display: "flex",
//     justifyContent: "center",
//     padding: "40px 20px",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "520px",
//     background: "#ffffff",
//     padding: "26px",
//     borderRadius: "14px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//     border: "1px solid #eee",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: 700,
//     marginBottom: "6px",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#666",
//     marginBottom: "22px",
//   },
//   field: {
//     marginBottom: "18px",
//   },
//   label: {
//     display: "block",
//     fontSize: "14px",
//     marginBottom: "6px",
//     fontWeight: 500,
//   },
//   select: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     fontSize: "15px",
//     fontWeight: 600,
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     marginTop: "10px",
//   },
//   error: {
//     color: "red",
//     marginTop: "14px",
//     fontSize: "14px",
//   },
//   planBox: {
//     marginTop: "26px",
//     padding: "16px",
//     background: "#eff6ff",
//     borderRadius: "10px",
//     border: "1px solid #bfdbfe",
//   },
//   planTitle: {
//     marginBottom: "10px",
//     fontSize: "16px",
//     fontWeight: 600,
//   },
//   list: {
//     paddingLeft: "0",
//     listStyle: "none",
//     margin: 0,
//   },
//   listItem: {
//     marginBottom: "8px",
//     fontSize: "14px",
//   },
// };

// export default Exercise;






import { useMemo, useState } from "react";
import api from "../api/axios";

type ExercisePlan = {
  bmi: number;
  bmi_category: string;
  goal: string;
  activity_level: string;
  fitness_level: string;
  intensity: string;
  session_duration: string;
  frequency_per_week: string;
  estimated_calorie_burn_per_session: string;
  recommended_exercises: string[];
  warmup: string[];
  cooldown: string[];
  weekly_schedule: { [key: string]: string };
  precautions: string[];
  recommendation_reason: string;
};

const Exercise = () => {
  const [goal, setGoal] = useState("weight_loss");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [plan, setPlan] = useState<ExercisePlan | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // BMI Calculation
  const bmi = useMemo(() => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || heightNum <= 0) return null;

    const heightInMeters = heightNum / 100;
    return +(weightNum / (heightInMeters * heightInMeters)).toFixed(1);
  }, [weight, height]);

  const getExercisePlan = async () => {
    setError("");
    setPlan(null);

    if (!weight || !height) {
      setError("Please enter both weight and height");
      return;
    }

    if (!bmi || bmi <= 0) {
      setError("Invalid weight or height values");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/exercise/plan", {
        bmi: bmi,
        goal: goal,
        activity_level: activityLevel,
      });

      setPlan(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate exercise plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏋️ Personalized Exercise Plan</h2>
        <p style={styles.subtitle}>
          Enter your weight and height to calculate BMI and generate a smart workout plan
        </p>

        {/* Weight Input */}
        <div style={styles.field}>
          <label style={styles.label}>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={styles.input}
            placeholder="Enter your weight in kg"
          />
        </div>

        {/* Height Input */}
        <div style={styles.field}>
          <label style={styles.label}>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={styles.input}
            placeholder="Enter your height in cm"
          />
        </div>

        {/* Auto BMI Display */}
        <div style={styles.bmiBox}>
          <span style={styles.bmiLabel}>Calculated BMI:</span>
          <span style={styles.bmiValue}>
            {bmi ? bmi : "Enter weight and height"}
          </span>
        </div>

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

        {/* Activity Level Selector */}
        <div style={styles.field}>
          <label style={styles.label}>Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            style={styles.select}
          >
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={getExercisePlan}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Exercise Plan"}
        </button>

        {/* Error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Result */}
        {plan && (
          <div style={styles.resultContainer}>
            {/* Summary */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📊 Plan Summary</h3>
              <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                  <strong>BMI</strong>
                  <p>{plan.bmi}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>BMI Category</strong>
                  <p>{plan.bmi_category}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Fitness Level</strong>
                  <p>{plan.fitness_level}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Intensity</strong>
                  <p>{plan.intensity}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Session Duration</strong>
                  <p>{plan.session_duration}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Frequency</strong>
                  <p>{plan.frequency_per_week}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Calorie Burn</strong>
                  <p>{plan.estimated_calorie_burn_per_session}</p>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🧠 Why This Plan?</h3>
              <p style={styles.reasonText}>{plan.recommendation_reason}</p>
            </div>

            {/* Recommended Exercises */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🔥 Recommended Exercises</h3>
              <ul style={styles.list}>
                {plan.recommended_exercises.map((item, idx) => (
                  <li key={idx} style={styles.listItem}>
                    💪 {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warmup */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🔥 Warm-Up</h3>
              <ul style={styles.list}>
                {plan.warmup.map((item, idx) => (
                  <li key={idx} style={styles.listItem}>
                    🟦 {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cooldown */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🧘 Cool-Down</h3>
              <ul style={styles.list}>
                {plan.cooldown.map((item, idx) => (
                  <li key={idx} style={styles.listItem}>
                    🟩 {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weekly Schedule */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📅 Weekly Workout Schedule</h3>
              <div style={styles.scheduleBox}>
                {Object.entries(plan.weekly_schedule).map(([day, workout]) => (
                  <div key={day} style={styles.scheduleItem}>
                    <strong>{day}</strong>
                    <p>{workout}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Precautions */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>⚠️ Precautions</h3>
              <ul style={styles.list}>
                {plan.precautions.map((item, idx) => (
                  <li key={idx} style={styles.listItem}>
                    ⚠️ {item}
                  </li>
                ))}
              </ul>
            </div>
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
    background: "#f8fafc",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#ffffff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#666",
    marginBottom: "24px",
  },
  field: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "6px",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  bmiBox: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bmiLabel: {
    fontWeight: 600,
    fontSize: "14px",
  },
  bmiValue: {
    fontWeight: 700,
    fontSize: "18px",
    color: "#1d4ed8",
  },
  button: {
    width: "100%",
    padding: "13px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "#fff",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "14px",
    fontSize: "14px",
  },
  resultContainer: {
    marginTop: "28px",
  },
  section: {
    marginBottom: "24px",
    padding: "18px",
    background: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "12px",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "14px",
  },
  summaryCard: {
    background: "#eff6ff",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #bfdbfe",
    fontSize: "14px",
  },
  reasonText: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#333",
  },
  list: {
    paddingLeft: "0",
    listStyle: "none",
    margin: 0,
  },
  listItem: {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#222",
  },
  scheduleBox: {
    display: "grid",
    gap: "12px",
  },
  scheduleItem: {
    background: "#ffffff",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
};

export default Exercise;