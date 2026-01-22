import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Registration from './components/Registration';
import GoalSetup from './components/GoalSetup'; // IMPORTAR NUEVO COMPONENTE
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [userData, setUserData] = useState(null);
  const [userGoal, setUserGoal] = useState('0'); // Estado para guardar la meta

  const navigateTo = (view) => {
    const phoneScreen = document.getElementById('phone-screen');
    if (phoneScreen) phoneScreen.scrollTop = 0;
    setCurrentView(view);
  };

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    navigateTo('goal-setup'); // NUEVO PASO
  };

  const handleGoalConfirmed = (amount) => {
    setUserGoal(amount);
    navigateTo('dashboard');
  };

  // ... (Estilos del marco del teléfono se mantienen igual) ...
  const styles = {
    // ... copia los mismos estilos de bodyBackground, phoneFrame, etc. que te di antes ...
    bodyBackground: { backgroundColor: '#000000', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, overflow: 'hidden' },
    phoneFrame: { width: '390px', height: '800px', backgroundColor: '#fff', borderRadius: '50px', border: '12px solid #1a1a1a', position: 'relative', boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
    notch: { position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '30px', backgroundColor: '#1a1a1a', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', zIndex: 1000 },
    screenContent: { width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }
  };

  return (
    <div style={styles.bodyBackground}>
      <div style={styles.phoneFrame}>
        <div style={styles.notch}></div>
        <div id="phone-screen" style={styles.screenContent} className="hide-scrollbar">
          
          {currentView === 'welcome' && (
            <Welcome 
              onEnter={() => navigateTo('register')} 
              onLogin={() => {
                setUserData({ nombreNegocio: "Demo Negocio", rubro: "General" });
                setUserGoal('5000'); // Meta por defecto si salta registro
                navigateTo('dashboard');
              }}
            />
          )}
          
          {currentView === 'register' && (
            <Registration onComplete={handleRegistrationComplete} />
          )}

          {/* NUEVA VISTA DE OBJETIVO */}
          {currentView === 'goal-setup' && (
            <GoalSetup onConfirm={handleGoalConfirmed} />
          )}

          {currentView === 'dashboard' && (
            <Dashboard 
              userData={userData}
              initialGoal={userGoal}
              onLogout={() => {
                setUserData(null);
                navigateTo('welcome');
              }} 
            />
          )}
        
        </div>
      </div>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

export default App;