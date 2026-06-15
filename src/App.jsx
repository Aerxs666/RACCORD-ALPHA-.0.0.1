import { useEffect, useState } from 'react';
import './App.css';
import Login from './componentes/login/login';
import AdminDashboard from './componentes/admin/AdminDashboard';
import UserDashboard from './componentes/user/UserDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      });
  }, []);

  const handleLogin = (userData, token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    }
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const Dashboard = user?.role === 'admin' ? AdminDashboard : UserDashboard;

  return (
    <div className="app-shell">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
