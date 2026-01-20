import React from 'react';
import miloLogo from './assets/milo-brand.png';

function App() {
  const brandPalette = {
    red: '#E31B23',
    cream: '#F9F1E2',
    white: '#FFFFFF',
    darkText: '#1A1A1A'
  };

  const styles = {
    mainContainer: {
      minHeight: '100vh',
      backgroundColor: brandPalette.cream,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      margin: '0',
      width: '100%',
      overflowX: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    splitCard: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      // --- MODIFICA AQUÍ EL ANCHO ---
      // '100%' elimina las franjas laterales. 
      // Si quieres franjas pequeñas, usa '90%' o '95%'.
      maxWidth: '100%', 
      backgroundColor: brandPalette.white,
      minHeight: '80vh', // Para que cubra todo el alto también
      overflow: 'hidden'
    },
    imageSide: {
      flex: '1 1 500px',
      minHeight: '500px',
      backgroundImage: `url(${miloLogo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: brandPalette.cream
    },
    contentSide: {
      flex: '1 1 300px',
      padding: '5% 8%', // Espaciado porcentual para adaptarse al ancho
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: brandPalette.white
    },
    title: {
      fontSize: '4rem',
      fontWeight: '900',
      color: brandPalette.red,
      marginBottom: '24px',
      letterSpacing: '-2px'
    },
    subtitle: {
      fontSize: '1.4rem',
      color: brandPalette.darkText,
      marginBottom: '48px',
      lineHeight: '1.6'
    },
    primaryButton: {
      backgroundColor: brandPalette.red,
      color: brandPalette.white,
      border: 'none',
      padding: '22px 40px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      borderRadius: '12px',
      cursor: 'pointer',
      marginBottom: '16px',
      transition: 'background 0.3s'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: brandPalette.red,
      border: `2px solid ${brandPalette.red}`,
      padding: '20px 40px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      borderRadius: '12px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.splitCard}>
        
        {/* Lado de la Imagen */}
        <div style={styles.imageSide}></div>
        
        {/* Lado del Contenido */}
        <div style={styles.contentSide}>
          <h1 style={styles.title}>Team Milo</h1>
          
          <div style={styles.subtitle}>
            <p>
              <strong>GenioContent</strong>: Automatiza tu contenido y cierra ventas reales con nuestra IA proactiva. 
              No dejes que tu negocio sea invisible.
            </p>
          </div>
          
          <button style={styles.primaryButton} onClick={() => alert('Registrar')}>
            Registrar mi Negocio
          </button>
          
          <button style={styles.secondaryButton} onClick={() => alert('Login')}>
            Ingresar a Ad-Wallet
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;