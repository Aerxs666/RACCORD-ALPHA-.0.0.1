import { useState } from 'react';
import './login.css';

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

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((current) => ({ ...current, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeTab === 'login') {
      console.log('Ingresar con:', loginData);
    } else {
      console.log('Registrar con:', registerData);
    }
    onLogin?.();
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="brand-logo" aria-hidden="true" />

        <div className="login-card">
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Ingresar
            </button>
            <button
              type="button"
              className={`login-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Registrar
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {activeTab === 'login' ? (
              <>
                <div className="field-group">
                  <label htmlFor="user">Username o E-mail</label>
                  <input
                    id="user"
                    name="user"
                    type="text"
                    placeholder="Ingresa tu usuario o correo"
                    value={loginData.user}
                    onChange={handleLoginChange}
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
                  />
                </div>

                <button className="submit-button" type="submit">
                  Ingresar
                </button>

                <div className="login-footer">
                  <a href="#">¿Olvidaste tu contraseña o usuario?</a>
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
                  />
                </div>

                <button className="submit-button" type="submit">
                  Registrar
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
