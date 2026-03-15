import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadFood from "./pages/UploadFood";
import Diet from "./pages/Diet";
import Exercise from "./pages/Exercise";

function App() {
  return (
    <>
      <Navbar />

      {/*MAIN CONTENTWRAPPER */}
      <div style={styles.container}>
        <Routes>
          {/* Public*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadFood />
              </ProtectedRoute>
            }
          />

          <Route
            path="/diet"
            element={
              <ProtectedRoute>
                <Diet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/exercise"
            element={
              <ProtectedRoute>
                <Exercise />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" />} />{/*if user visits localhost5173 the n goes to dashboard*/}
          <Route path="*" element={<Navigate to="/dashboard" />} />{/*if user types random url then also gets redirected to dahboard */}
        </Routes>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1400px",  
    margin: "0 auto",
    padding: "24px",
  },
};


export default App;
