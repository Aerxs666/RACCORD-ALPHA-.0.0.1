import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import RaccordLanding from './componentes/landing/landing';
import Login from './componentes/login/login';
import AdminDashboard from './componentes/admin/AdminDashboard';
import UserDashboard from './componentes/user/UserDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← nuevo

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false); // ← sin token, no hay que esperar
      return;
    }

    fetch('/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('No autorizado');
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false)); // ← siempre termina el loading
  }, []);

  const handleLogin = (userData, token) => {
    if (token) localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const Dashboard = user?.role === 'admin' ? AdminDashboard : UserDashboard;

  if (loading) return null; // espera antes de redirigir

  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal → Landing */}
        <Route path="/" element={<RaccordLanding />} />

        {/* Login: si ya está autenticado, va directo al dashboard */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <Login onLogin={handleLogin} />
          }
        />

        {/* Dashboard: protegido, si no está autenticado va al login */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <Dashboard user={user} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />

        {/* Cualquier ruta desconocida → landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;