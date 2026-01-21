import React from 'react';
import { theme } from '../styles/theme';
import miloLogo from '../assets/milo-brand.png';

const Welcome = ({ onEnter }) => {
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row', // Fuerza la fila: Texto Izq | Imagen Der
      flexWrap: 'wrap',     // Permite caer en móviles, pero en PC se mantiene al lado
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: theme.colors.white,
      margin: 0,
      padding: 0,
      overflowX: 'hidden'
    },
    // SECCIÓN IZQUIERDA: Contenido (Texto y Botón)
    contentSide: {
      flex: '1 1 300px', // Base de 500px. Si hay espacio, ocupa la mitad.
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '5% 8%', // Espaciado interno cómodo
      backgroundColor: theme.colors.white,
      zIndex: 1
    },
    // SECCIÓN DERECHA: Imagen
    imageSide: {
      flex: '1 1 500px', // Base de 500px. Si hay espacio, ocupa la otra mitad.
      backgroundColor: theme.colors.cream,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh', // Altura mínima para que no desaparezca
      position: 'relative'
    },
    logo: {
      width: '80%',
      maxWidth: '600px',
      height: 'auto',
      objectFit: 'contain'
    },
    title: {
      fontSize: 'clamp(3rem, 5vw, 4.5rem)',
      color: theme.colors.red,
      fontWeight: '900',
      marginBottom: '20px',
      lineHeight: '1.1'
    },
    description: {
      fontSize: '1.25rem',
      color: theme.colors.dark,
      marginBottom: '40px',
      lineHeight: '1.6',
      maxWidth: '600px' // Evita que el texto se estire demasiado
    },
    button: {
      backgroundColor: theme.colors.red,
      color: theme.colors.white,
      padding: '20px 40px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1.1rem',
      width: 'fit-content',
      boxShadow: '0 4px 6px rgba(227, 27, 35, 0.3)',
      transition: 'transform 0.2s ease'
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* 1. PRIMERO EN EL CÓDIGO = IZQUIERDA EN PANTALLA */}
      <div style={styles.contentSide}>
        <h1 style={styles.title}>Team Milo</h1>
        
        {/* Texto limpio sin [cite] */}
        <div style={styles.description}>
          <p>
            <strong>GenioContent</strong>: Aplicación móvil con IA que automatiza la creación de contenido y el cierre de ventas. 
            Nuestra tecnología actúa como un "Director de Marketing de Bolsillo" para evitar la invisibilidad digital.
          </p>
        </div>

        <button 
          onClick={onEnter}
          style={styles.button}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Ingresar a la Demo
        </button>
      </div>

      {/* 2. SEGUNDO EN EL CÓDIGO = DERECHA EN PANTALLA */}
      <div style={styles.imageSide}>
        <img src={miloLogo} alt="Logo Team Milo" style={styles.logo} />
      </div>
    </div>
  );
};

export default Welcome;