import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { logout, token } = useAuth();
  const location = useLocation();

  if (!token) return null;

  const isActive = (path: string) =>
    location.pathname === path ? styles.activeLink : {};

  return (
    <nav style={styles.navbar}>
      {/* Logo / Title */}
      <div style={styles.logo}>
        🍽 <span style={{ marginLeft: 6 }}>AI Nutrition</span>
      </div>

      {/* Links */}
      <div style={styles.links}>
        <Link to="/dashboard" style={{ ...styles.link, ...isActive("/dashboard") }}>
          Dashboard
        </Link>
        <Link to="/upload" style={{ ...styles.link, ...isActive("/upload") }}>
          Upload Food
        </Link>
        <Link to="/diet" style={{ ...styles.link, ...isActive("/diet") }}>
          Diet
        </Link>
        <Link to="/exercise" style={{ ...styles.link, ...isActive("/exercise") }}>
          Exercise
        </Link>
      </div>

      {/* Logout */}
      <button onClick={logout} style={styles.logoutBtn}>
        Logout
      </button>
    </nav>
  );
};

/* ---------- styles ---------- */
const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "18px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#374151",
    fontSize: "14px",
    fontWeight: 500,
    paddingBottom: "4px",
  },
  activeLink: {
    color: "#2563eb",
    borderBottom: "2px solid #2563eb",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Navbar;
