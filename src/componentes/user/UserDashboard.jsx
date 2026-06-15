import './userDashboard.css';

const UserDashboard = ({ user, onLogout }) => {
  const quickActions = [
    { label: 'Ver proyectos', description: 'Accede a los proyectos asignados.' },
    { label: 'Nuevo proyecto', description: 'Crea una idea nueva rápidamente.' },
    { label: 'Mi perfil', description: 'Actualiza tus datos personales.' },
    { label: 'Notificaciones', description: 'Revisa lo último del equipo.' },
  ];

  const assignedProjects = [
    { title: 'Memorias del Sur', status: 'En revisión' },
    { title: 'Sombras Blancas', status: 'Planeado' },
    { title: 'El Último Horizonte', status: 'En rodaje' },
  ];

  return (
    <div className="user-dashboard-shell">
      <header className="user-dashboard-header">
        <div>
          <p className="dashboard-badge">Panel de Usuario</p>
          <h1>Hola, {user?.name || 'Usuario'}</h1>
          <p>Administra tu trabajo, sigue proyectos y consulta actividades recientes.</p>
        </div>
        <button className="logout-button" onClick={onLogout} type="button">
          Cerrar sesión
        </button>
      </header>

      <section className="user-dashboard-actions">
        {quickActions.map((action) => (
          <article key={action.label} className="user-action-card">
            <strong>{action.label}</strong>
            <p>{action.description}</p>
          </article>
        ))}
      </section>

      <section className="user-dashboard-projects">
        <div className="project-list-header">
          <h2>Proyectos asignados</h2>
          <p>Monitorea el progreso y el estado de tus tareas.</p>
        </div>
        <div className="project-list-grid">
          {assignedProjects.map((project) => (
            <div key={project.title} className="project-card">
              <div>
                <strong>{project.title}</strong>
                <p>{project.status}</p>
              </div>
              <button type="button">Ver</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
