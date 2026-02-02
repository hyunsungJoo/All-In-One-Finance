import { useState } from "react";

export default function Signup({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ marginBottom: 18 }}>
          <h1 style={styles.title}>회원가입</h1>
          <p style={styles.subTitle}>All-In-One-Finance 계정을 만드세요.</p>
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
                autoComplete="new-password"
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

          <label style={styles.label}>
            비밀번호 확인
            <div style={{ position: "relative" }}>
              <input
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="••••••••"
                type={showPwConfirm ? "text" : "password"}
                autoComplete="new-password"
                style={{ ...styles.input, paddingRight: 88 }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPwConfirm((v) => !v)}
                style={styles.pwBtn}
              >
                {showPwConfirm ? "숨김" : "보기"}
              </button>
            </div>
          </label>

          <button 
            type="submit" 
            style={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? "처리 중..." : "회원가입"}
          </button>

          <p style={styles.footer}>
            이미 계정이 있으신가요?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              style={styles.linkBtnInline}
              disabled={loading}
            >
              로그인
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
