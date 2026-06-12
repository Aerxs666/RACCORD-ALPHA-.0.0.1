import { useState } from 'react';
import './App.css';
import Login from './componentes/login/login';
import Proyectos from './componentes/proyectos/proyectos';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app-shell">
      {isAuthenticated ? (
        <Proyectos />
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
