import React from 'react';

function App() {
  // Estilos básicos integrados para rapidez
  const styles = {
    container: {
      fontFamily: 'sans-serif',
      backgroundColor: '#f4f7f6',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      color: '#333'
    },
    card: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      width: '100%'
    },
    title: {
      fontSize: '2rem',
      color: '#2563eb', // Azul profesional
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '30px',
      lineHeight: '1.5'
    },
    button: {
      backgroundColor: '#2563eb',
      color: '#fff',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      marginBottom: '15px'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#2563eb',
      border: '2px solid #2563eb',
      padding: '13px 30px',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Team Milo</h1>
        <p style={styles.subtitle}>
          Bienvenido a <strong>GenioContent</strong>. <br />
          Tu Director de Marketing con IA para que tu Mipyme nunca sea invisible.
        </p>
        
        <button style={styles.button} onClick={() => alert('Próximamente: Registro de Negocio')}>
          Registrar mi Negocio
        </button>
        
        <button style={styles.secondaryButton} onClick={() => alert('Próximamente: Acceso Ad-Wallet')}>
          Ingresar
        </button>

        <p style={{marginTop: '20px', fontSize: '0.8rem', color: '#999'}}>
          Impulsado por IA para cerrar ventas reales.
        </p>
      </div>
    </div>
  );
}

export default App;