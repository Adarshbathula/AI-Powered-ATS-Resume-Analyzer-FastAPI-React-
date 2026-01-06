import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail"); // ✅ CLEAR EMAIL
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#667eea",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      <h3 style={{ margin: 0 }}>Resume Analyzer</h3>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </>
        ) : (
          <>
            <span style={{ fontSize: "14px" }}>
              👤 {userEmail}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;