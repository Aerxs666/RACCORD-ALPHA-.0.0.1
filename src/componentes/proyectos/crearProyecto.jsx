import { useState } from 'react';
import './crearProyecto.css';

const CrearProyecto = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    format: '',
    genre: '',
    synopsis: '',
    director: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Crear proyecto:', formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-pretitle">Nuevo registro</span>
            <h2>Crear Proyecto</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="name">Nombre del Proyecto</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre de la serie, película u otro proyecto audiovisual"
            />
          </div>

          <div className="modal-row">
            <div className="modal-field modal-field--half">
              <label htmlFor="format">Formato</label>
              <select id="format" name="format" value={formData.format} onChange={handleChange}>
                <option value="">Selecciona formato</option>
                <option value="serie">Serie</option>
                <option value="pelicula">Película</option>
                <option value="documental">Documental</option>
              </select>
            </div>
            <div className="modal-field modal-field--half">
              <label htmlFor="genre">Género</label>
              <select id="genre" name="genre" value={formData.genre} onChange={handleChange}>
                <option value="">Selecciona género</option>
                <option value="drama">Drama</option>
                <option value="comedia">Comedia</option>
                <option value="accion">Acción</option>
                <option value="fantasia">Fantasía</option>
              </select>
            </div>
          </div>

          <div className="modal-field">
            <label htmlFor="synopsis">Sinopsis</label>
            <textarea
              id="synopsis"
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              placeholder="Detalle de lo que trata el producto audiovisual"
              rows="4"
            />
          </div>

          <div className="modal-field">
            <label htmlFor="director">Director</label>
            <input
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              placeholder="Director o directores del producto audiovisual"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-button modal-button--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-button modal-button--primary">
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProyecto;
