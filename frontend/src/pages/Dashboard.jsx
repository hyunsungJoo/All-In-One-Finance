import { useNavigate } from "react-router-dom";

export default function Dashboard({ userEmail, token, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h2 style={styles.logo}>💰 All-In-One Finance</h2>
          <button
            onClick={handleLogout}
            style={styles.logoutBtn}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            로그아웃
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.content}>
          <div style={styles.greeting}>
            <h1 style={styles.title}>어서오세요!</h1>
            <p style={styles.subtitle}>
              {userEmail}님의 재무 대시보드입니다
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>계정 정보</h3>
            </div>

            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>이메일</label>
                <p style={styles.infoValue}>{userEmail}</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>인증 토큰</label>
                <div style={styles.tokenBox}>
                  <code style={styles.tokenText}>
                    {token.substring(0, 40)}...
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.features}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💳</div>
              <h4 style={styles.featureTitle}>계좌 추가</h4>
              <p style={styles.featureDesc}>금융 계좌를 등록하세요</p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📊</div>
              <h4 style={styles.featureTitle}>지출 분석</h4>
              <p style={styles.featureDesc}>월별 지출 현황을 확인하세요</p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💡</div>
              <h4 style={styles.featureTitle}>자산 목표</h4>
              <p style={styles.featureDesc}>재정 목표를 설정하세요</p>
            </div>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2026 All-In-One Finance. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)",
    color: "#e2e8f0",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
  },
  header: {
    padding: "16px 24px",
    borderBottom: "1px solid rgba(226, 232, 240, 0.08)",
    backdropFilter: "blur(10px)",
    background: "rgba(15, 23, 42, 0.8)",
  },
  headerContent: {
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    background: "linear-gradient(135deg, #60a5fa, #34d399)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoutBtn: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid rgba(226, 232, 240, 0.15)",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#fca5a5",
    fontWeight: 500,
    fontSize: 13,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  main: {
    flex: 1,
    padding: "32px 24px",
  },
  content: {
    maxWidth: 1000,
    margin: "0 auto",
    width: "100%",
  },
  greeting: {
    marginBottom: 32,
  },
  title: {
    margin: 0,
    fontSize: 36,
    fontWeight: 700,
    color: "#f1f5f9",
    marginBottom: 8,
  },
  subtitle: {
    margin: 0,
    fontSize: 16,
    color: "#94a3b8",
  },
  card: {
    padding: 24,
    borderRadius: 10,
    background: "rgba(30, 41, 59, 0.7)",
    border: "1px solid rgba(226, 232, 240, 0.1)",
    marginBottom: 24,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: "#f1f5f9",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
  },
  infoItem: {
    display: "grid",
    gap: 8,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
    color: "#e2e8f0",
    wordBreak: "break-all",
  },
  tokenBox: {
    padding: "10px 12px",
    borderRadius: 8,
    background: "rgba(15, 23, 42, 0.8)",
    border: "1px solid rgba(226, 232, 240, 0.1)",
    overflow: "auto",
  },
  tokenText: {
    color: "#86efac",
    fontSize: 12,
    fontFamily: "'Monaco', 'Courier New', 'monospace'",
    margin: 0,
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },
  featureCard: {
    padding: 20,
    borderRadius: 10,
    background: "rgba(30, 41, 59, 0.5)",
    border: "1px solid rgba(226, 232, 240, 0.08)",
    textAlign: "center",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    margin: "0 0 8px",
    fontSize: 14,
    fontWeight: 600,
    color: "#f1f5f9",
  },
  featureDesc: {
    margin: 0,
    fontSize: 12,
    color: "#94a3b8",
  },
  footer: {
    padding: "16px 24px",
    textAlign: "center",
    borderTop: "1px solid rgba(226, 232, 240, 0.08)",
    color: "#64748b",
    fontSize: 12,
  },
};
