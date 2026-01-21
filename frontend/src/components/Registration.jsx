import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { api } from '../services/api';

const Registration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    nombreNegocio: '',
    rubro: '',
    ciudad: 'Cusco' // Valor por defecto
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.registrarUsuario(formData);
    setTimeout(() => {
      setLoading(false);
      onComplete(formData); 
    }, 1500);
  };

  // Lista de ciudades para el selector
  const ciudadesPeru = [
    "Cusco", "Lima", "Arequipa", "Trujillo", "Chiclayo", 
    "Piura", "Huancayo", "Iquitos", "Tacna", "Cajamarca", 
    "Pucallpa", "Juliaca", "Ayacucho", "Otro"
  ];

  const styles = {
    wrapper: {
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: theme.colors.cream,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: theme.colors.white,
      width: '100%',
      maxWidth: '500px',
      padding: '40px',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      textAlign: 'center'
    },
    title: {
      fontSize: '1.8rem',
      color: theme.colors.red,
      fontWeight: '900',
      marginBottom: '10px'
    },
    subtitle: {
      color: '#666',
      marginBottom: '30px',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left'
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: theme.colors.dark,
      fontSize: '0.9rem'
    },
    // ESTILO CORREGIDO PARA INPUTS Y SELECTS
    inputField: {
      width: '100%',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid #ccc', // Borde más visible
      fontSize: '1rem',
      backgroundColor: '#FFFFFF', // Fondo blanco puro
      color: theme.colors.dark,   // Texto oscuro explícito (#1A1A1A)
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'border 0.2s',
      fontFamily: 'inherit' // Asegura que use la misma fuente
    },
    button: {
      backgroundColor: theme.colors.red,
      color: 'white',
      border: 'none',
      padding: '18px',
      width: '100%',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      opacity: loading ? 0.7 : 1,
      transition: 'background 0.3s'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Configura tu Negocio</h2>
        <p style={styles.subtitle}>
          Para que la IA genere estrategias efectivas, necesitamos conocer un poco sobre tu Mipyme.
        </p>

        <form onSubmit={handleSubmit}>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre de tu Negocio</label>
            <input 
              type="text" 
              name="nombreNegocio"
              placeholder="Ej. Restaurante El Sol"
              style={styles.inputField}
              value={formData.nombreNegocio}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Rubro / Categoría</label>
            <select 
              name="rubro"
              style={styles.inputField}
              value={formData.rubro}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="Gastronomía">Gastronomía / Restaurante</option>
              <option value="Moda">Moda y Retail</option>
              <option value="Turismo">Turismo y Agencias</option>
              <option value="Servicios">Servicios Profesionales</option>
              <option value="Artesanía">Artesanía y Souvenirs</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Ciudad</label>
            <select 
              name="ciudad"
              style={styles.inputField}
              value={formData.ciudad}
              onChange={handleChange}
              required
            >
              {ciudadesPeru.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Activando Director IA...' : 'Comenzar Ahora'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Registration;