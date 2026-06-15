import { useState } from 'react';
import './login.css';
import Forgot from '../forgot/forgot';
import { loginUser, registerUser } from '../../api/auth';

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ user: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((current) => ({ ...current, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        const response = await loginUser({
          email: loginData.user,
          password: loginData.password,
        });
        onLogin(response.user, response.token);
      } else {
        if (registerData.password !== registerData.confirmPassword) {
          setError('Las contraseñas no coinciden.');
          setLoading(false);
          return;
        }

        const response = await registerUser({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          phone: registerData.phone,
          email: registerData.email,
          password: registerData.password,
        });
        onLogin(response.user, response.token);
      }
    } catch (err) {
      setError(err.message || 'Error al autenticar.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demoUser = {
      name: role === 'admin' ? 'Admin Demo' : 'Usuario Demo',
      role,
      email: role === 'admin' ? 'admin@demo.com' : 'user@demo.com',
    };

    onLogin(demoUser, null);
  };

  if (activeTab === 'forgot') {
    return <Forgot onBack={() => { setActiveTab('login'); setError(''); }} />;
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <img className="brand-logo" src="/raccord-logo.jpeg" alt="Raccord" />

        <div className="login-card">
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
            >
              Ingresar
            </button>
            <button
              type="button"
              className={`login-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
            >
              Registrar
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="login-error">{error}</div>}

            {activeTab === 'login' ? (
              <>
                <div className="field-group">
                  <label htmlFor="user">Email</label>
                  <input
                    id="user"
                    name="user"
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={loginData.user}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <button className="submit-button" type="submit" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </button>

                <div className="login-footer">
                  <button type="button" className="link-button" onClick={() => setActiveTab('forgot')}>
                    ¿Olvidaste tu contraseña o usuario?
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="field-group">
                  <label htmlFor="firstName">Nombres</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Ingresa tus nombres"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="lastName">Apellidos</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Ingresa tus apellidos"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="phone">Celular</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Ingresa tu número de celular"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="passwordRegister">Contraseña</label>
                  <input
                    id="passwordRegister"
                    name="password"
                    type="password"
                    placeholder="Crea una contraseña"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <button className="submit-button" type="submit" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrar'}
                </button>
              </>
            )}
          </form>

          <div className="demo-access">
            <p>Si aún no está conectado a la base de datos, ingresa con demo:</p>
            <div className="demo-buttons">
              <button type="button" className="demo-button demo-button--admin" onClick={() => handleDemoLogin('admin')}>
                Acceder como Admin
              </button>
              <button type="button" className="demo-button demo-button--user" onClick={() => handleDemoLogin('user')}>
                Acceder como Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
