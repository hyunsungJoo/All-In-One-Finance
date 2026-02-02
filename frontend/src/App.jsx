import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedEmail = localStorage.getItem("user_email");
    if (savedToken && savedEmail) {
      setIsAuthenticated(true);
      setToken(savedToken);
      setUserEmail(savedEmail);
    }
  }, []);

  const handleSwitchToLogin = () => {
    setCurrentPage("login");
  };

  const handleSwitchToSignup = () => {
    setCurrentPage("signup");
  };

  const handleLoginSuccess = (authToken, email) => {
    setToken(authToken);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_email");
    setIsAuthenticated(false);
    setToken("");
    setUserEmail("");
    setCurrentPage("login");
  };

  if (isAuthenticated) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={styles.title}>로그인 성공</h1>
            <p style={styles.subTitle}>All-In-One-Finance에 접속했습니다.</p>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoLabel}>현재 로그인 계정:</p>
            <p style={styles.infoValue}>{userEmail}</p>
            <p style={styles.infoLabel} style={{ marginTop: 16 }}>
              토큰 (Token):
            </p>
            <code style={styles.tokenBox}>{token.substring(0, 50)}...</code>
          </div>

          <button
            onClick={handleLogout}
            style={styles.primaryBtn}
          >
            로그아웃
          </button>

          <p style={styles.footer}>
            테스트 완료 후 로그아웃 버튼을 눌러주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentPage === "login" ? (
        <Login
          onSwitchToSignup={handleSwitchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <Signup onSwitchToLogin={handleSwitchToLogin} />
      )}
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(90, 130, 255, 0.25), transparent 55%)," +
      "radial-gradient(900px 500px at 90% 20%, rgba(130, 255, 210, 0.18), transparent 60%)," +
      "#0b1020",
    color: "#e9ecf1",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR", sans-serif',
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 18,
    padding: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
  },
  title: { margin: 0, fontSize: 26, letterSpacing: -0.5 },
  subTitle: { margin: "8px 0 0", opacity: 0.8, fontSize: 13 },
  infoBox: {
    padding: 14,
    borderRadius: 12,
    background: "rgba(90, 130, 255, 0.15)",
    border: "1px solid rgba(90, 130, 255, 0.3)",
    marginBottom: 20,
  },
  infoLabel: {
    margin: 0,
    fontSize: 12,
    opacity: 0.7,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    margin: "6px 0 0",
    fontSize: 14,
    fontWeight: 600,
    color: "#a8c0ff",
    wordBreak: "break-all",
  },
  tokenBox: {
    display: "block",
    padding: "10px 12px",
    borderRadius: 8,
    background: "rgba(10, 14, 30, 0.8)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#90ff99",
    fontSize: 11,
    fontFamily: "'Monaco', 'Courier New', monospace",
    overflow: "auto",
    marginTop: 6,
  },
  primaryBtn: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(135deg, rgba(90,130,255,0.95), rgba(130,255,210,0.85))",
    color: "#0b1020",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 14,
  },
  footer: { margin: "6px 0 0", fontSize: 13, opacity: 0.9, textAlign: "center" },
};
