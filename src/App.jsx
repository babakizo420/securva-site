import { useState, useEffect, useRef } from "react";

const themes = {
  dark: { bg: "#030308", card: "#0A0A12", border: "#141428", accent: "#7B68EE", accentLight: "#A594FF", accentDim: "rgba(123,104,238,0.12)", text: "#F0EDF7", gray: "#7A778A", grain: 0.02, hex: 0.025 },
  light: { bg: "#F4F2FA", card: "#FFFFFF", border: "#E0DCF0", accent: "#6B55E0", accentLight: "#4A35B8", accentDim: "rgba(107,85,224,0.06)", text: "#1A1530", gray: "#6E6A80", grain: 0.01, hex: 0.04 },
};

function useTyper(p, s = 50, d = 25, w = 2500) { const [t, setT] = useState(""); const [i, setI] = useState(0); const [dl, setD] = useState(false); useEffect(() => { const c = p[i]; let tm; if (!dl && t === c) tm = setTimeout(() => setD(true), w); else if (dl && t === "") { setD(false); setI(x => (x + 1) % p.length); } else if (dl) tm = setTimeout(() => setT(x => x.slice(0, -1)), d); else tm = setTimeout(() => setT(c.slice(0, t.length + 1)), s); return () => clearTimeout(tm); }, [t, i, dl]); return t; }

function Toggle({ dark, flip, accent }) {
  return <button onClick={flip} style={{ position: "fixed", top: 20, right: 20, zIndex: 100, width: 42, height: 42, borderRadius: "50%", background: dark ? `${accent}12` : `${accent}08`, border: `1px solid ${accent}30`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
    {dark ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
  </button>;
}

export default function SecurvaPage() {
  const [vis, setVis] = useState(false);
  const [dark, setDark] = useState(true);
  const T = dark ? themes.dark : themes.light;
  const typed = useTyper(["Threat Detection.", "Real-Time Monitoring.", "Security Infrastructure.", "Attack Surface Mapping."]);
  useEffect(() => { setTimeout(() => setVis(true), 300); }, []);

  return (<>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');*{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(123,104,238,0.3)}@keyframes scanDown{0%{top:-5%}100%{top:105%}}@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}@keyframes breathe{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.2}50%{transform:translate(-50%,-50%) scale(1.1);opacity:.4}}@keyframes rotate{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes grain{0%,100%{transform:translate(0,0)}50%{transform:translate(5%,3%)}}`}</style>
    <Toggle dark={dark} flip={() => setDark(!dark)} accent={T.accent} />
    <div style={{ backgroundColor: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", padding: "48px 24px", overflow: "hidden", fontFamily: "'Space Grotesk', sans-serif", transition: "background-color 0.4s, color 0.4s" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, opacity: T.grain, background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, animation: "grain 4s steps(5) infinite" }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: T.hex, pointerEvents: "none", transition: "opacity 0.4s" }} viewBox="0 0 800 600">{Array.from({ length: 10 }, (_, r) => Array.from({ length: 14 }, (_, c) => { const x = c * 60 + (r % 2 ? 30 : 0), y = r * 55; return <polygon key={`${r}-${c}`} points={`${x},${y-12} ${x+10},${y-6} ${x+10},${y+6} ${x},${y+12} ${x-10},${y+6} ${x-10},${y-6}`} fill="none" stroke={T.accent} strokeWidth="0.4" />; }))}</svg>
      <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${T.accent}12, transparent)`, animation: "scanDown 4s linear infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${T.accentDim} 0%, transparent 60%)`, animation: "breathe 6s ease infinite" }} />
      <div style={{ position: "absolute", top: "45%", left: "50%", width: 280, height: 280, border: `1px solid ${T.accent}10`, borderRadius: "50%", borderTopColor: `${T.accent}30`, animation: "rotate 20s linear infinite" }} />

      <div style={{ maxWidth: 520, textAlign: "center", position: "relative", zIndex: 10 }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.2s", marginBottom: 28 }}>
          <svg width={48} height={56} viewBox="0 0 48 56" fill="none" style={{ display: "block", margin: "0 auto" }}><path d="M24 4L6 14V28C6 40 14 50 24 54C34 50 42 40 42 28V14L24 4Z" stroke={T.accent} strokeWidth="1.5" /><path d="M24 14L14 20V28C14 36 18 42 24 46C30 42 34 36 34 28V20L24 14Z" stroke={T.accent} strokeWidth="0.8" fill={T.accentDim} /><circle cx="24" cy="28" r="4" fill={T.accent} opacity="0.6"><animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" /></circle></svg>
        </div>
        <h1 style={{ fontSize: "clamp(36px, 8vw, 56px)", fontWeight: 700, color: T.text, letterSpacing: -1, lineHeight: 1, marginBottom: 8, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}>SECURVA</h1>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: T.accent, letterSpacing: 5, textTransform: "uppercase", fontWeight: 700, marginBottom: 32, opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>Cybersecurity SaaS</p>
        <div style={{ width: vis ? 50 : 0, height: 2, background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)`, margin: "0 auto 32px", transition: "width 0.8s ease 0.6s" }} />
        <div style={{ height: 26, marginBottom: 28, opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.7s" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(13px, 2.5vw, 17px)", color: T.accentLight }}>{typed}</span>
          <span style={{ display: "inline-block", width: 2, height: 18, backgroundColor: T.accent, marginLeft: 3, animation: "cursorBlink 1s infinite" }} />
        </div>
        <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: T.gray, lineHeight: 1.8, maxWidth: 420, margin: "0 auto 40px", opacity: vis ? 1 : 0, transition: "all 0.8s ease 0.8s" }}>Threat detection and security infrastructure for the modern attack surface. Currently in development.</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", background: T.card, border: `1px solid ${T.accent}25`, borderRadius: 10, opacity: vis ? 1 : 0, transition: "all 0.8s ease 1s" }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: T.accent, animation: "pulse 2s infinite" }} /><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Building</span></div>
        <div style={{ marginTop: 48, opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 1.1s" }}><p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: T.gray, letterSpacing: 3, marginBottom: 8 }}>A DIVISION OF</p><a href="https://blessedops.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 600, color: T.gray, textDecoration: "none", letterSpacing: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = T.accent} onMouseLeave={e => e.target.style.color = T.gray}>BLESSEDOPS GROUP</a></div>
      </div>
    </div>
  </>);
}
