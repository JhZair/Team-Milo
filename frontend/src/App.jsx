import React from 'react';
import miloLogo from './assets/milo-brand.png';

function App() {
  // --- PALETA DE COLORES EXTRAÍDA DEL LOGO ---
  const brandPalette = {
    red: '#E31B23',        // Rojo Milo
    cream: '#F9F1E2',      // Fondo Crema Milo
    white: '#FFFFFF',      // Blanco para contraste
    darkText: '#1A1A1A'    // Texto oscuro
  };

  const styles = {
    mainContainer: {
      minHeight: '100vh',
      backgroundColor: brandPalette.cream,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0', // Eliminamos el padding para evitar franjas laterales
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    splitCard: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: '1200px', // Aumentamos el ancho máximo para reducir espacios laterales
      backgroundColor: brandPalette.white,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      borderRadius: '0' // En demos visuales, a veces el borde recto ayuda a ocupar mejor el ancho
    },
    // LADO IZQUIERDO: Imagen
    imageSide: {
      flex: '1 1 600px', // Aumentamos la base de la imagen
      minHeight: '600px',
      backgroundImage: `url(${miloLogo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: brandPalette.cream
    },
    // LADO DERECHO: Contenido
    contentSide: {
      flex: '1 1 400px',
      padding: '60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: brandPalette.white
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '900',
      color: brandPalette.red,
      marginBottom: '20px',
      letterSpacing: '-1.5px'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: brandPalette.darkText,
      marginBottom: '40px',
      lineHeight: '1.6'
    },
    primaryButton: {
      backgroundColor: brandPalette.red,
      color: brandPalette.white,
      border: 'none',
      padding: '20px 35px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      borderRadius: '12px',
      cursor: 'pointer',
      marginBottom: '15px',
      transition: 'all 0.2s ease'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: brandPalette.red,
      border: `2px solid ${brandPalette.red}`,
      padding: '18px 35px',
      fontSize: '1.1rem',
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
          
          <button 
            style={styles.primaryButton}
            onClick={() => alert('Iniciando registro')}
          >
            Registrar mi Negocio
          </button>
          
          <button 
            style={styles.secondaryButton} 
            onClick={() => alert('Acceso a Ad-Wallet')}
          >
            Ingresar a Ad-Wallet
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;