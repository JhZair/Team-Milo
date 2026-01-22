import React from 'react';
import { theme } from '../styles/theme';
import miloLogo from '../assets/milo-brand.png';

const Welcome = ({ onEnter, onLogin }) => {
  const styles = {
    // CONTENEDOR PRINCIPAL
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%', // Ocupa todo el alto del "teléfono"
      backgroundColor: theme.colors.cream, // Fondo base crema para evitar huecos blancos
      overflow: 'hidden'
    },
    
    // ZONA SUPERIOR (IMAGEN)
    imageSection: {
      flex: '0 0 45%', // Ocupa el 45% superior de la pantalla
      width: '100%',
      backgroundColor: theme.colors.cream,
      display: 'flex',
      alignItems: 'center', // Centrado Vertical
      justifyContent: 'center', // Centrado Horizontal
      paddingTop: '20px' // Compensación visual por el notch
    },
    
    // EL LOGO (Ahora es una etiqueta img para mejor control)
    logo: {
      width: '70%', // Tamaño controlado
      maxWidth: '280px',
      height: 'auto',
      objectFit: 'contain'
    },

    // ZONA INFERIOR (TEXTO)
    textSection: {
      flex: '1', // Ocupa el resto del espacio
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: '30px', // Efecto de tarjeta moderna
      borderTopRightRadius: '30px',
      padding: '40px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Centra el texto verticalmente en su zona
      alignItems: 'center',
      boxShadow: '0 -10px 30px rgba(0,0,0,0.05)', // Sombra sutil hacia arriba
      position: 'relative' // Para asegurar que esté encima
    },

    title: {
      fontSize: '2.5rem',
      color: theme.colors.red,
      fontWeight: '900',
      marginBottom: '15px',
      textAlign: 'center',
      lineHeight: '1.1'
    },
    
    description: {
      fontSize: '1rem',
      color: theme.colors.dark,
      marginBottom: '30px',
      lineHeight: '1.6',
      textAlign: 'center'
    },
    
    primaryButton: {
      backgroundColor: theme.colors.red,
      color: theme.colors.white,
      padding: '18px',
      borderRadius: '15px',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      width: '100%',
      cursor: 'pointer',
      marginBottom: '15px',
      boxShadow: '0 4px 10px rgba(227, 27, 35, 0.3)'
    },
    
    secondaryButton: {
      backgroundColor: 'transparent',
      color: theme.colors.red,
      border: `2px solid ${theme.colors.red}`,
      padding: '16px',
      borderRadius: '15px',
      fontWeight: 'bold',
      fontSize: '1rem',
      width: '100%',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.wrapper}>
      
      {/* 1. SECCIÓN DE IMAGEN (ARRIBA) */}
      <div style={styles.imageSection}>
        <img src={miloLogo} alt="Logo Team Milo" style={styles.logo} />
      </div>

      {/* 2. SECCIÓN DE CONTENIDO (ABAJO) */}
      <div style={styles.textSection}>
        <h1 style={styles.title}>Team Milo</h1>
        
        <p style={styles.description}>
          <strong>GenioContent</strong>: Tu Director de Marketing de bolsillo. 
          Automatiza tu contenido y cierra ventas reales con IA proactiva.
        </p>

        <button 
          style={styles.primaryButton}
          onClick={onEnter}
        >
          Registrar mi Negocio
        </button>
        
        <button 
          style={styles.secondaryButton}
          onClick={onLogin}
        >
          Ingresar a la Demo
        </button>
      </div>

    </div>
  );
};

export default Welcome;