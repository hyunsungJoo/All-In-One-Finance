import { useState, useEffect } from "react";

export default function ExchangeRates({ dark = true }) {
  const [rates, setRates] = useState({
    USD: null,
    EUR: null,
    JPY: null,
    CNY: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/KRW");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        const { USD, EUR, JPY, CNY } = data.rates;
        setRates({
          USD: USD ? (1 / USD).toLocaleString("ko-KR", { maximumFractionDigits: 2 }) : "N/A",
          EUR: EUR ? (1 / EUR).toLocaleString("ko-KR", { maximumFractionDigits: 2 }) : "N/A",
          JPY: JPY ? (1 / JPY).toLocaleString("ko-KR", { maximumFractionDigits: 4 }) : "N/A",
          CNY: CNY ? (1 / CNY).toLocaleString("ko-KR", { maximumFractionDigits: 2 }) : "N/A",
        });
      } catch (e) {
        setError("환율을 불러올 수 없습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const currencies = [
    { code: "USD", name: "미국 달러", symbol: "$" },
    { code: "EUR", name: "유로", symbol: "€" },
    { code: "JPY", name: "일본 엔", symbol: "¥" },
    { code: "CNY", name: "중국 위안", symbol: "¥" },
  ];

  if (loading && !Object.values(rates).some((v) => v)) {
    return null;
  }

  return (
    <div style={dark ? styles.container.dark : styles.container.light}>
      <div style={styles.title}>💱 환율 (KRW 기준)</div>
      <div style={styles.grid}>
        {currencies.map((curr) => (
          <div key={curr.code} style={dark ? styles.card.dark : styles.card.light}>
            <div style={styles.currencyCode}>{curr.code}</div>
            <div style={styles.currencyName}>{curr.name}</div>
            <div style={dark ? styles.rateValue.dark : styles.rateValue.light}>
              {rates[curr.code] || "로딩 중..."}
            </div>
          </div>
        ))}
      </div>
      {error && <div style={dark ? styles.error.dark : styles.error.light}>{error}</div>}
    </div>
  );
}

const styles = {
  container: {
    light: {
      padding: "24px 0",
      margin: "28px 0",
    },
    dark: {
      padding: "24px 0",
      margin: "28px 0",
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
    maxWidth: 700,
    margin: "0 auto",
  },
  card: {
    light: {
      padding: 16,
      borderRadius: 10,
      background: "#f8fafc",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      textAlign: "center",
    },
    dark: {
      padding: 16,
      borderRadius: 10,
      background: "rgba(226, 232, 240, 0.05)",
      border: "1px solid rgba(226, 232, 240, 0.1)",
      textAlign: "center",
    },
  },
  currencyCode: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 4,
  },
  currencyName: {
    fontSize: 12,
    marginBottom: 8,
    opacity: 0.7,
  },
  rateValue: {
    light: {
      fontSize: 16,
      fontWeight: 600,
      color: "#0f172a",
    },
    dark: {
      fontSize: 16,
      fontWeight: 600,
      color: "#60a5fa",
    },
  },
  error: {
    light: {
      marginTop: 12,
      padding: 10,
      borderRadius: 6,
      background: "rgba(239, 68, 68, 0.1)",
      color: "#dc2626",
      fontSize: 12,
      textAlign: "center",
    },
    dark: {
      marginTop: 12,
      padding: 10,
      borderRadius: 6,
      background: "rgba(239, 68, 68, 0.1)",
      color: "#fca5a5",
      fontSize: 12,
      textAlign: "center",
    },
  },
};
