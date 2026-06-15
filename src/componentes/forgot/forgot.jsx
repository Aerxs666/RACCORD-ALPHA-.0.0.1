import { useState } from 'react';
import './forgot.css';
import { recoverAccount } from '../../api/auth';

const Forgot = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await recoverAccount({ email });
      setMessage(response.message || 'Revisa tu correo para continuar.');
    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Recuperar cuenta</h2>
        <p>Ingresa el correo asociado a tu cuenta. Te enviaremos instrucciones para recuperar tu contraseña o usuario.</p>

        {message && <div className="forgot-success">{message}</div>}
        {error && <div className="forgot-error">{error}</div>}

        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="recoverEmail">Correo electrónico</label>
            <input
              id="recoverEmail"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar instrucciones'}
          </button>
        </form>

        <button type="button" className="secondary-button" onClick={onBack}>
          ← Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
};

export default Forgot;
