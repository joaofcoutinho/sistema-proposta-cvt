import type { CSSProperties } from "react";

/** Estilos compartilhados dos e-mails (identidade visual Convertido). */

export const body: CSSProperties = {
  backgroundColor: "#0D0B1A",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  margin: 0,
  padding: "32px 0",
};

export const container: CSSProperties = {
  backgroundColor: "#16122A",
  border: "1px solid rgba(108,79,232,0.25)",
  borderRadius: "16px",
  margin: "0 auto",
  maxWidth: "480px",
  padding: "32px",
};

export const brand: CSSProperties = {
  color: "#9B7BF5",
  fontSize: "14px",
  fontWeight: 800,
  letterSpacing: "0.04em",
  margin: "0 0 24px",
};

export const brandRow: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "10px",
  margin: "0 0 24px",
};

export const brandLogo: CSSProperties = {
  display: "block",
  height: "32px",
  width: "32px",
  objectFit: "contain",
};

export const brandText: CSSProperties = {
  color: "#F0EEF8",
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: 0,
};

export const heading: CSSProperties = {
  color: "#F0EEF8",
  fontSize: "22px",
  fontWeight: 700,
  margin: "0 0 12px",
};

export const text: CSSProperties = {
  color: "rgba(240,238,248,0.75)",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 12px",
};

export const strong: CSSProperties = {
  color: "#F0EEF8",
};

export const button: CSSProperties = {
  backgroundColor: "#6C4FE8",
  borderRadius: "10px",
  color: "#F0EEF8",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 700,
  margin: "16px 0 8px",
  padding: "12px 28px",
  textDecoration: "none",
};

export const infoBox: CSSProperties = {
  backgroundColor: "#1E1935",
  border: "1px solid rgba(108,79,232,0.25)",
  borderRadius: "10px",
  margin: "16px 0",
  padding: "14px 16px",
};

export const footer: CSSProperties = {
  color: "rgba(240,238,248,0.4)",
  fontSize: "12px",
  margin: "24px 0 0",
};
