import './adminDashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const metrics = [
    { label: 'Usuarios registrados', value: '128' },
    { label: 'Proyectos activos', value: '21' },
    { label: 'Solicitudes pendientes', value: '7' },
    { label: 'Alertas nuevas', value: '3' },
  ];

  const recentActivities = [
    { title: 'Aprobación de presupuesto', subtitle: 'Proyecto Código Rojo', status: 'Aprobado' },
    { title: 'Nuevo usuario invitado', subtitle: 'Usuario: maria@demo.com', status: 'Pendiente' },
    { title: 'Actualización de permisos', subtitle: 'Proyecto Memorias del Sur', status: 'Revisión' },
  ];

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-badge">Panel Administrativo</p>
          <h1>Bienvenido, {user?.name || 'Administrador'}</h1>
          <p>Controla usuarios, proyectos y métricas clave sin necesidad de autorización por ahora.</p>
        </div>

        <div className="dashboard-actions">
          <button className="logout-button" onClick={onLogout} type="button">
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-metrics">
        {metrics.map((metric) => (
          <article key={metric.label} className="dashboard-metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-content-grid">
        <div className="dashboard-panel dashboard-panel--summary">
          <h2>Resumen rápido</h2>
          <p>Accede a las funciones administrativas y revisa el estado general del sistema.</p>
          <div className="dashboard-summary-list">
            <div>
              <strong>Usuarios en espera</strong>
              <p>15 nuevas solicitudes de acceso.</p>
            </div>
            <div>
              <strong>Proyectos destacados</strong>
              <p>5 proyectos listos para revisión.</p>
            </div>
            <div>
              <strong>Notificaciones</strong>
              <p>3 alertas urgentes.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-panel dashboard-panel--activities">
          <div className="panel-header">
            <h2>Actividad reciente</h2>
            <button type="button">Ver todo</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.title} className="activity-item">
                <div>
                  <strong>{activity.title}</strong>
                  <p>{activity.subtitle}</p>
                </div>
                <span className={`activity-status activity-status--${activity.status.toLowerCase()}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
