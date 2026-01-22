import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { api } from '../services/api';
import miloLogo from '../assets/milo-logo.png'; // Asegúrate de importar el logo

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
    overlay: { 
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, 
      display: 'flex', justifyContent: 'center', alignItems: 'end' 
    },
    container: { 
      width: '100%', height: '92%', backgroundColor: '#fff', 
      borderTopLeftRadius: '30px', borderTopRightRadius: '30px', 
      padding: '25px', display: 'flex', flexDirection: 'column', 
      animation: 'slideUp 0.3s ease-out', boxSizing: 'border-box' 
    },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '1.5rem', fontWeight: '900', color: theme.colors.red, margin: 0 },
    closeBtn: { background: 'none', border: 'none', fontSize: '2rem', color: theme.colors.dark, cursor: 'pointer' },
    tabs: { display: 'flex', marginBottom: '20px', backgroundColor: '#f5f5f5', borderRadius: '15px', padding: '5px' },
    tab: (isActive) => ({ 
      flex: 1, padding: '12px', textAlign: 'center', borderRadius: '12px', 
      backgroundColor: isActive ? '#fff' : 'transparent', 
      color: isActive ? theme.colors.red : '#888', 
      fontWeight: 'bold', cursor: 'pointer', 
      boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.05)' : 'none', 
      transition: 'all 0.2s' 
    }),
    content: { flex: 1, overflowY: 'auto', paddingBottom: '20px' },
    ideaCard: { 
      backgroundColor: '#fff', padding: '20px', borderRadius: '18px', marginBottom: '15px', 
      border: `1px solid #eee`, boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
      color: theme.colors.dark, fontSize: '0.95rem', lineHeight: '1.6' 
    },
    videoCard: {
      position: 'relative', borderRadius: '20px', overflow: 'hidden',
      marginBottom: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      backgroundColor: '#000', minHeight: '200px'
    },
    videoPlayer: {
      width: '100%',
      height: '450px', 
      objectFit: 'cover', // ESTO ES CLAVE: Recorta el video horizontal para llenar la pantalla vertical
      display: 'block',
      backgroundColor: '#000'
    },
    videoOverlay: {
      position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
      color: 'white', boxSizing: 'border-box'
    },
    viewsBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px 10px',
      borderRadius: '10px', fontSize: '0.8rem', backdropFilter: 'blur(5px)',
      display: 'inline-block', marginBottom: '8px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>💡 Inspiración</h2>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>
        <div style={styles.tabs}>
          <div style={styles.tab(activeTab === 'ideas')} onClick={() => setActiveTab('ideas')}>📝 Ideas</div>
          <div style={styles.tab(activeTab === 'trends')} onClick={() => setActiveTab('trends')}>🔥 Trends</div>
        </div>
        <div style={styles.content} className="hide-scrollbar">
          {activeTab === 'ideas' ? (
            ideas.map((idea, i) => (
              <div key={i} style={styles.ideaCard}>
                <div dangerouslySetInnerHTML={{ __html: idea.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            ))
          ) : (
            trends.map((trend) => (
              <div key={trend.id} style={styles.videoCard}>
                <video 
                  src={trend.url} 
                  style={styles.videoPlayer} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  onError={(e) => {
                    e.target.style.display = 'none'; // Oculta el video roto
                    e.target.parentElement.style.backgroundColor = '#333'; // Pone fondo gris
                  }}
                />
                <div style={styles.videoOverlay}>
                  <div style={styles.viewsBadge}>👁 {trend.views} vistas</div>
                  <div style={{fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '5px'}}>{trend.title}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
};

// --- MODAL CREAR CONTENIDO (Multistep) ---
const CreateContentModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [sourceType, setSourceType] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
  
    if (!isOpen) return null;
  
    const handleNext = async () => {
      if (step === 2) { setStep(3); } 
      else if (step === 3) {
        setLoading(true);
        const generated = await api.generarContenido(sourceType, inputValue, details);
        setResult(generated);
        setLoading(false);
        setStep(4);
      }
    };
  
    const reset = () => { setStep(1); setSourceType(null); setInputValue(''); setDetails(''); setResult(null); onClose(); };
  
    const styles = {
      overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff', zIndex: 2000, padding: '25px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' },
      header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingTop: '20px' },
      title: { fontSize: '1.4rem', fontWeight: '900', color: theme.colors.dark, margin: 0 },
      closeBtn: { background: 'none', border: 'none', fontSize: '2rem', color: '#333', cursor: 'pointer' },
      selectionCard: { padding: '25px', borderRadius: '18px', border: '1px solid #eee', backgroundColor: '#FAFAFA', textAlign: 'center', cursor: 'pointer', marginBottom: '15px', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
      textArea: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '1rem', height: '120px', marginBottom: '20px', boxSizing: 'border-box', fontFamily: 'inherit', backgroundColor: '#fff' },
      btnPrimary: { width: '100%', padding: '18px', backgroundColor: theme.colors.dark, color: 'white', border: 'none', borderRadius: '14px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' },
      resultBox: { backgroundColor: '#F9F1E2', padding: '20px', borderRadius: '15px', border: `1px solid ${theme.colors.cream}`, flex: 1, marginBottom: '20px', whiteSpace: 'pre-wrap', color: theme.colors.dark }
    };
  
    return (
      <div style={styles.overlay}>
        <div style={styles.header}>
          <h2 style={styles.title}>{step === 1 ? "Crear Nuevo" : step === 4 ? "Resultado IA" : "Paso " + step}</h2>
          <button onClick={reset} style={styles.closeBtn}>&times;</button>
        </div>
        
        {step === 1 && (
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div style={styles.selectionCard} onClick={() => { setSourceType('referencia'); setStep(2); }}>
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🔗</div>
              <div style={{fontWeight: 'bold', color: theme.colors.dark}}>Desde Referencia</div>
            </div>
            <div style={styles.selectionCard} onClick={() => { setSourceType('idea'); setStep(2); }}>
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🧠</div>
              <div style={{fontWeight: 'bold', color: theme.colors.dark}}>Desde Idea</div>
            </div>
          </div>
        )}
        
        {(step === 2 || step === 3) && (
            <div style={{flex: 1}}>
                <p style={{marginBottom: '15px', color: '#666'}}>
                    {step === 2 ? (sourceType === 'referencia' ? "Pega el link del video:" : "Escribe tu idea:") : "Detalles de tu negocio:"}
                </p>
                <textarea 
                    style={styles.textArea} 
                    value={step === 2 ? inputValue : details} 
                    onChange={(e) => step === 2 ? setInputValue(e.target.value) : setDetails(e.target.value)}
                    placeholder="..."
                />
                <button style={styles.btnPrimary} onClick={handleNext}>{loading ? 'Pensando...' : 'Siguiente'}</button>
            </div>
        )}

        {step === 4 && result && (
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
             <h3 style={{margin: '0 0 10px 0', color: theme.colors.red}}>{result.tipo}</h3>
             <div style={styles.resultBox}>{result.contenido}</div>
             <button style={styles.btnPrimary} onClick={reset}>Finalizar</button>
          </div>
        )}
      </div>
    );
};

// --- DASHBOARD PRINCIPAL (REDISEÑADO) ---
const Dashboard = ({ onLogout, userData, initialGoal }) => {
  const [salesGoal, setSalesGoal] = useState(initialGoal || '0');
  const [showBrainstorm, setShowBrainstorm] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [hasNewTrends, setHasNewTrends] = useState(true);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(salesGoal);

  const handleGoalUpdate = () => { setSalesGoal(tempGoal); setIsEditingGoal(false); };

  const styles = {
    // FONDO GENERAL
    wrapper: { position: 'relative', width: '100%', height: '100%', backgroundColor: '#FAFAFA', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
    
    // HEADER AJUSTADO
    headerBg: {
      backgroundColor: theme.colors.cream,
      // Reduje un poco el padding inferior para compensar el logo más grande
      padding: '50px 25px 25px 25px', 
      borderBottomLeftRadius: '35px',
      borderBottomRightRadius: '35px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
    },
    topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    
    // LOGO MÁS GRANDE
    logo: { 
      height: '50px', // Aumentado de 30px a 50px
      objectFit: 'contain',
      display: 'block' 
    },
    welcomeText: { fontSize: '1.4rem', fontWeight: '900', color: theme.colors.dark, margin: 0 },
    subWelcome: { fontSize: '0.9rem', color: '#888', margin: 0 },

    // TARJETA DE OBJETIVO (Integrada visualmente)
    goalCard: {
      backgroundColor: 'white',
      padding: '15px 20px',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      cursor: 'pointer'
    },
    goalLabel: { fontSize: '0.75rem', fontWeight: 'bold', color: '#999', textTransform: 'uppercase' },
    goalValue: { fontSize: '1.2rem', fontWeight: '900', color: theme.colors.red },

    // 2. CONTENIDO PRINCIPAL (GRID)
    mainContent: { flex: 1, padding: '30px 25px', display: 'flex', flexDirection: 'column', gap: '20px' },
    sectionTitle: { fontSize: '1rem', fontWeight: 'bold', color: '#333', marginBottom: '15px' },
    
    // TARJETAS DE ACCIÓN (En lugar de botones sueltos)
    actionCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.03)',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      position: 'relative',
      border: '1px solid #f0f0f0'
    },
    actionIconBox: (color) => ({
      width: '60px', height: '60px', borderRadius: '15px', backgroundColor: color, 
      display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8rem', color: 'white',
      boxShadow: `0 8px 15px ${color}40` // Sombra de color
    }),
    actionTextGroup: { flex: 1 },
    actionTitle: { fontSize: '1.1rem', fontWeight: 'bold', color: theme.colors.dark, margin: '0 0 5px 0' },
    actionDesc: { fontSize: '0.8rem', color: '#888', margin: 0 },
    
    // Notificación
    notificationDot: { position: 'absolute', top: '20px', right: '20px', width: '12px', height: '12px', backgroundColor: '#FFD700', borderRadius: '50%', border: '2px solid white' },

    editOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.98)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0' },
    editInput: { fontSize: '2rem', border: 'none', borderBottom: '2px solid red', textAlign: 'center', marginBottom: '20px', width: '200px', outline: 'none', backgroundColor: 'transparent' }
  };

  return (
    <div style={styles.wrapper}>
      
      {/* HEADER ELEGANTE */}
      <div style={styles.headerBg}>
        <div style={styles.topBar}>
           {/* LOGO AQUÍ */}
           <img src={miloLogo} alt="Milo" style={styles.logo} />
           <button onClick={onLogout} style={{background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', color: theme.colors.red, cursor: 'pointer'}}>Salir</button>
        </div>
        
        <div>
          <h1 style={styles.welcomeText}>Hola, {userData?.nombreNegocio || 'Socio'}</h1>
          <p style={styles.subWelcome}>{userData?.rubro || 'General'}</p>
        </div>

        {/* TARJETA DE OBJETIVO */}
        <div style={styles.goalCard} onClick={() => { setTempGoal(salesGoal); setIsEditingGoal(true); }}>
          <div>
            <div style={styles.goalLabel}>Objetivo Mensual</div>
            <div style={{fontSize: '0.8rem', color: '#bbb'}}>Toca para editar</div>
          </div>
          <div style={styles.goalValue}>S/ {salesGoal}</div>
        </div>
      </div>

      {/* ZONA DE ACCIONES */}
      <div style={styles.mainContent}>
        <div style={styles.sectionTitle}>Panel de Control</div>

        {/* TARJETA 1: LLUVIA DE IDEAS */}
        <div 
          style={styles.actionCard} 
          onClick={() => { setShowBrainstorm(true); setHasNewTrends(false); }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {hasNewTrends && <div style={styles.notificationDot}></div>}
          <div style={styles.actionIconBox(theme.colors.red)}>🧠</div>
          <div style={styles.actionTextGroup}>
            <h3 style={styles.actionTitle}>Inspiración</h3>
            <p style={styles.actionDesc}>Descubre ideas y trends virales para hoy.</p>
          </div>
          <div style={{color: '#ddd', fontSize: '1.5rem'}}>›</div>
        </div>

        {/* TARJETA 2: CREAR CONTENIDO */}
        <div 
          style={styles.actionCard}
          onClick={() => setShowCreate(true)}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={styles.actionIconBox(theme.colors.dark)}>✨</div>
          <div style={styles.actionTextGroup}>
            <h3 style={styles.actionTitle}>Producir</h3>
            <p style={styles.actionDesc}>Genera guiones y copys con IA.</p>
          </div>
          <div style={{color: '#ddd', fontSize: '1.5rem'}}>›</div>
        </div>

      </div>

      {/* MODALES */}
      {isEditingGoal && (
        <div style={styles.editOverlay}>
          <h3>Editar Meta</h3>
          <input type="number" value={tempGoal} onChange={(e) => setTempGoal(e.target.value)} style={styles.editInput} autoFocus />
          <button onClick={handleGoalUpdate} style={{padding: '12px 30px', background: theme.colors.red, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold'}}>Guardar Cambios</button>
        </div>
      )}

      <BrainstormModal isOpen={showBrainstorm} onClose={() => setShowBrainstorm(false)} rubro={userData?.rubro} />
      <CreateContentModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
};

export default Dashboard;