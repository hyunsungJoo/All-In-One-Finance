import { useState } from "react";
import { useEffect } from "react";

export default function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.ok && data.token) {
        setSuccess("로그인 성공!");
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_email", email);
        
        setTimeout(() => {
          onLoginSuccess(data.token, email);
        }, 1000);
      } else {
        setError(data.message || "로그인에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 연결 오류: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={isDark ? styles.container.dark : styles.container.light}>
      <div style={isDark ? styles.card.dark : styles.card.light}>
        <div style={styles.header}>
          <h1 style={isDark ? styles.title.dark : styles.title.light}>로그인</h1>
          <p style={isDark ? styles.subtitle.dark : styles.subtitle.light}>계정에 접속하세요</p>
          <button
            onClick={() => setIsDark(!isDark)}
            style={isDark ? styles.themeBtn.dark : styles.themeBtn.light}
            title={isDark ? "라이트 모드" : "다크 모드"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {error && <div style={isDark ? styles.alert.dark : styles.alert.light}>{error}</div>}
        {success && <div style={isDark ? styles.alertSuccess.dark : styles.alertSuccess.light}>{success}</div>}

        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={isDark ? styles.label.dark : styles.label.light}>이메일</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              type="email"
              autoComplete="email"
              style={isDark ? styles.input.dark : styles.input.light}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={isDark ? styles.label.dark : styles.label.light}>비밀번호</label>
            <div style={styles.passwordWrapper}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                style={isDark ? styles.input.dark : styles.input.light}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={isDark ? styles.toggleBtn.dark : styles.toggleBtn.light}
              >
                {showPw ? "숨기기" : "보기"}
              </button>
            </div>
          </div>

          <div style={styles.options}>
            <label style={isDark ? styles.checkbox.dark : styles.checkbox.light}>
              <input type="checkbox" style={{ cursor: "pointer" }} />
              <span>로그인 상태 유지</span>
            </label>
            <button
              type="button"
              onClick={() => alert("비밀번호 찾기는 준비 중입니다.")}
              style={isDark ? styles.link.dark : styles.link.light}
              disabled={loading}
            >
              비밀번호 찾기
            </button>
          </div>

          <button 
            type="submit" 
            style={styles.submitBtn}
            disabled={loading}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <div style={isDark ? styles.divider.dark : styles.divider.light}>또는</div>

          <button
            type="button"
            onClick={() => alert("소셜 로그인은 준비 중입니다.")}
            style={isDark ? styles.socialBtn.dark : styles.socialBtn.light}
            disabled={loading}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            🔵 Google로 계속하기
          </button>
        </form>

        <p style={isDark ? styles.footer.dark : styles.footer.light}>
          계정이 없으신가요?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            style={isDark ? styles.link.dark : styles.link.light}
            disabled={loading}
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    light: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      background: "#ffffff",
      color: "#1e293b",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
    },
    dark: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      background: "linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)",
      color: "#e2e8f0",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
    },
  },
  card: {
    light: {
      width: "100%",
      maxWidth: 420,
      background: "#f8fafc",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      borderRadius: 12,
      padding: 32,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      backdropFilter: "blur(10px)",
    },
    dark: {
      width: "100%",
      maxWidth: 420,
      background: "rgba(30, 41, 59, 0.8)",
      border: "1px solid rgba(226, 232, 240, 0.1)",
      borderRadius: 12,
      padding: 32,
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
    },
  },
  header: {
    marginBottom: 28,
    textAlign: "center",
    position: "relative",
  },
  title: {
    light: { margin: 0, fontSize: 28, fontWeight: 700, color: "#0f172a" },
    dark: { margin: 0, fontSize: 28, fontWeight: 700, color: "#f1f5f9" },
  },
  subtitle: {
    light: { margin: "8px 0 0", fontSize: 14, color: "#64748b" },
    dark: { margin: "8px 0 0", fontSize: 14, color: "#94a3b8" },
  },
  themeBtn: {
    light: { position: "absolute", right: 0, top: 0, padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(0, 0, 0, 0.1)", background: "#e2e8f0", fontSize: 18, cursor: "pointer" },
    dark: { position: "absolute", right: 0, top: 0, padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(226, 232, 240, 0.15)", background: "rgba(226, 232, 240, 0.08)", fontSize: 18, cursor: "pointer" },
  },
  form: { display: "grid", gap: 16 },
  formGroup: { display: "grid", gap: 6 },
  label: {
    light: { fontSize: 13, fontWeight: 500, color: "#1e293b" },
    dark: { fontSize: 13, fontWeight: 500, color: "#e2e8f0" },
  },
  input: {
    light: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.1)", background: "#ffffff", color: "#1e293b", fontSize: 14, outline: "none" },
    dark: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(226, 232, 240, 0.2)", background: "rgba(226, 232, 240, 0.05)", color: "#f1f5f9", fontSize: 14, outline: "none" },
  },
  passwordWrapper: { position: "relative" },
  toggleBtn: {
    light: { position: "absolute", right: 10, top: 10, padding: "4px 8px", background: "transparent", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" },
    dark: { position: "absolute", right: 10, top: 10, padding: "4px 8px", background: "transparent", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" },
  },
  options: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 },
  checkbox: {
    light: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#1e293b" },
    dark: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#e2e8f0" },
  },
  link: {
    light: { background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: 13, padding: 0, fontWeight: 500 },
    dark: { background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: 13, padding: 0, fontWeight: 500 },
  },
  submitBtn: { padding: "11px 16px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #3b82f6, #60a5fa)", color: "#ffffff", fontWeight: 600, fontSize: 14, cursor: "pointer", marginTop: 8 },
  divider: {
    light: { textAlign: "center", fontSize: 12, color: "#94a3b8", margin: "8px 0" },
    dark: { textAlign: "center", fontSize: 12, color: "#64748b", margin: "8px 0" },
  },
  socialBtn: {
    light: { padding: "11px 16px", borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.1)", background: "#f1f5f9", color: "#1e293b", fontWeight: 500, fontSize: 14, cursor: "pointer" },
    dark: { padding: "11px 16px", borderRadius: 8, border: "1px solid rgba(226, 232, 240, 0.15)", background: "rgba(226, 232, 240, 0.08)", color: "#e2e8f0", fontWeight: 500, fontSize: 14, cursor: "pointer" },
  },
  footer: {
    light: { textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 16 },
    dark: { textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 16 },
  },
  alert: {
    light: { padding: "12px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13, background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#dc2626" },
    dark: { padding: "12px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13, background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#fca5a5" },
  },
  alertSuccess: {
    light: { padding: "12px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13, background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "#16a34a" },
    dark: { padding: "12px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13, background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "#86efac" },
  },
};
