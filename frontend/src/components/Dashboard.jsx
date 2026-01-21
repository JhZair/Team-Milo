import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { api } from '../services/api';

const Dashboard = ({ onLogout }) => {
  const [saldo, setSaldo] = useState(0.00);
  const [guion, setGuion] = useState(null);
  const [loadingIA, setLoadingIA] = useState(false);
  
  // Estados para las nuevas funcionalidades
  const [metricas, setMetricas] = useState({ vistas: 0, clics: 0 });
  const [linkGenerado, setLinkGenerado] = useState(null);

  // Cargar métricas simuladas al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      const data = await api.obtenerMetricas();
      setMetricas(data);
    };
    cargarDatos();
  }, []);

  const handleRecarga = async () => {
    const exito = await api.recargarSaldo(50);
    if (exito) setSaldo(prev => prev + 50);
  };

  const handleIA = async () => {
    setLoadingIA(true);
    setTimeout(async () => {
      const data = await api.generarGuion('Gastronomía');
      setGuion(data);
      setLoadingIA(false);
    }, 1500);
  };

  const handleGenerarLink = async () => {
    const link = await api.generarLinkCierre('la Oferta de Hoy');
    setLinkGenerado(link);
    alert('Link de cierre copiado al portapapeles (Simulado)');
  };

  const styles = {
    mainWrapper: {
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: theme.colors.cream,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '40px 20px',
      boxSizing: 'border-box'
    },
    contentContainer: {
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '20px',
      borderBottom: `2px solid rgba(227, 27, 35, 0.1)`
    },
    title: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      color: theme.colors.red,
      fontWeight: '900',
      margin: 0
    },
    logoutButton: {
      background: 'transparent',
      border: 'none',
      color: theme.colors.dark,
      fontSize: '1rem',
      cursor: 'pointer',
      textDecoration: 'underline'
    },
    grid: {
      display: 'grid',
      // Ajuste para que quepan bien las 4 tarjetas
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '25px',
      width: '100%'
    },
    card: {
      backgroundColor: theme.colors.white,
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: theme.colors.dark,
      border: '1px solid rgba(0,0,0,0.02)'
    },
    // Estilos específicos de botones
    yapeButton: {
      backgroundColor: theme.colors.yape,
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      border: 'none',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',
      marginTop: '15px'
    },
    iaButton: {
      backgroundColor: theme.colors.red,
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      border: 'none',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer'
    },
    // NUEVO ESTILO: Botón "Generar Nuevo" (Solicitado)
    retryButton: {
      marginTop: '15px',
      backgroundColor: theme.colors.dark, // Ahora es negro/oscuro sólido
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      width: '100%',
      transition: 'background 0.2s'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: theme.colors.red,
      margin: '0'
    }
  };

  return (
    <div style={styles.mainWrapper}>
      <div style={styles.contentContainer}>
        
        <header style={styles.header}>
          <h2 style={styles.title}>Panel GenioContent</h2>
          <button style={styles.logoutButton} onClick={onLogout}>Cerrar Sesión</button>
        </header>

        <div style={styles.grid}>
          
          {/* 1. AD-WALLET (Esencial para SaaS híbrido) */}
          <div style={styles.card}>
            <div>
              <h3 style={{margin: 0, color: '#666'}}>💰 Ad-Wallet</h3>
              <p style={{fontSize: '3rem', fontWeight: 'bold', margin: '10px 0'}}>S/ {saldo.toFixed(2)}</p>
              <p style={{fontSize: '0.9rem', color: '#888'}}>Presupuesto para Meta Ads</p>
            </div>
            <button style={styles.yapeButton} onClick={handleRecarga}>
              Recargar +S/50 (Yape)
            </button>
          </div>

          {/* 2. DIRECTOR IA (Core del producto) */}
          <div style={styles.card}>
            <h3 style={{margin: '0 0 15px 0', color: theme.colors.red}}>🤖 Director IA</h3>
            {!guion ? (
              <>
                <p style={{marginBottom: '20px', lineHeight: '1.5'}}>
                  Detectamos tendencias hoy en <strong>Cusco</strong> para tu negocio.
                </p>
                <button style={styles.iaButton} onClick={handleIA}>
                  {loadingIA ? 'Analizando...' : 'Crear Estrategia'}
                </button>
              </>
            ) : (
              <div style={{backgroundColor: '#F3F4F6', padding: '15px', borderRadius: '10px', borderLeft: `4px solid ${theme.colors.red}`}}>
                <p style={{fontWeight: 'bold', marginBottom: '5px'}}>🎯 {guion.estrategia}</p>
                <p style={{fontSize: '0.95rem', fontStyle: 'italic'}}>"{guion.contenido}"</p>
                
                {/* BOTÓN CON CAMBIO DE COLOR SOLICITADO */}
                <button 
                  style={styles.retryButton}
                  onClick={() => setGuion(null)}
                >
                  ↻ Generar Otra Opción
                </button>
              </div>
            )}
          </div>

          {/* 3. MÉTRICAS DE IMPACTO (Nuevo - Validar Invisibilidad) */}
          <div style={styles.card}>
            <h3 style={{margin: '0 0 15px 0', color: theme.colors.dark}}>📊 Resultados</h3>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
              <div>
                <p style={{margin: 0, fontSize: '0.9rem', color: '#666'}}>Vistas Locales</p>
                <p style={styles.statNumber}>{metricas.vistas}</p>
              </div>
              <div style={{textAlign: 'right'}}>
                <p style={{margin: 0, fontSize: '0.9rem', color: '#666'}}>Interesados</p>
                <p style={{fontSize: '2.5rem', fontWeight: '800', color: theme.colors.dark, margin: 0}}>{metricas.clics}</p>
              </div>
            </div>
            <p style={{fontSize: '0.8rem', color: '#888', marginTop: '10px'}}>
              Tu negocio es un <strong>40% más visible</strong> esta semana.
            </p>
          </div>

          {/* 4. CIERRE DE VENTAS (Nuevo - PDF: "Cerrar ventas reales") */}
          <div style={styles.card}>
            <h3 style={{margin: '0 0 15px 0', color: theme.colors.dark}}>⚡ Kit de Ventas</h3>
            <p style={{marginBottom: '20px', fontSize: '0.95rem'}}>
              Convierte los likes en dinero. Genera links directos para cerrar por WhatsApp.
            </p>
            <button 
              style={{...styles.iaButton, backgroundColor: '#25D366'}} // Color WhatsApp
              onClick={handleGenerarLink}
            >
              {linkGenerado ? 'Link Copiado!' : 'Crear Link de Pago'}
            </button>
            <button style={{marginTop: '10px', background: 'transparent', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', width: '100%', cursor: 'pointer', fontWeight: '600', color: '#666'}}>
              Ver Guiones de Cierre
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;