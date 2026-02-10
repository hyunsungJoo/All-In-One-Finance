import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BtcChart from "../components/BtcChart";
import TradingViewWidget from "../components/TradingViewWidget";
import ExchangeRates from "../components/ExchangeRates";
import UpbitHoldings from "../components/UpbitHoldings";

export default function Home() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div style={isDark ? styles.container.dark : styles.container.light}>
      <header style={isDark ? styles.header.dark : styles.header.light}>
        <div style={styles.headerContent}>
          <h2 style={isDark ? styles.logo.dark : styles.logo.light}>💰 All-In-One Finance</h2>
          <button
            onClick={() => setIsDark(!isDark)}
            style={isDark ? styles.themeBtn.dark : styles.themeBtn.light}
            title={isDark ? "라이트 모드" : "다크 모드"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={isDark ? styles.title.dark : styles.title.light}>당신의 재무 전문가</h1>
          <p style={isDark ? styles.subtitle.dark : styles.subtitle.light}>
            모든 재정을 한곳에서 효율적으로 관리하세요
          </p>

          {/* Upbit holdings (requires local proxy server) */}
          <UpbitHoldings />

          <div style={styles.features}>
            <div style={isDark ? styles.feature.dark : styles.feature.light}>
              <div style={styles.featureIcon}>💼</div>
              <h3 style={isDark ? styles.featureTitle.dark : styles.featureTitle.light}>통합 관리</h3>
              <p style={isDark ? styles.featureDesc.dark : styles.featureDesc.light}>모든 금융 계좌를 하나로 통합</p>
            </div>
            <div style={isDark ? styles.feature.dark : styles.feature.light}>
              <div style={styles.featureIcon}>📈</div>
              <h3 style={isDark ? styles.featureTitle.dark : styles.featureTitle.light}>스마트 분석</h3>
              <p style={isDark ? styles.featureDesc.dark : styles.featureDesc.light}>실시간 재무 분석과 인사이트</p>
            </div>
            <div style={isDark ? styles.feature.dark : styles.feature.light}>
              <div style={styles.featureIcon}>🔐</div>
              <h3 style={isDark ? styles.featureTitle.dark : styles.featureTitle.light}>안전한 보안</h3>
              <p style={isDark ? styles.featureDesc.dark : styles.featureDesc.light}>최고 수준의 데이터 보호</p>
            </div>
          </div>

          {/* Exchange rates section */}
          <ExchangeRates dark={isDark} />

          {/* TradingView chart (Upbit-like) */}
          <div style={{ margin: "28px 0" }}>
            <TradingViewWidget symbol={"UPBIT:BTCKRW"} dark={isDark} height={420} />
          </div>

          <div style={styles.actions}>
            <button
              onClick={() => navigate("/login")}
              style={styles.primaryBtn}
              onMouseEnter={(e) => e.target.style.opacity = "0.9"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={isDark ? styles.secondaryBtn.dark : styles.secondaryBtn.light}
              onMouseEnter={(e) => e.target.style.opacity = "0.9"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              지금 가입하기
            </button>
          </div>
        </div>
      </main>

      <footer style={isDark ? styles.footer.dark : styles.footer.light}>
        <p>© 2026 All-In-One Finance. All rights reserved.</p>
      </footer>
    </div>
  );
}


const styles = {
  container: {
    light: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#ffffff",
      color: "#1e293b",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
    },
    dark: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)",
      color: "#e2e8f0",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
    },
  },
  header: {
    light: {
      padding: "20px 24px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
      backdropFilter: "blur(10px)",
      background: "rgba(255, 255, 255, 0.9)",
    },
    dark: {
      padding: "20px 24px",
      borderBottom: "1px solid rgba(226, 232, 240, 0.08)",
      backdropFilter: "blur(10px)",
      background: "rgba(15, 23, 42, 0.8)",
    },
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
    light: {
      margin: 0,
      fontSize: 20,
      fontWeight: 700,
      color: "#0f172a",
    },
    dark: {
      margin: 0,
      fontSize: 20,
      fontWeight: 700,
      background: "linear-gradient(135deg, #60a5fa, #34d399)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  themeBtn: {
    light: {
      padding: "8px 12px",
      borderRadius: 6,
      border: "1px solid rgba(0, 0, 0, 0.1)",
      background: "#f1f5f9",
      fontSize: 18,
      cursor: "pointer",
      transition: "all 0.2s",
    },
    dark: {
      padding: "8px 12px",
      borderRadius: 6,
      border: "1px solid rgba(226, 232, 240, 0.15)",
      background: "rgba(226, 232, 240, 0.08)",
      fontSize: 18,
      cursor: "pointer",
      transition: "all 0.2s",
    },
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
  },
  content: {
    maxWidth: 800,
    width: "100%",
    textAlign: "center",
  },
  title: {
    light: {
      margin: 0,
      fontSize: 48,
      fontWeight: 800,
      letterSpacing: -1,
      marginBottom: 12,
      color: "#0f172a",
      lineHeight: 1.2,
    },
    dark: {
      margin: 0,
      fontSize: 48,
      fontWeight: 800,
      letterSpacing: -1,
      marginBottom: 12,
      color: "#f1f5f9",
      lineHeight: 1.2,
    },
  },
  subtitle: {
    light: {
      margin: 0,
      fontSize: 18,
      color: "#64748b",
      marginBottom: 48,
      lineHeight: 1.5,
    },
    dark: {
      margin: 0,
      fontSize: 18,
      color: "#94a3b8",
      marginBottom: 48,
      lineHeight: 1.5,
    },
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20,
    marginBottom: 48,
  },
  feature: {
    light: {
      padding: 24,
      borderRadius: 12,
      background: "#f8fafc",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    dark: {
      padding: 24,
      borderRadius: 12,
      background: "rgba(226, 232, 240, 0.05)",
      border: "1px solid rgba(226, 232, 240, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  featureTitle: {
    light: {
      margin: "0 0 8px",
      fontSize: 16,
      fontWeight: 600,
      color: "#0f172a",
    },
    dark: {
      margin: "0 0 8px",
      fontSize: 16,
      fontWeight: 600,
      color: "#f1f5f9",
    },
  },
  featureDesc: {
    light: {
      margin: 0,
      fontSize: 14,
      color: "#64748b",
      lineHeight: 1.5,
    },
    dark: {
      margin: 0,
      fontSize: 14,
      color: "#94a3b8",
      lineHeight: 1.5,
    },
  },
  actions: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "14px 32px",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  secondaryBtn: {
    light: {
      padding: "14px 32px",
      borderRadius: 8,
      border: "2px solid rgba(0, 0, 0, 0.15)",
      background: "transparent",
      color: "#0f172a",
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer",
      transition: "opacity 0.3s ease",
    },
    dark: {
      padding: "14px 32px",
      borderRadius: 8,
      border: "2px solid rgba(226, 232, 240, 0.2)",
      background: "transparent",
      color: "#e2e8f0",
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer",
      transition: "opacity 0.3s ease",
    },
  },
  footer: {
    light: {
      padding: "20px 24px",
      textAlign: "center",
      borderTop: "1px solid rgba(0, 0, 0, 0.08)",
      color: "#64748b",
      fontSize: 13,
    },
    dark: {
      padding: "20px 24px",
      textAlign: "center",
      borderTop: "1px solid rgba(226, 232, 240, 0.08)",
      color: "#64748b",
      fontSize: 13,
    },
  },
};

