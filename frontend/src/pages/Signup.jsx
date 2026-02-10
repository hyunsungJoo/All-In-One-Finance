import { useState } from "react";
import { useEffect } from "react";

export default function Signup({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
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

    if (!email || !password || !passwordConfirm) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.ok) {
        setSuccess("회원가입 성공! 로그인 페이지로 이동합니다.");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setTimeout(() => {
          onSwitchToLogin();
        }, 1500);
      } else {
        setError(data.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 연결 오류: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>회원가입</h1>
          <p style={styles.subtitle}>새로운 계정을 만드세요</p>
        </div>

        {error && <div style={styles.alert}>{error}</div>}
        {success && <div style={{ ...styles.alert, ...styles.successAlert }}>{success}</div>}

        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>이메일</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              type="email"
              autoComplete="email"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>비밀번호</label>
            <div style={styles.passwordWrapper}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                style={styles.input}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={styles.toggleBtn}
              >
                {showPw ? "숨기기" : "보기"}
              </button>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>비밀번호 확인</label>
            <div style={styles.passwordWrapper}>
              <input
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="••••••••"
                type={showPwConfirm ? "text" : "password"}
                autoComplete="new-password"
                style={styles.input}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPwConfirm((v) => !v)}
                style={styles.toggleBtn}
              >
                {showPwConfirm ? "숨기기" : "보기"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.submitBtn}
            disabled={loading}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p style={styles.footer}>
          이미 계정이 있나요?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            style={styles.link}
            disabled={loading}
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    background: "linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)",
    color: "#e2e8f0",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(30, 41, 59, 0.8)",
    border: "1px solid rgba(226, 232, 240, 0.1)",
    borderRadius: 12,
    padding: 32,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  },
  header: {
    marginBottom: 28,
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: "#f1f5f9",
  },
  subtitle: {
    margin: "8px 0 0",
    fontSize: 14,
    color: "#94a3b8",
  },
  form: {
    display: "grid",
    gap: 16,
  },
  formGroup: {
    display: "grid",
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: "#e2e8f0",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(226, 232, 240, 0.2)",
    background: "rgba(226, 232, 240, 0.05)",
    color: "#f1f5f9",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  },
  passwordWrapper: {
    position: "relative",
  },
  toggleBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: "4px 8px",
    background: "transparent",
    border: "none",
    color: "#64748b",
    fontSize: 12,
    cursor: "pointer",
    transition: "color 0.2s",
  },
  submitBtn: {
    padding: "11px 16px",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "opacity 0.2s",
    marginTop: 8,
  },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 16,
  },
  link: {
    background: "none",
    border: "none",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: 13,
    padding: 0,
    fontWeight: 500,
  },
  alert: {
    padding: "12px 14px",
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#fca5a5",
  },
  successAlert: {
    background: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    color: "#86efac",
  },
};
