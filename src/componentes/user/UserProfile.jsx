import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../api/auth';
import './UserProfile.css';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    identificacion: '',
    id_identificacion: '',
    misisdn: '',
    direccion: '',
    fecha_de_nacimiento: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No hay sesión activa. Por favor inicia sesión.');
          return;
        }

        const response = await getProfile(token);
        
        if (response.success && response.user) {
          setProfile(response.user);
          setFormData({
            nombre: response.user.nombre || '',
            apellido: response.user.apellido || '',
            email: response.user.email || '',
            identificacion: response.user.identificacion || '',
            id_identificacion: response.user.id_identificacion || '',
            misisdn: response.user.misisdn || '',
            direccion: response.user.direccion || '',
            fecha_de_nacimiento: response.user.fecha_de_nacimiento || '',
          });
        } else {
          setError(response.message || 'Error al cargar el perfil');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No hay sesión activa. Por favor inicia sesión.');
        return;
      }

      const response = await updateProfile(formData, token);
      
      if (response.success && response.user) {
        setProfile(response.user);
        setFormData({
          nombre: response.user.nombre || '',
          apellido: response.user.apellido || '',
          email: response.user.email || '',
          identificacion: response.user.identificacion || '',
          id_identificacion: response.user.id_identificacion || '',
          misisdn: response.user.misisdn || '',
          direccion: response.user.direccion || '',
          fecha_de_nacimiento: response.user.fecha_de_nacimiento || '',
        });
        setSuccess(response.message || 'Perfil actualizado exitosamente');
        setIsEditing(false);
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al actualizar el perfil');
    }
  };

  const handleCancel = () => {
    // Restaurar los valores del perfil original
    if (profile) {
      setFormData({
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        email: profile.email || '',
        identificacion: profile.identificacion || '',
        id_identificacion: profile.id_identificacion || '',
        misisdn: profile.misisdn || '',
        direccion: profile.direccion || '',
        fecha_de_nacimiento: profile.fecha_de_nacimiento || '',
      });
    }
    setIsEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="user-profile-container">
        <div className="loading">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">
            {isEditing ? 'Editar Perfil' : 'Mi Perfil'}
          </h1>
          <div className="profile-actions">
            {!isEditing && (
              <button 
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </button>
            )}
            {isEditing && (
              <>
                <button 
                  className="btn-save"
                  onClick={handleSubmit}
                >
                  Guardar Cambios
                </button>
                <button 
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  ✕ Cancelar
                </button>
              </>
            )}
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="profile-form">
          <div className="form-section">
            <h3 className="section-title">Información Personal</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                ) : (
                  <div className="field-display">{profile?.nombre || 'No especificado'}</div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                  />
                ) : (
                  <div className="field-display">{profile?.apellido || 'No especificado'}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                  />
                ) : (
                  <div className="field-display">{profile?.email || 'No especificado'}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento</label>
                {isEditing ? (
                  <input
                    type="date"
                    id="fecha_de_nacimiento"
                    name="fecha_de_nacimiento"
                    value={formData.fecha_de_nacimiento}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="field-display">
                    {profile?.fecha_de_nacimiento ? 
                      new Date(profile.fecha_de_nacimiento).toLocaleDateString('es-CO') 
                      : 'No especificada'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Identificación</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="identificacion">Tipo de Identificación</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="identificacion"
                    name="identificacion"
                    value={formData.identificacion}
                    onChange={handleChange}
                    placeholder="Ej: CC, CE, PA"
                  />
                ) : (
                  <div className="field-display">{profile?.identificacion || 'No especificado'}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="id_identificacion">Número de Identificación</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="id_identificacion"
                    name="id_identificacion"
                    value={formData.id_identificacion}
                    onChange={handleChange}
                    placeholder="Número de identificación"
                  />
                ) : (
                  <div className="field-display">{profile?.id_identificacion || 'No especificado'}</div>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Información de Contacto</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="misisdn">Teléfono</label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="misisdn"
                    name="misisdn"
                    value={formData.misisdn}
                    onChange={handleChange}
                    placeholder="Tu número de teléfono"
                  />
                ) : (
                  <div className="field-display">{profile?.misisdn || 'No especificado'}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Tu dirección"
                  />
                ) : (
                  <div className="field-display">{profile?.direccion || 'No especificada'}</div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
