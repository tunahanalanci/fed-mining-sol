import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "FED Mining Solutions & Parts – Drifter Spare Parts Supplier Turkey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0b0f19 0%, #0d1424 60%, #0f1929 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,192,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,192,61,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255,192,61,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255,192,61,0.1)",
            border: "1px solid rgba(255,192,61,0.3)",
            borderRadius: 99,
            padding: "6px 18px",
            marginBottom: 28,
            width: "fit-content",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ffc03d",
              letterSpacing: "0.12em",
            }}
          >
            🇹🇷 TURKEY — WORLDWIDE SHIPPING
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 20,
            background: "linear-gradient(135deg, #ffffff 0%, rgba(255,192,61,0.9) 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          FED Mining
          <br />
          Solutions &amp; Parts
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#9ca3af",
            marginBottom: 40,
          }}
        >
          OEM-Compatible Drifter Spare Parts for Sandvik &amp; Epiroc
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { value: "186+", label: "Parts in Catalog", color: "#ffc03d" },
            { value: "400h", label: "Overhaul Warranty", color: "#10b981" },
            { value: "3", label: "Countries", color: "#60a5fa" },
          ].map((stat) => (
            <div
              key={stat.value}
              style={{
                background: "#151b26",
                border: "1px solid #243048",
                borderRadius: 8,
                padding: "12px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: stat.color,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Brand badges - bottom right */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            background: "#151b26",
            border: "1px solid #243048",
            borderRadius: 16,
            padding: "28px 32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 6,
              padding: "6px 14px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
            <span
              style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}
            >
              SANDVIK
            </span>
          </div>
          <span style={{ fontSize: 13, color: "#f3f4f6", fontWeight: 600 }}>
            HL500 · HL700 · HL1000
          </span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            HLX5 · RD525 · RD314
          </span>

          <div style={{ height: 1, background: "#243048", margin: "8px 0" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 6,
              padding: "6px 14px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />
            <span
              style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b" }}
            >
              EPIROC / ATLAS COPCO
            </span>
          </div>
          <span style={{ fontSize: 13, color: "#f3f4f6", fontWeight: 600 }}>
            COP1838 · COP2560 · COP4050
          </span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            COP1638 · MD20 · COP3060
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
