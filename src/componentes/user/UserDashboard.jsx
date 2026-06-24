import { useState } from 'react';
import './userDashboard.css';
import UserProfile from './UserProfile';
import dashboard from '../../assets/dashboard.jpeg';

const UserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' o 'profile'

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

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  return (
    <div className="user-dashboard-shell" style={{ backgroundImage: `url(${dashboard})` }}>
      <header className="user-dashboard-header">
        <div>
          <p className="dashboard-badge">Panel de Usuario</p>
          <h1>Hola, {user?.nombre || user?.name || 'Usuario'}</h1>

        </div>
        <div className="header-actions">
          <button 
            className="profile-link-btn"
            onClick={handleProfileClick}
            title="Ver perfil"
          >
            Perfil
          </button>
          <button className="logout-button" onClick={onLogout} type="button">
            Cerrar sesión
          </button>
        </div>
      </header>

      {activeTab === 'dashboard' ? (
        <>
          <section className="user-dashboard-actions">
            {quickActions.map((action) => (
              <article 
                key={action.label} 
                className="user-action-card"
                onClick={action.label === 'Mi perfil' ? handleProfileClick : undefined}
                style={action.label === 'Mi perfil' ? { cursor: 'pointer' } : {}}
              >
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
        </>
      ) : (
        <div className="profile-view">
          <button 
            className="back-button"
            onClick={() => setActiveTab('dashboard')}
          >
            ← Volver al Dashboard
          </button>
          <UserProfile />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
