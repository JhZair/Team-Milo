import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { api } from '../services/api';

// --- MODAL DE LLUVIA DE IDEAS (Ya existente) ---
const BrainstormModal = ({ isOpen, onClose, rubro }) => {
  const [activeTab, setActiveTab] = useState('ideas');
  const [ideas, setIdeas] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    if (isOpen) {
      api.obtenerIdeas(rubro).then(setIdeas);
      api.obtenerTrends(rubro).then(setTrends);
    }
  }, [isOpen, rubro]);

  if (!isOpen) return null;

  const styles = {
    overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'end' },
    container: { width: '100%', height: '85%', backgroundColor: '#fff', borderTopLeftRadius: '25px', borderTopRightRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.3s ease-out', boxSizing: 'border-box' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '1.5rem', fontWeight: '900', color: theme.colors.red, margin: 0 },
    closeBtn: { background: 'none', border: 'none', fontSize: '2rem', color: theme.colors.dark, cursor: 'pointer' },
    tabs: { display: 'flex', marginBottom: '20px', backgroundColor: '#f0f0f0', borderRadius: '12px', padding: '5px' },
    tab: (isActive) => ({ flex: 1, padding: '12px', textAlign: 'center', borderRadius: '10px', backgroundColor: isActive ? '#fff' : 'transparent', color: isActive ? theme.colors.red : '#666', fontWeight: 'bold', cursor: 'pointer', boxShadow: isActive ? '0 2px 5px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }),
    content: { flex: 1, overflowY: 'auto' },
    ideaCard: { backgroundColor: '#FFF5F5', padding: '15px', borderRadius: '12px', marginBottom: '15px', borderLeft: `4px solid ${theme.colors.red}`, color: theme.colors.dark, fontSize: '0.95rem', lineHeight: '1.5' },
    trendCard: { backgroundColor: '#1a1a1a', color: 'white', padding: '15px', borderRadius: '12px', marginBottom: '15px', display: 'flex', gap: '15px', alignItems: 'center' },
    trendIcon: { fontSize: '1.5rem' },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>💡 Inspiración</h2>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>
        <div style={styles.tabs}>
          <div style={styles.tab(activeTab === 'ideas')} onClick={() => setActiveTab('ideas')}>📝 Ideas Texto</div>
          <div style={styles.tab(activeTab === 'trends')} onClick={() => setActiveTab('trends')}>🔥 Trends Virales</div>
        </div>
        <div style={styles.content}>
          {activeTab === 'ideas' ? ideas.map((idea, i) => <div key={i} style={styles.ideaCard}>{idea}</div>) : trends.map((trend) => <div key={trend.id} style={styles.trendCard}><div style={styles.trendIcon}>{trend.platform === 'TikTok' ? '🎵' : '📸'}</div><div><div style={{fontWeight: 'bold', marginBottom: '5px'}}>{trend.title}</div><div style={{fontSize: '0.8rem', opacity: 0.8}}>{trend.views} vistas • {trend.desc}</div></div></div>)}
        </div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
};

// --- NUEVO: MODAL CREAR CONTENIDO (Multistep) ---
const CreateContentModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Selección, 2: Input, 3: Detalles, 4: Resultado
  const [sourceType, setSourceType] = useState(null); // 'referencia' o 'idea'
  const [inputValue, setInputValue] = useState(''); // Link o Texto de idea
  const [details, setDetails] = useState(''); // Detalles del negocio
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleNext = async () => {
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      const generated = await api.generarContenido(sourceType, inputValue, details);
      setResult(generated);
      setLoading(false);
      setStep(4);
    }
  };

  const reset = () => {
    setStep(1); setSourceType(null); setInputValue(''); setDetails(''); setResult(null); onClose();
  };

  const styles = {
    overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff', zIndex: 2000, padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    title: { fontSize: '1.5rem', fontWeight: '900', color: theme.colors.dark, margin: 0 },
    closeBtn: { background: 'none', border: 'none', fontSize: '2rem', color: '#666', cursor: 'pointer' },
    
    // Cards de selección
    selectionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
    selectionCard: { padding: '30px 10px', borderRadius: '15px', border: '2px solid #eee', backgroundColor: '#f9f9f9', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' },
    icon: { fontSize: '3rem', marginBottom: '10px', display: 'block' },
    label: { fontWeight: 'bold', color: theme.colors.dark },
    
    // Inputs
    labelInput: { display: 'block', marginBottom: '10px', fontWeight: 'bold', color: theme.colors.dark },
    textArea: { width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1rem', height: '120px', marginBottom: '20px', boxSizing: 'border-box', fontFamily: 'inherit' },
    fileZone: { border: '2px dashed #ccc', borderRadius: '12px', padding: '30px', textAlign: 'center', color: '#888', marginBottom: '20px', cursor: 'pointer' },
    
    // Resultado
    resultBox: { backgroundColor: '#F3F4F6', padding: '20px', borderRadius: '15px', borderLeft: `5px solid ${theme.colors.red}`, overflowY: 'auto', flex: 1, marginBottom: '20px', whiteSpace: 'pre-wrap' },
    
    btnPrimary: { width: '100%', padding: '18px', backgroundColor: theme.colors.red, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto' },
    btnSecondary: { width: '100%', padding: '15px', background: 'transparent', color: '#666', border: 'none', cursor: 'pointer', marginTop: '10px' }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {step === 1 && "Nuevo Contenido"}
          {step === 2 && (sourceType === 'referencia' ? "Sube tu Referencia" : "Escribe tu Idea")}
          {step === 3 && "Detalles del Negocio"}
          {step === 4 && "¡Listo!"}
        </h2>
        <button onClick={reset} style={styles.closeBtn}>&times;</button>
      </div>

      {step === 1 && (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <p style={{textAlign: 'center', color: '#666', marginBottom: '30px'}}>¿En qué nos basamos hoy?</p>
          <div style={styles.selectionGrid}>
            <div style={styles.selectionCard} onClick={() => { setSourceType('referencia'); setStep(2); }}>
              <span style={styles.icon}>🔗</span>
              <span style={styles.label}>Referencia</span>
              <p style={{fontSize: '0.8rem', color: '#888', marginTop: '5px'}}>Links, Videos, Fotos</p>
            </div>
            <div style={styles.selectionCard} onClick={() => { setSourceType('idea'); setStep(2); }}>
              <span style={styles.icon}>💡</span>
              <span style={styles.label}>Idea Propia</span>
              <p style={{fontSize: '0.8rem', color: '#888', marginTop: '5px'}}>Texto, Borradores</p>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{flex: 1}}>
          {sourceType === 'referencia' ? (
            <>
              <div style={styles.fileZone} onClick={() => alert('Simulación: Archivo subido')}>
                📂 Toca para subir imagen/video
              </div>
              <label style={styles.labelInput}>O pega un link (Instagram/TikTok):</label>
              <input 
                type="text" 
                placeholder="https://..." 
                style={{...styles.textArea, height: '50px'}} 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </>
          ) : (
            <>
              <label style={styles.labelInput}>Describe tu idea:</label>
              <textarea 
                placeholder="Ej: Quiero hablar sobre mis ofertas de fin de año..." 
                style={styles.textArea}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </>
          )}
          <button style={styles.btnPrimary} onClick={handleNext}>Siguiente</button>
        </div>
      )}

      {step === 3 && (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <p style={{color: '#666', marginBottom: '20px'}}>
            Para que la IA adapte el contenido, dinos qué producto o servicio quieres destacar.
          </p>
          <label style={styles.labelInput}>Detalles clave:</label>
          <textarea 
            placeholder="Ej: Zapatillas Urbanas Modelo X, color rojo, precio S/150..." 
            style={styles.textArea}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <button style={styles.btnPrimary} onClick={handleNext}>
            {loading ? 'Generando...' : 'Crear Contenido'}
          </button>
        </div>
      )}

      {step === 4 && result && (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <h3 style={{color: theme.colors.red, marginTop: 0}}>{result.tipo}</h3>
          <div style={styles.resultBox}>
            {result.contenido}
          </div>
          <button style={styles.btnPrimary} onClick={() => { alert('Guardado en Borradores'); reset(); }}>
            Usar este Guion
          </button>
          <button style={styles.btnSecondary} onClick={() => setStep(2)}>
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};

// --- DASHBOARD PRINCIPAL ---
const Dashboard = ({ onLogout, userData, initialGoal }) => {
  const [salesGoal, setSalesGoal] = useState(initialGoal || '0');
  const [showBrainstorm, setShowBrainstorm] = useState(false);
  const [showCreate, setShowCreate] = useState(false); // NUEVO ESTADO
  const [hasNewTrends, setHasNewTrends] = useState(true);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(salesGoal);

  const handleGoalUpdate = () => {
    setSalesGoal(tempGoal);
    setIsEditingGoal(false);
  };

  const styles = {
    wrapper: { position: 'relative', width: '100%', height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
    welcome: { fontSize: '1.5rem', fontWeight: '900', color: theme.colors.dark, margin: 0 },
    subWelcome: { fontSize: '0.9rem', color: '#666', margin: 0 },
    
    goalContainer: { backgroundColor: theme.colors.cream, padding: '10px 15px', borderRadius: '12px', textAlign: 'right', cursor: 'pointer', border: '1px solid #eee' },
    goalLabel: { fontSize: '0.7rem', color: theme.colors.red, fontWeight: 'bold', textTransform: 'uppercase' },
    goalAmount: { fontSize: '1.2rem', fontWeight: '900', color: theme.colors.dark },
    
    mainActionContainer: { 
      display: 'flex', 
      flexDirection: 'column', // Apilar botones
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: '10px',
      gap: '25px', // Espacio entre botones
      flex: 1 // Ocupar espacio central disponible
    },
    
    // BOTÓN 1: LLUVIA DE IDEAS (Grande)
    brainstormBtn: { 
      width: '180px', height: '180px', borderRadius: '50%', backgroundColor: theme.colors.red, 
      color: 'white', border: 'none', boxShadow: '0 20px 40px rgba(227, 27, 35, 0.3)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      cursor: 'pointer', position: 'relative', transition: 'transform 0.2s', zIndex: 10
    },
    btnIcon: { fontSize: '2.5rem', marginBottom: '5px' },
    btnText: { fontSize: '1.1rem', fontWeight: 'bold' },
    notification: { position: 'absolute', top: '15px', right: '15px', width: '25px', height: '25px', backgroundColor: '#FFD700', borderRadius: '50%', border: '3px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: theme.colors.dark },

    // BOTÓN 2: CREAR CONTENIDO (Más rectangular/ancho)
    createBtn: {
      width: '80%',
      padding: '15px 20px',
      backgroundColor: theme.colors.dark,
      color: 'white',
      borderRadius: '15px',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    },

    editOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.98)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0' },
    editInput: { fontSize: '2rem', border: 'none', borderBottom: '2px solid red', textAlign: 'center', marginBottom: '20px', width: '200px', outline: 'none', backgroundColor: 'transparent' }
  };

  return (
    <div style={styles.wrapper}>
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.welcome}>Hola, {userData?.nombreNegocio || 'Empresario'}</h1>
          <p style={styles.subWelcome}>{userData?.rubro || 'General'}</p>
        </div>
        <div style={styles.goalContainer} onClick={() => { setTempGoal(salesGoal); setIsEditingGoal(true); }}>
          <div style={styles.goalLabel}>Meta Mensual</div>
          <div style={styles.goalAmount}>S/ {salesGoal} ✏️</div>
        </div>
      </div>

      <div style={styles.mainActionContainer}>
        {/* BOTÓN 1 */}
        <button 
          style={styles.brainstormBtn} 
          onClick={() => { setShowBrainstorm(true); setHasNewTrends(false); }}
        >
          {hasNewTrends && <div style={styles.notification}>!</div>}
          <div style={styles.btnIcon}>🧠</div>
          <div style={styles.btnText}>Lluvia de<br/>Ideas</div>
        </button>

        {/* BOTÓN 2 - NUEVO */}
        <button 
          style={styles.createBtn}
          onClick={() => setShowCreate(true)}
        >
          <span style={{fontSize: '1.5rem'}}>✨</span>
          Crear Contenido Nuevo
        </button>
      </div>

      <div style={{textAlign: 'center', paddingBottom: '20px'}}>
        <button onClick={onLogout} style={{background: 'none', border: 'none', color: '#999', textDecoration: 'underline', cursor: 'pointer'}}>Cerrar Sesión</button>
      </div>

      {/* MODALES */}
      {isEditingGoal && (
        <div style={styles.editOverlay}>
          <h3>Editar Meta</h3>
          <input type="number" value={tempGoal} onChange={(e) => setTempGoal(e.target.value)} style={styles.editInput} autoFocus />
          <button onClick={handleGoalUpdate} style={{padding: '10px 30px', background: theme.colors.red, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer'}}>Guardar</button>
        </div>
      )}

      <BrainstormModal isOpen={showBrainstorm} onClose={() => setShowBrainstorm(false)} rubro={userData?.rubro} />
      
      {/* NUEVO MODAL CONECTADO */}
      <CreateContentModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
};

export default Dashboard;