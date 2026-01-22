import React, { useState } from 'react';
import { theme } from '../styles/theme';

const GoalSetup = ({ onConfirm }) => {
  const [monto, setMonto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!monto) return;
    onConfirm(monto);
  };

  const styles = {
    wrapper: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.white,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Centrado vertical puro
      padding: '30px',
      paddingTop: '60px', // IMPORTANTE: Espacio para que el Notch no tape el título
      boxSizing: 'border-box',
      textAlign: 'center'
    },
    title: {
      color: theme.colors.red,
      fontSize: '2rem',
      fontWeight: '900',
      marginBottom: '10px'
    },
    text: {
      color: theme.colors.dark,
      marginBottom: '30px',
      fontSize: '1.1rem'
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `3px solid ${theme.colors.red}`,
      marginBottom: '40px',
      paddingBottom: '5px'
    },
    currency: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: theme.colors.dark,
      marginRight: '10px'
    },
    input: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      border: 'none',
      outline: 'none',
      width: '150px',
      textAlign: 'center',
      color: theme.colors.dark,
      backgroundColor: 'transparent'
    },
    button: {
      backgroundColor: theme.colors.red,
      color: 'white',
      padding: '18px',
      borderRadius: '15px',
      border: 'none',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      boxShadow: '0 10px 20px rgba(227, 27, 35, 0.2)'
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>¡Vamos por más!</h2>
      <p style={styles.text}>¿Cuál es tu objetivo de ventas para este mes?</p>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <span style={styles.currency}>S/</span>
          <input 
            type="number" 
            placeholder="0" 
            value={monto} 
            onChange={(e) => setMonto(e.target.value)}
            style={styles.input}
            autoFocus
          />
        </div>
        
        <button type="submit" style={styles.button}>
          Fijar Objetivo
        </button>
      </form>
    </div>
  );
};

export default GoalSetup;