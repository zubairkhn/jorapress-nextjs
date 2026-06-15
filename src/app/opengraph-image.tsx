import { ImageResponse } from "next/og";

export const alt =
  "JoraPress — Let your AI agent build & heal your WordPress site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1200px 600px at 80% -10%, #0e2a33 0%, #050708 55%)",
          color: "#e6f0f2",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #67e8f9, #22d3ee 50%, #a3e635)",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            JoraPress
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Let your AI agent build &amp; heal your WordPress site.
          </div>
          <div style={{ fontSize: 30, color: "#8aa0a6", maxWidth: 920 }}>
            A secure MCP execution bridge + WordPress Doctor. Build in any
            builder, then diagnose &amp; fix bugs, performance and SEO.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#a3e635" }}>
          <span>Free forever</span>
          <span style={{ color: "#3a4a4e" }}>·</span>
          <span style={{ color: "#22d3ee" }}>MCP + built-in chat agent</span>
          <span style={{ color: "#3a4a4e" }}>·</span>
          <span style={{ color: "#8aa0a6" }}>WordPress 6.5+ · PHP 8.1+</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
