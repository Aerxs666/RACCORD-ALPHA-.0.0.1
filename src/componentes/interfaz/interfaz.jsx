import React from 'react';
import './interfaz.css';

const Interfaz = ({ project, onBack }) => {
  return (
    <div className="interfaz-page">
      <div className="interfaz-header">
        <div className="interfaz-title">
          <h2>{project?.title || 'Proyecto'}</h2>
          <button className="menu-button">☰ Menú</button>
        </div>
      </div>

      <div className="interfaz-grid">
        <div className="interfaz-cards">
          <div className="interfaz-card">
            <div className="card-circle card-circle--blue">📄</div>
            <strong>Guión</strong>
            <button className="card-link">Ver más</button>
          </div>

          <div className="interfaz-card">
            <div className="card-circle card-circle--purple">🗂️</div>
            <strong>Escenas</strong>
            <button className="card-link">Ver más</button>
          </div>

          <div className="interfaz-card">
            <div className="card-circle card-circle--orange">📋</div>
            <strong>Plan de Rodaje</strong>
            <button className="card-link">Ver más</button>
          </div>

          <div className="interfaz-card">
            <div className="card-circle card-circle--gray">🧾</div>
            <strong>Desglose</strong>
            <button className="card-link">Ver más</button>
          </div>
        </div>

        <div className="interfaz-panels">
          <div className="panel panel--news">
            <h3>Noticias y Comunicados</h3>
            <ul>
              <li>
                <strong>Cambio de locación Escena 7</strong>
                <p>La escena 7 se moverá de la cabaña A a la cabaña B por temas de iluminación.</p>
                <time>2026-05-18</time>
              </li>
              <li>
                <strong>Llamado general mañana 6:00 AM</strong>
                <p>Todo el equipo debe estar en locación a las 6:00 AM para iniciar grabación de escenas exteriores.</p>
                <time>2026-05-17</time>
              </li>
              <li>
                <strong>Revisión de vestuario</strong>
                <p>Vestuario solicita revisión de continuidad para personajes principales hoy a las 3:00 PM.</p>
                <time>2026-05-16</time>
              </li>
            </ul>
          </div>

          <div className="panel panel--lists">
            <div className="subpanel">
              <h4>Escenas en Proceso</h4>
              <div className="item">Escena #1 <span className="badge badge--orange">En proceso</span></div>
              <div className="item">Escena #4 <span className="badge badge--orange">En proceso</span></div>
            </div>

            <div className="subpanel">
              <h4>Escenas Pendientes</h4>
              <div className="item">Escena #3 <span className="badge badge--red">Pendiente</span></div>
              <div className="item">Escena #5 <span className="badge badge--red">Pendiente</span></div>
              <div className="item">Escena #6 <span className="badge badge--red">Pendiente</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="interfaz-footer">
        <button className="back-link" onClick={onBack}>← Volver</button>
      </div>
    </div>
  );
};

export default Interfaz;
