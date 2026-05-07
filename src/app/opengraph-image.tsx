import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 20% 20%, rgba(217,70,239,0.35), transparent 24%), radial-gradient(circle at 85% 18%, rgba(34,211,238,0.28), transparent 22%), linear-gradient(135deg, #0b0716, #11172c)",
          color: "white",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "36px",
            padding: "36px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 68,
                height: 68,
                borderRadius: 22,
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              GI
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 22, opacity: 0.8 }}>GenIA</span>
              <span style={{ fontSize: 18, opacity: 0.55 }}>
                Formation pratique en intelligence artificielle
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 840 }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                borderRadius: 999,
                padding: "12px 18px",
                fontSize: 18,
                fontWeight: 700,
                background: "rgba(217,70,239,0.15)",
                border: "1px solid rgba(217,70,239,0.2)",
              }}
            >
              Nouvelle generation x IA
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: -2,
              }}
            >
              La generation qui maitrise l&apos;IA
            </div>
            <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, opacity: 0.78 }}>
              ChatGPT, Claude, Gemini, workflows, automatisation, creation et vrais projets.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {["ChatGPT", "Claude", "Gemini", "Perplexity", "Runway"].map((tool) => (
              <div
                key={tool}
                style={{
                  display: "flex",
                  borderRadius: 999,
                  padding: "12px 16px",
                  fontSize: 18,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
