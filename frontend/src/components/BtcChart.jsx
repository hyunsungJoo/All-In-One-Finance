import { useEffect, useRef } from "react";

export default function BtcChart({ dark = true, width = 800, height = 240 }) {
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const dataRef = useRef([]); // {t: ms, p: number}

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let rafId = null;

    function draw() {
      const data = dataRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // clear
      ctx.clearRect(0, 0, w, h);

      if (data.length === 0) {
        ctx.fillStyle = dark ? "#94a3b8" : "#475569";
        ctx.font = "14px sans-serif";
        ctx.fillText("Waiting for live BTC price...", 12, 24);
        return;
      }

      const prices = data.map((d) => d.p);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const pad = (max - min) * 0.1 || 1;
      const vmin = min - pad;
      const vmax = max + pad;

      // background
      ctx.fillStyle = dark ? "rgba(6,8,15,0.4)" : "#ffffff";
      ctx.fillRect(0, 0, w, h);

      // grid lines
      ctx.strokeStyle = dark ? "rgba(226,232,240,0.04)" : "rgba(15,23,42,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 4; i++) {
        const y = (h / 4) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // draw line
      ctx.beginPath();
      data.forEach((pt, i) => {
        const x = (i / (data.length - 1 || 1)) * w;
        const y = h - ((pt.p - vmin) / (vmax - vmin)) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = dark ? "#60a5fa" : "#0ea5a4";
      ctx.lineWidth = 2;
      ctx.stroke();

      // fill area
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, (dark ? "rgba(96,165,250,0.12)" : "rgba(14,165,164,0.08)"));
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // last price
      const last = data[data.length - 1];
      ctx.fillStyle = dark ? "#e2e8f0" : "#0f172a";
      ctx.font = "16px sans-serif";
      ctx.fillText(`BTC: ${last.p.toFixed(2)}`, 12, 20);

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    // WebSocket
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    wsRef.current = ws;

    ws.onmessage = (ev) => {
      try {
        const obj = JSON.parse(ev.data);
        const price = parseFloat(obj.p);
        const time = obj.T || Date.now();
        const arr = dataRef.current;
        arr.push({ t: time, p: price });
        if (arr.length > 120) arr.shift();
      } catch (e) {
        // ignore
      }
    };

    ws.onopen = () => {
      // console.log('ws open')
    };
    ws.onerror = () => {
      // ignore
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [dark]);

  return (
    <div style={{ width: "100%", maxWidth: width, margin: "0 auto" }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "100%",
          height,
          borderRadius: 10,
          boxShadow: dark ? "0 8px 30px rgba(2,6,23,0.6)" : "0 4px 14px rgba(2,6,23,0.06)",
        }}
      />
    </div>
  );
}
