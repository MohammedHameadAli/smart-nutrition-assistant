// import { useMemo, useState } from "react";
// import api from "../api/axios";

// type DietPlan = {
//   goal: string;
//   detected_food: string;
//   food_category: string;
//   food_analysis: string;
//   diet_quality: string;
//   target_calories: number;
//   consumed_calories_current_food: number;
//   total_calories_today: number;
//   total_protein_today: number;
//   total_carbs_today: number;
//   total_fats_today: number;
//   remaining_calories: number;
//   smart_advice: string;
//   next_meal_suggestion: string;
//   daily_diet_plan: string[];
// };

// const Diet = () => {
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("male");
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [activityLevel, setActivityLevel] = useState("moderate");

//   const [goal, setGoal] = useState("weight_loss");
//   const [detectedFood, setDetectedFood] = useState("");
//   const [detectedCalories, setDetectedCalories] = useState("");

//   const [plan, setPlan] = useState<DietPlan | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // -----------------------------
//   // BMR Calculation
//   // -----------------------------
//   const bmr = useMemo(() => {
//     const ageNum = parseFloat(age);
//     const weightNum = parseFloat(weight);
//     const heightNum = parseFloat(height);

//     if (!ageNum || !weightNum || !heightNum) return null;

//     if (gender === "male") {
//       return +(10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5).toFixed(1);
//     } else {
//       return +(10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161).toFixed(1);
//     }
//   }, [age, weight, height, gender]);

//   // -----------------------------
//   // TDEE Calculation
//   // -----------------------------
//   const tdee = useMemo(() => {
//     if (!bmr) return null;

//     let multiplier = 1.2;
//     if (activityLevel === "moderate") multiplier = 1.55;
//     if (activityLevel === "active") multiplier = 1.725;

//     return +(bmr * multiplier).toFixed(1);
//   }, [bmr, activityLevel]);

//   const getDietPlan = async () => {
//     setError("");
//     setPlan(null);

//     if (!age || !weight || !height || !detectedFood || !detectedCalories) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     if (!tdee || tdee <= 0) {
//       setError("Invalid body values. Please check your inputs.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await api.post("/diet/plan", {
//         tdee: tdee,
//         goal: goal,
//         detected_food: detectedFood,
//         detected_calories: Number(detectedCalories),
//       });

//       setPlan(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate diet plan");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>🥗 Smart Diet Recommendation</h2>
//         <p style={styles.subtitle}>
//           Enter your body details and food intake to get a personalized diet plan
//         </p>

//         {/* Age */}
//         <div style={styles.field}>
//           <label style={styles.label}>Age</label>
//           <input
//             type="number"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             style={styles.input}
//             placeholder="Enter your age"
//           />
//         </div>

//         {/* Gender */}
//         <div style={styles.field}>
//           <label style={styles.label}>Gender</label>
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             style={styles.select}
//           >
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         {/* Weight */}
//         <div style={styles.field}>
//           <label style={styles.label}>Weight (kg)</label>
//           <input
//             type="number"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             style={styles.input}
//             placeholder="Enter your weight"
//           />
//         </div>

//         {/* Height */}
//         <div style={styles.field}>
//           <label style={styles.label}>Height (cm)</label>
//           <input
//             type="number"
//             value={height}
//             onChange={(e) => setHeight(e.target.value)}
//             style={styles.input}
//             placeholder="Enter your height"
//           />
//         </div>

//         {/* Activity Level */}
//         <div style={styles.field}>
//           <label style={styles.label}>Activity Level</label>
//           <select
//             value={activityLevel}
//             onChange={(e) => setActivityLevel(e.target.value)}
//             style={styles.select}
//           >
//             <option value="sedentary">Sedentary</option>
//             <option value="moderate">Moderate</option>
//             <option value="active">Active</option>
//           </select>
//         </div>

//         {/* Goal */}
//         <div style={styles.field}>
//           <label style={styles.label}>Goal</label>
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

//         {/* Detected Food */}
//         <div style={styles.field}>
//           <label style={styles.label}>Detected Food</label>
//           <input
//             type="text"
//             value={detectedFood}
//             onChange={(e) => setDetectedFood(e.target.value)}
//             style={styles.input}
//             placeholder="e.g. pizza, chicken, rice"
//           />
//         </div>

//         {/* Detected Calories */}
//         <div style={styles.field}>
//           <label style={styles.label}>Detected Food Calories</label>
//           <input
//             type="number"
//             value={detectedCalories}
//             onChange={(e) => setDetectedCalories(e.target.value)}
//             style={styles.input}
//             placeholder="Enter food calories"
//           />
//         </div>

//         {/* Auto Calculated BMR / TDEE */}
//         <div style={styles.metricsBox}>
//           <div style={styles.metricCard}>
//             <strong>BMR</strong>
//             <p>{bmr ? `${bmr} kcal/day` : "--"}</p>
//           </div>
//           <div style={styles.metricCard}>
//             <strong>TDEE</strong>
//             <p>{tdee ? `${tdee} kcal/day` : "--"}</p>
//           </div>
//         </div>

//         {/* Button */}
//         <button
//           onClick={getDietPlan}
//           style={{
//             ...styles.button,
//             opacity: loading ? 0.7 : 1,
//           }}
//           disabled={loading}
//         >
//           {loading ? "Generating..." : "Generate Diet Plan"}
//         </button>

//         {/* Error */}
//         {error && <p style={styles.error}>{error}</p>}

//         {/* Result */}
//         {plan && (
//           <div style={styles.resultContainer}>
//             {/* Summary */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>📊 Diet Summary</h3>
//               <div style={styles.summaryGrid}>
//                 <div style={styles.summaryCard}>
//                   <strong>Goal</strong>
//                   <p>{plan.goal}</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Detected Food</strong>
//                   <p>{plan.detected_food}</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Food Category</strong>
//                   <p>{plan.food_category}</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Diet Quality</strong>
//                   <p>{plan.diet_quality}</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Target Calories</strong>
//                   <p>{plan.target_calories} kcal</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Remaining Calories</strong>
//                   <p>{plan.remaining_calories} kcal</p>
//                 </div>
//               </div>
//             </div>

//             {/* Food Analysis */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>🍽️ Food Analysis</h3>
//               <p style={styles.reasonText}>{plan.food_analysis}</p>
//             </div>

//             {/* Nutrition Totals */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>📈 Today's Nutrition</h3>
//               <div style={styles.summaryGrid}>
//                 <div style={styles.summaryCard}>
//                   <strong>Calories Today</strong>
//                   <p>{plan.total_calories_today} kcal</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Protein</strong>
//                   <p>{plan.total_protein_today} g</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Carbs</strong>
//                   <p>{plan.total_carbs_today} g</p>
//                 </div>
//                 <div style={styles.summaryCard}>
//                   <strong>Fats</strong>
//                   <p>{plan.total_fats_today} g</p>
//                 </div>
//               </div>
//             </div>

//             {/* Smart Advice */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>🧠 Smart Advice</h3>
//               <p style={styles.reasonText}>{plan.smart_advice}</p>
//             </div>

//             {/* Next Meal */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>🍱 Next Meal Suggestion</h3>
//               <p style={styles.reasonText}>{plan.next_meal_suggestion}</p>
//             </div>

//             {/* Daily Diet Plan */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>🥗 Daily Diet Plan</h3>
//               <ul style={styles.list}>
//                 {plan.daily_diet_plan.map((item, idx) => (
//                   <li key={idx} style={styles.listItem}>
//                     ✅ {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
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
//     background: "#f8fafc",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "950px",
//     background: "#ffffff",
//     padding: "28px",
//     borderRadius: "16px",
//     boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
//     border: "1px solid #eee",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: 700,
//     marginBottom: "6px",
//   },
//   subtitle: {
//     fontSize: "15px",
//     color: "#666",
//     marginBottom: "24px",
//   },
//   field: {
//     marginBottom: "18px",
//   },
//   label: {
//     display: "block",
//     fontSize: "14px",
//     marginBottom: "6px",
//     fontWeight: 600,
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   },
//   select: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   },
//   metricsBox: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "14px",
//     marginBottom: "20px",
//   },
//   metricCard: {
//     background: "#eff6ff",
//     border: "1px solid #bfdbfe",
//     borderRadius: "10px",
//     padding: "14px",
//     textAlign: "center",
//   },
//   button: {
//     width: "100%",
//     padding: "13px",
//     fontSize: "15px",
//     fontWeight: 600,
//     borderRadius: "10px",
//     border: "none",
//     cursor: "pointer",
//     backgroundColor: "#16a34a",
//     color: "#fff",
//     marginTop: "10px",
//   },
//   error: {
//     color: "red",
//     marginTop: "14px",
//     fontSize: "14px",
//   },
//   resultContainer: {
//     marginTop: "28px",
//   },
//   section: {
//     marginBottom: "24px",
//     padding: "18px",
//     background: "#f8fafc",
//     borderRadius: "12px",
//     border: "1px solid #e2e8f0",
//   },
//   sectionTitle: {
//     fontSize: "18px",
//     fontWeight: 700,
//     marginBottom: "12px",
//   },
//   summaryGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//     gap: "14px",
//   },
//   summaryCard: {
//     background: "#eff6ff",
//     padding: "14px",
//     borderRadius: "10px",
//     border: "1px solid #bfdbfe",
//     fontSize: "14px",
//   },
//   reasonText: {
//     fontSize: "15px",
//     lineHeight: 1.6,
//     color: "#333",
//   },
//   list: {
//     paddingLeft: "0",
//     listStyle: "none",
//     margin: 0,
//   },
//   listItem: {
//     marginBottom: "10px",
//     fontSize: "14px",
//     color: "#222",
//   },
// };

// export default Diet;

import { useMemo, useState } from "react";
import api from "../api/axios";

type DietPlan = {
  goal: string;
  detected_food: string;
  food_category: string;
  food_analysis: string;
  diet_quality: string;
  target_calories: number;
  consumed_calories_current_food: number;
  total_calories_today: number;
  total_protein_today: number;
  total_carbs_today: number;
  total_fats_today: number;
  remaining_calories: number;
  smart_advice: string;
  next_meal_suggestion: string;
  daily_diet_plan: string[];
};

// -----------------------------
// Food calorie lookup table
// -----------------------------
const foodCaloriesMap: { [key: string]: number } = {
  pizza: 266,
  burger: 295,
  cheeseburger: 303,
  fries: 312,
  fried_rice: 163,
  biryani: 290,
  cake: 257,
  ice_cream: 207,
  rice: 130,
  pasta: 131,
  bread: 265,
  naan: 310,
  roti: 120,
  potato: 77,
  chicken: 239,
  eggs: 155,
  paneer: 265,
  fish: 206,
  dal: 116,
  tofu: 76,
  apple: 52,
  banana: 89,
  orange: 47,
  salad: 33,
  vegetables: 50,
  broccoli: 34,
  cucumber: 16,
  pomegranate: 83,
};

const Diet = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("weight_loss");
  const [detectedFood, setDetectedFood] = useState("");

  const [plan, setPlan] = useState<DietPlan | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Normalize food key
  // -----------------------------
  const normalizedFood = detectedFood.trim().toLowerCase().replace(/\s+/g, "_");

  // -----------------------------
  // Auto calorie lookup
  // -----------------------------
  const detectedCalories = useMemo(() => {
    if (!normalizedFood) return null;
    return foodCaloriesMap[normalizedFood] ?? 150; // fallback
  }, [normalizedFood]);

  // -----------------------------
  // BMR Calculation
  // -----------------------------
  const bmr = useMemo(() => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!ageNum || !weightNum || !heightNum) return null;

    if (gender === "male") {
      return +(10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5).toFixed(1);
    } else {
      return +(10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161).toFixed(1);
    }
  }, [age, weight, height, gender]);

  // -----------------------------
  // TDEE Calculation
  // -----------------------------
  const tdee = useMemo(() => {
    if (!bmr) return null;

    let multiplier = 1.2;
    if (activityLevel === "moderate") multiplier = 1.55;
    if (activityLevel === "active") multiplier = 1.725;

    return +(bmr * multiplier).toFixed(1);
  }, [bmr, activityLevel]);

  const getDietPlan = async () => {
    setError("");
    setPlan(null);

    if (!age || !weight || !height || !detectedFood) {
      setError("Please fill in all required fields");
      return;
    }

    if (!tdee || tdee <= 0) {
      setError("Invalid body values. Please check your inputs.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/diet/plan", {
        tdee: tdee,
        goal: goal,
        detected_food: detectedFood,
        detected_calories: detectedCalories ?? 150,
      });

      console.log("Diet API Response:", res.data);
      setPlan(res.data);
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
          Enter your body details and detected food to generate a tailored diet plan
        </p>

        {/* Age */}
        <div style={styles.field}>
          <label style={styles.label}>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
            placeholder="Enter your age"
          />
        </div>

        {/* Gender */}
        <div style={styles.field}>
          <label style={styles.label}>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={styles.select}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Weight */}
        <div style={styles.field}>
          <label style={styles.label}>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={styles.input}
            placeholder="Enter your weight"
          />
        </div>

        {/* Height */}
        <div style={styles.field}>
          <label style={styles.label}>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={styles.input}
            placeholder="Enter your height"
          />
        </div>

        {/* Activity Level */}
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

        {/* Goal */}
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

        {/* Detected Food */}
        <div style={styles.field}>
          <label style={styles.label}>Detected Food</label>
          <input
            type="text"
            value={detectedFood}
            onChange={(e) => setDetectedFood(e.target.value)}
            style={styles.input}
            placeholder="e.g. pizza, rice, chicken"
          />
        </div>

        {/* Auto-calculated values */}
        <div style={styles.metricsBox}>
          <div style={styles.metricCard}>
            <strong>BMR</strong>
            <p>{bmr ? `${bmr} kcal/day` : "--"}</p>
          </div>
          <div style={styles.metricCard}>
            <strong>TDEE</strong>
            <p>{tdee ? `${tdee} kcal/day` : "--"}</p>
          </div>
          <div style={styles.metricCard}>
            <strong>Food Calories</strong>
            <p>{detectedCalories ? `${detectedCalories} kcal` : "--"}</p>
          </div>
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
          <div style={styles.resultContainer}>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📊 Diet Summary</h3>
              <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                  <strong>Goal</strong>
                  <p>{plan.goal}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Detected Food</strong>
                  <p>{plan.detected_food}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Food Category</strong>
                  <p>{plan.food_category}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Diet Quality</strong>
                  <p>{plan.diet_quality}</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Target Calories</strong>
                  <p>{plan.target_calories} kcal</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Remaining Calories</strong>
                  <p>{plan.remaining_calories} kcal</p>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🍽️ Food Analysis</h3>
              <p style={styles.reasonText}>{plan.food_analysis}</p>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📈 Today's Nutrition</h3>
              <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                  <strong>Calories Today</strong>
                  <p>{plan.total_calories_today} kcal</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Protein</strong>
                  <p>{plan.total_protein_today} g</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Carbs</strong>
                  <p>{plan.total_carbs_today} g</p>
                </div>
                <div style={styles.summaryCard}>
                  <strong>Fats</strong>
                  <p>{plan.total_fats_today} g</p>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🧠 Smart Advice</h3>
              <p style={styles.reasonText}>{plan.smart_advice}</p>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🍱 Next Meal Suggestion</h3>
              <p style={styles.reasonText}>{plan.next_meal_suggestion}</p>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🥗 Daily Diet Plan</h3>
              <ul style={styles.list}>
                {plan.daily_diet_plan.map((item, idx) => (
                  <li key={idx} style={styles.listItem}>
                    ✅ {item}
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
    maxWidth: "950px",
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
  metricsBox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "20px",
  },
  metricCard: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "10px",
    padding: "14px",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "13px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "10px",
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
};

export default Diet;