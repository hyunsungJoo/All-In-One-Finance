import { useState } from "react";

export default function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ marginBottom: 18 }}>
          <h1 style={styles.title}>로그인</h1>
          <p style={styles.subTitle}>All-In-One-Finance에 오신 것을 환영합니다.</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={styles.label}>
            이메일
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              style={styles.input}
              disabled={loading}
            />
          </label>

          <label style={styles.label}>
            비밀번호
            <div style={{ position: "relative" }}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                style={{ ...styles.input, paddingRight: 88 }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={styles.pwBtn}
              >
                {showPw ? "숨김" : "보기"}
              </button>
            </div>
          </label>

          <div style={styles.row}>
            <label style={styles.checkbox}>
              <input type="checkbox" />
              <span style={{ marginLeft: 8 }}>로그인 상태 유지</span>
            </label>

            <button
              type="button"
              onClick={() => alert("비밀번호 찾기는 준비 중입니다.")}
              style={styles.linkBtn}
              disabled={loading}
            >
              비밀번호 찾기
            </button>
          </div>

          <button 
            type="submit" 
            style={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? "처리 중..." : "로그인"}
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerText}>또는</span>
          </div>

          <button
            type="button"
            onClick={() => alert("소셜 로그인은 준비 중입니다.")}
            style={styles.secondaryBtn}
            disabled={loading}
          >
            Google로 계속하기
          </button>

          <p style={styles.footer}>
            계정이 없으신가요?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              style={styles.linkBtnInline}
              disabled={loading}
            >
              회원가입
            </button>
          </p>
        </form>
      </div>
    </div>
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
  label: { display: "grid", gap: 6, fontSize: 13, opacity: 0.95 },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(10, 14, 30, 0.55)",
    color: "#e9ecf1",
    outline: "none",
    fontSize: 14,
  },
  pwBtn: {
    position: "absolute",
    right: 8,
    top: 8,
    height: 34,
    padding: "0 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "#e9ecf1",
    cursor: "pointer",
    fontSize: 12,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  checkbox: { display: "flex", alignItems: "center", fontSize: 13, opacity: 0.9 },
  linkBtn: {
    background: "transparent",
    border: "none",
    color: "#a8c0ff",
    cursor: "pointer",
    fontSize: 13,
    padding: 0,
  },
  primaryBtn: {
    marginTop: 6,
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(135deg, rgba(90,130,255,0.95), rgba(130,255,210,0.85))",
    color: "#0b1020",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 14,
  },
  secondaryBtn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#e9ecf1",
    cursor: "pointer",
    fontSize: 14,
  },
  divider: { position: "relative", textAlign: "center", margin: "10px 0 2px" },
  dividerText: {
    display: "inline-block",
    padding: "0 10px",
    fontSize: 12,
    opacity: 0.7,
    background: "rgba(11, 16, 32, 0.65)",
    borderRadius: 999,
  },
  footer: { margin: "6px 0 0", fontSize: 13, opacity: 0.9, textAlign: "center" },
  linkBtnInline: {
    background: "transparent",
    border: "none",
    color: "#a8c0ff",
    cursor: "pointer",
    fontSize: 13,
    padding: 0,
    fontWeight: 700,
  },
  error: {
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(255, 80, 80, 0.15)",
    border: "1px solid rgba(255, 80, 80, 0.3)",
    color: "#ff9999",
    fontSize: 12,
    marginBottom: 12,
  },
  success: {
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(100, 255, 150, 0.15)",
    border: "1px solid rgba(100, 255, 150, 0.3)",
    color: "#90ff99",
    fontSize: 12,
    marginBottom: 12,
  },
};
