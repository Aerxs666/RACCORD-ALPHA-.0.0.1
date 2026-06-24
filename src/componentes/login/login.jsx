import { useState } from 'react';
import './login.css';
import Forgot from '../forgot/forgot';
import { loginUser, registerUser } from '../../api/auth';

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ user: '', password: '' });
  const [registerData, setRegisterData] = useState({
    nombre: '',
    apellido: '',
    identificacion: 'cedula',
    id_identificacion: '',
    email: '',
    misisdn: '',
    direccion: '',
    fecha_de_nacimiento: '',
    password: '',
    confirmPassword: '',
    id_departamento: '1',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  };

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
          nombre: registerData.nombre,
          apellido: registerData.apellido,
          identificacion: registerData.identificacion,
          id_identificacion: registerData.id_identificacion,
          email: registerData.email,
          misisdn: registerData.misisdn,
          direccion: registerData.direccion,
          fecha_de_nacimiento: registerData.fecha_de_nacimiento,
          password: registerData.password,
          id_departamento: registerData.id_departamento,
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
        <img className="brand-logo" src="/header.jpeg" alt="Raccord" />

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
                  <label htmlFor="nombre">Nombres</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ingresa tus nombres"
                    value={registerData.nombre}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="apellido">Apellidos</label>
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    placeholder="Ingresa tus apellidos"
                    value={registerData.apellido}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="identificacion">Tipo de Identificación</label>
                  <select
                    id="identificacion"
                    name="identificacion"
                    value={registerData.identificacion}
                    onChange={handleRegisterChange}
                    required
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="cedula">Cédula</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="nit">NIT</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="id_identificacion">Número de Identificación</label>
                  <input
                    id="id_identificacion"
                    name="id_identificacion"
                    type="text"
                    placeholder="Ingresa tu número de identificación"
                    value={registerData.id_identificacion}
                    onChange={handleRegisterChange}
                    required
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
                  <label htmlFor="misisdn">Celular</label>
                  <input
                    id="misisdn"
                    name="misisdn"
                    type="tel"
                    placeholder="Ingresa tu número de celular"
                    value={registerData.misisdn}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    id="direccion"
                    name="direccion"
                    type="text"
                    placeholder="Ingresa tu dirección"
                    value={registerData.direccion}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento</label>
                  <input
                    id="fecha_de_nacimiento"
                    name="fecha_de_nacimiento"
                    type="date"
                    value={registerData.fecha_de_nacimiento}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="id_departamento">Departamento</label>
                  <select
                    id="id_departamento"
                    name="id_departamento"
                    value={registerData.id_departamento}
                    onChange={handleRegisterChange}
                  >
                    <option value="">Selecciona un departamento</option>
                    <option value="1">Departamento 1</option>
                    <option value="2">Departamento 2</option>
                    <option value="3">Departamento 3</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="passwordRegister">Contraseña</label>
                  <input
                    id="passwordRegister"
                    name="password"
                    type="password"
                    placeholder="Crea una contraseña"
                    value={registerData.password}
                    onChange={(e) => {
                      handleRegisterChange(e);
                      setShowPasswordRequirements(true);
                    }}
                    onBlur={() => setShowPasswordRequirements(false)}
                    required
                  />
                  {showPasswordRequirements && registerData.password && (
                    <div className="password-requirements">
                      {(() => {
                        const reqs = validatePassword(registerData.password);
                        return (
                          <>
                            <div className={`requirement ${reqs.minLength ? 'met' : ''}`}>
                              <span>{reqs.minLength ? '✓' : '✗'}</span> Mínimo 8 caracteres
                            </div>
                            <div className={`requirement ${reqs.hasUpperCase ? 'met' : ''}`}>
                              <span>{reqs.hasUpperCase ? '✓' : '✗'}</span> Al menos una mayúscula
                            </div>
                            <div className={`requirement ${reqs.hasNumber ? 'met' : ''}`}>
                              <span>{reqs.hasNumber ? '✓' : '✗'}</span> Al menos un número
                            </div>
                            <div className={`requirement ${reqs.hasSpecialChar ? 'met' : ''}`}>
                              <span>{reqs.hasSpecialChar ? '✓' : '✗'}</span> Carácter especial
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
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


        </div>
      </div>
    </div>
  );
};

export default Login;
