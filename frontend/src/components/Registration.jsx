import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { api } from '../services/api';
import miloLogo from '../assets/milo-logo.png';

const Registration = ({ onComplete }) => {
  const [formData, setFormData] = useState({ nombreNegocio: '', rubro: '', ciudad: 'Cusco' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.registrarUsuario(formData);
    setTimeout(() => { setLoading(false); onComplete(formData); }, 1000);
  };

  const ciudadesPeru = ["Cusco", "Lima", "Arequipa", "Trujillo", "Otros"];

  const styles = {
    wrapper: { width: '100%', height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' },
    // HEADER CREMA
    header: { 
      backgroundColor: theme.colors.cream, 
      padding: '50px 25px 30px 25px', 
      borderBottomLeftRadius: '30px', 
      borderBottomRightRadius: '30px', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' // Asegura centrado del logo
    },
    
    logo: { 
      height: '60px', // Aumentado para que se vea bien centrado
      objectFit: 'contain', 
      marginBottom: '15px' 
    },
    title: { fontSize: '1.5rem', color: theme.colors.red, fontWeight: '900', margin: 0 },
    subtitle: { fontSize: '0.9rem', color: '#666', marginTop: '10px' },
    
    formContainer: { flex: 1, padding: '30px 25px', display: 'flex', flexDirection: 'column' },
    label: { display: 'block', fontWeight: 'bold', marginBottom: '8px', color: theme.colors.dark, fontSize: '0.9rem' },
    input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#FAFAFA', fontSize: '1rem', marginBottom: '20px', boxSizing: 'border-box', outline: 'none', color: theme.colors.dark },
    button: { backgroundColor: theme.colors.red, color: 'white', border: 'none', padding: '18px', width: '100%', borderRadius: '14px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto', boxShadow: '0 5px 15px rgba(227, 27, 35, 0.2)' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <img src={miloLogo} alt="Milo" style={styles.logo} />
        <h2 style={styles.title}>Configura tu Perfil</h2>
        <p style={styles.subtitle}>Personalicemos la IA para tu negocio.</p>
      </div>

      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Nombre del Negocio</label>
          <input type="text" name="nombreNegocio" placeholder="Ej. Restaurante Sol" style={styles.input} value={formData.nombreNegocio} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required />
        </div>
        <div>
          <label style={styles.label}>Rubro</label>
          <select name="rubro" style={styles.input} value={formData.rubro} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required>
            <option value="" disabled>Selecciona...</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Moda">Moda / Retail</option>
            <option value="Turismo">Turismo</option>
          </select>
        </div>
        <div>
          <label style={styles.label}>Ciudad</label>
          <select name="ciudad" style={styles.input} value={formData.ciudad} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}>
            {ciudadesPeru.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" style={styles.button}>{loading ? 'Guardando...' : 'Continuar'}</button>
      </form>
    </div>
  );
};

export default Registration;