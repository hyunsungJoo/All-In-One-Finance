import { useEffect, useRef } from "react";

export default function TradingViewWidget({ symbol = "BINANCE:BTCUSDT", dark = true, height = 500 }) {
  const containerRef = useRef(null);
  const idRef = useRef("tv_" + Math.random().toString(36).slice(2));

  useEffect(() => {
    const id = idRef.current;

    // load script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      try {
        if (window.TradingView) {
          new window.TradingView.widget({
            autosize: true,
            symbol,
            interval: "1",
            timezone: "Asia/Seoul",
            theme: dark ? "dark" : "light",
            style: "1",
            locale: "kr",
            toolbar_bg: dark ? "#0f172a" : "#ffffff",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: id,
          });
        }
      } catch (e) {
        // ignore widget errors
      }
    };

    document.body.appendChild(script);

    return () => {
      // cleanup: remove script and clear container
      if (containerRef.current) containerRef.current.innerHTML = "";
      try {
        document.body.removeChild(script);
      } catch (e) {}
    };
  }, [symbol, dark]);

  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
      <div id={idRef.current} ref={containerRef} style={{ height }} />
    </div>
  );
}
