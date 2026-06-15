import { useState } from 'react';
import './proyectos.css';
import CrearProyecto from './crearProyecto';
import Interfaz from '../interfaz/interfaz';

const Proyectos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('browse');

  const projectList = [
    {
      title: 'El Último Horizonte',
      subtitle: 'Largometraje · Drama · Dir. Ana Martínez',
    },
    {
      title: 'Código Rojo',
      subtitle: 'Serie · Thriller · Dir. Carlos Vélez',
    },
    {
      title: 'Memorias del Sur',
      subtitle: 'Documental · Histórico · Dir. Luisa Peralta',
    },
    {
      title: 'Sombras Blancas',
      subtitle: 'Cortometraje · Terror · Dir. Marcos Díaz',
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="proyectos-page">
      {selectedProject ? (
        <Interfaz project={selectedProject} onBack={() => setSelectedProject(null)} />
      ) : (
        <>
          <div className="proyectos-header">
            <img className="proyectos-logo" src="/raccord-logo.jpeg" alt="Raccord" />

            <div className="proyectos-intro">
              <div className="proyectos-intro-icon" aria-hidden="true">
                <span />
              </div>
              <h1>Gestión de Proyectos</h1>
              <p>Accede a un proyecto existente o inicia uno nuevo en el sistema.</p>
            </div>
          </div>

          <div className="proyectos-grid">
            <button
              type="button"
              className={`proyecto-card ${selectedSection === 'browse' ? 'proyecto-card--selected' : ''}`}
              onClick={() => setSelectedSection('browse')}
            >
              <div className="card-icon card-icon--folder" />
              <div className="card-content">
                <strong>Escoger Proyecto</strong>
                <span>Acceder a un proyecto existente</span>
              </div>
            </button>

            <button
              type="button"
              className={`proyecto-card proyecto-card--action ${selectedSection === 'create' ? 'proyecto-card--selected' : ''}`}
              onClick={() => {
                setSelectedSection('create');
                setIsModalOpen(true);
              }}
            >
              <div className="card-icon card-icon--plus" />
              <div className="card-content">
                <strong>Crear Proyecto</strong>
                <span>Registrar un nuevo proyecto</span>
              </div>
            </button>
          </div>

          {selectedSection === 'browse' && (
            <section className="proyectos-list">
              <div className="proyectos-list-header">
                <div className="proyectos-list-meta">
                  <div className="proyectos-list-icon" aria-hidden="true">
                    <span />
                  </div>
                  <div>
                    <strong>Proyectos disponibles</strong>
                    <p>{projectList.length} proyectos</p>
                  </div>
                </div>
              </div>

              <div className="proyectos-list-grid">
                {projectList.map((project) => (
                  <button
                    key={project.title}
                    type="button"
                    className="proyecto-row"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="proyecto-row-icon" aria-hidden="true">
                      <span />
                    </div>
                    <div className="proyecto-row-content">
                      <strong>{project.title}</strong>
                      <span>{project.subtitle}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {isModalOpen && <CrearProyecto onClose={() => setIsModalOpen(false)} />}
        </>
      )}
    </div>
  );
};

export default Proyectos;
