import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg.jpeg";
import logo from "../../assets/logo1.png";
import isologo from "../../assets/isologo.png";
const navLinks = ["Características", "Beneficios", "Testimonios"];

export default function RaccordLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ← agregado

  const goToLogin = () => navigate("/login"); // ← función de navegación

  return (
    <div style={styles.root}>
      {/* ── NAVBAR ── */}
      <nav style={styles.nav}>
        <img src={logo} alt="Raccord logo" style={styles.logo} />

        {/* Desktop links */}
        <ul style={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link}>
              <a href="#" style={styles.navLink}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* ← cambiado de <a href="#"> a <button onClick> */}
        <button onClick={goToLogin} style={styles.ctaOutline}>
          Comenzar Gratis
        </button>

        {/* Mobile hamburger */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          ☰
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a key={link} href="#" style={styles.mobileLink}>
              {link}
            </a>
          ))}
          {/* ← cambiado de <a href="#"> a <button onClick> */}
          <button
            onClick={goToLogin}
            style={{ ...styles.ctaFilled, alignSelf: "flex-start" }}
          >
            Comenzar Gratis →
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ ...styles.hero, backgroundImage: `url(${bgImage})` }}>
        {/* Gradient overlay */}
        <div style={styles.overlay} />

        <div style={styles.heroContent}>
          <p style={styles.eyebrow}>PLATAFORMA DE CONTINUIDAD CINEMATOGRÁFICA</p>

          {/* Logotipo tipográfico */}
          <h1 style={styles.heroTitle}>
            Ra
            <span>
            <img src={isologo} alt="Raccord logo" style={{ height: 70 }} />
            </span>
            ord
          </h1>

          <p style={styles.heroSubtitle}>
            La plataforma profesional donde los productores montan,
            <br />
            gestionan y mantienen la continuidad de cada proyecto
            <br />
            cinematográfico.
          </p>

          <div style={styles.btnRow}>
            <button onClick={goToLogin} style={styles.ctaFilled}>
              Comenzar Gratis →
            </button>
          </div>
        </div>

        {/* Estrella decorativa */}
        <span style={styles.star}>✦</span>
      </section>
    </div>
  );
}

/* ─────────────── STYLES ─────────────── */
const styles = {
  root: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    margin: 0,
    padding: 0,
    background: "#0a0a12",
    color: "#fff",
    overflowX: "hidden",
  },

  /* NAV */
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 40px",
    background: "rgba(10,10,18,0.55)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  logo: {
    height: 38,
    objectFit: "contain",
  },
  navLinks: {
    display: "flex",
    gap: 36,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: 15,
    letterSpacing: "0.01em",
    transition: "color 0.2s",
  },
  ctaOutline: {
    padding: "9px 22px",
    borderRadius: 50,
    border: "1.5px solid #fff",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    background: "transparent",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: 24,
    cursor: "pointer",
  },
  mobileMenu: {
    position: "fixed",
    top: 66,
    left: 0,
    right: 0,
    zIndex: 99,
    background: "rgba(10,10,18,0.97)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "24px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  mobileLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: 16,
  },

  /* HERO */
  hero: {
    position: "relative",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(100deg, rgba(20,40,120,0.72) 0%, rgba(60,20,90,0.65) 50%, rgba(120,30,10,0.60) 100%)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: 780,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "0.22em",
    color: "rgba(255,255,255,0.55)",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: "clamp(52px, 9vw, 108px)",
    fontWeight: 300,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    margin: "0 0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    color: "#fff",
  },
  logoIcon: {
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
  },
  inlineSvg: {
    verticalAlign: "middle",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: "clamp(14px, 1.8vw, 17px)",
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.65,
    marginBottom: 40,
  },
  btnRow: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaFilled: {
    padding: "13px 28px",
    borderRadius: 50,
    background: "linear-gradient(90deg, #3B8BEB 0%, #6A4FCF 100%)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
    border: "none",
    display: "inline-block",
  },
  /* DECO */
  star: {
    position: "absolute",
    bottom: 44,
    right: 48,
    zIndex: 2,
    fontSize: 28,
    color: "rgba(255,255,255,0.25)",
    pointerEvents: "none",
  },
};
