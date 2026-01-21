import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('welcome');

  return (
    <div className="App">
      {currentView === 'welcome' ? (
        <Welcome onEnter={() => setCurrentView('dashboard')} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;