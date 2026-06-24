import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg.jpeg";
import logo from "../../assets/logo1.png";
import isologo from "../../assets/isologo.png";
import "./landing.css";


export default function RaccordLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");

  return (
    <div className="root">
      {/* ── NAVBAR ── */}
      <nav className="nav">
        <img src={logo} alt="Raccord logo" className="logo" />

      
        <button onClick={goToLogin} className="cta-outline">
          Comenzar Gratis
        </button>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          ☰
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link} href="#" className="mobile-link">
              {link}
            </a>
          ))}

          <button
            onClick={goToLogin}
            className="cta-filled"
            style={{ alignSelf: "flex-start" }}
          >
            Comenzar Gratis →
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-content">
          <p className="eyebrow">
            PLATAFORMA DE CONTINUIDAD CINEMATOGRÁFICA
          </p>

          {/* Logotipo */}
          <h1 className="hero-title">
            Ra
            <span>
              <img
                src={isologo}
                alt="Raccord Isologo"
                className="isologo"
              />
            </span>
            ord
          </h1>

          <p className="hero-subtitle">
            La plataforma profesional donde los productores montan,
            <br />
            gestionan y mantienen la continuidad de cada proyecto
            <br />
            cinematográfico.
          </p>

          <div className="btn-row">
            <button onClick={goToLogin} className="cta-filled">
              Comenzar Gratis →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
