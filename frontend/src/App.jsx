import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
  
  const [userData, setUserData] = useState(null);

  const navigateTo = (view) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  const handleRegistrationComplete = (data) => {
    setUserData(data); // Guardamos los datos (Nombre, Rubro, Ciudad)
    navigateTo('dashboard');
  };

  return (
    <div className="App">
      {currentView === 'welcome' && (
        <Welcome 
          onEnter={() => navigateTo('register')} 
          onLogin={() => {
            // Si entra directo (login), usamos datos simulados por defecto
            setUserData({ nombreNegocio: "Mi Negocio Demo", rubro: "General", ciudad: "Cusco" });
            navigateTo('dashboard');
          }}
        />
      )}
      
      {currentView === 'register' && (
        <Registration 
          onComplete={handleRegistrationComplete} // Pasamos la función nueva
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard 
          userData={userData} // Pasamos los datos al Dashboard
          onLogout={() => {
            setUserData(null);
            navigateTo('welcome');
          }} 
        />
      )}
    </div>
  );
}

export default App;