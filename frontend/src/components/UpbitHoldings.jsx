import { useState, useEffect } from "react";

export default function UpbitHoldings() {
  const [accounts, setAccounts] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:3001/api/upbit/accounts");
        if (!res.ok) throw new Error("upbit proxy error");
        const data = await res.json();
        setAccounts(data);

        // get BTC KRW price
        const t = await fetch("https://api.upbit.com/v1/ticker?markets=KRW-BTC");
        const tj = await t.json();
        setBtcPrice(tj[0].trade_price);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const id = setInterval(fetchData, 30000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <div>업비트 잔고 로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  const krwAccount = accounts.find((a) => a.currency === "KRW");
  const krwBalance = krwAccount ? parseFloat(krwAccount.balance) : 0;
  const btcAccount = accounts.find((a) => a.currency === "BTC");
  const btcBalance = btcAccount ? parseFloat(btcAccount.balance) : 0;
  const btcValueKrw = btcBalance * (btcPrice || 0);
  const total = krwBalance + btcValueKrw;

  const format = (v) => v.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

  return (
    <div style={{ maxWidth: 700, margin: "16px auto", textAlign: "center" }}>
      <h3>내 보유 현황 (Upbit)</h3>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ padding: 12, borderRadius: 8, background: "rgba(0,0,0,0.04)", minWidth: 180 }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>원화 보유</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{format(krwBalance)} 원</div>
        </div>
        <div style={{ padding: 12, borderRadius: 8, background: "rgba(0,0,0,0.04)", minWidth: 180 }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>BTC 보유</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{btcBalance} BTC</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{format(btcValueKrw)} 원</div>
        </div>
        <div style={{ padding: 12, borderRadius: 8, background: "rgba(99,102,241,0.12)", minWidth: 220 }}>
          <div style={{ fontSize: 12, color: "#374151" }}>총 자산 (KRW)</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{format(total)} 원</div>
        </div>
      </div>
    </div>
  );
}
