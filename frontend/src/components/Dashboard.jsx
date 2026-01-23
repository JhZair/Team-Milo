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

const CreateContentModal = ({ isOpen, onClose, onContentCreated }) => {
  const [step, setStep] = useState(1);
  const [sourceType, setSourceType] = useState(null);
  const [objective, setObjective] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  // Lógica de avance corregida
  const handleNext = async () => {
    if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setLoading(true);
      try {
        // Simulamos la llamada a la API
        const generated = await api.generarContenido(sourceType, objective, inputValue, details);
        setResult(generated);
        
        // Restamos el token
        if (onContentCreated) onContentCreated();
        
        // AVANZAMOS AL PASO 5
        setStep(5);
      } catch (error) {
        console.error("Error generando contenido", error);
        alert("Hubo un error generando el contenido. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  const reset = () => { setStep(1); setSourceType(null); setObjective(null); setInputValue(''); setDetails(''); setResult(null); onClose(); };

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
  };

  const progressPercentage = (step / 5) * 100;

  const styles = {
    overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff', zIndex: 2000, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.2s' },
    headerContainer: { padding: '25px 25px 0 25px' },
    progressBarBg: { width: '100%', height: '6px', backgroundColor: '#eee', borderRadius: '3px', marginBottom: '20px' },
    progressBarFill: { width: `${progressPercentage}%`, height: '100%', backgroundColor: theme.colors.red, borderRadius: '3px', transition: 'width 0.3s ease' },
    navRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    stepLabel: { fontSize: '0.8rem', color: '#999', fontWeight: 'bold', textTransform: 'uppercase' },
    closeBtn: { background: 'none', border: 'none', fontSize: '2rem', color: '#333', cursor: 'pointer', lineHeight: '1' },
    title: { fontSize: '1.6rem', fontWeight: '900', color: theme.colors.dark, margin: '0 0 5px 0' },
    subtitle: { fontSize: '1rem', color: '#666', margin: 0 },
    body: { flex: 1, padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column' },
    
    // Cards y UI
    optionCard: (selected) => ({
      padding: '20px', borderRadius: '16px', border: selected ? `2px solid ${theme.colors.red}` : '1px solid #eee',
      backgroundColor: selected ? '#FFF5F5' : '#FAFAFA', marginBottom: '15px', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: '15px', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
    }),
    iconBox: { width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    cardText: { flex: 1 },
    cardTitle: { fontWeight: 'bold', fontSize: '1.1rem', color: theme.colors.dark, marginBottom: '4px' },
    cardDesc: { fontSize: '0.85rem', color: '#666' },
    radioCircle: (selected) => ({ width: '20px', height: '20px', borderRadius: '50%', border: selected ? `6px solid ${theme.colors.red}` : '2px solid #ccc', boxSizing: 'border-box' }),
    textArea: { width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid #ddd', fontSize: '1rem', height: '150px', marginBottom: '20px', boxSizing: 'border-box', fontFamily: 'inherit', backgroundColor: '#FFFFFF', color: '#1A1A1A', resize: 'none' },
    btnPrimary: { width: '100%', padding: '18px', backgroundColor: theme.colors.dark, color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
    resultContainer: { backgroundColor: '#FDF8F8', padding: '25px', borderRadius: '20px', border: `1px solid ${theme.colors.cream}`, flex: 1, marginBottom: '20px', color: theme.colors.dark, fontSize: '1rem', lineHeight: '1.6' }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.headerContainer}>
        <div style={styles.navRow}><span style={styles.stepLabel}>Paso {step} de 5</span><button onClick={reset} style={styles.closeBtn}>&times;</button></div>
        <div style={styles.progressBarBg}><div style={styles.progressBarFill}></div></div>
        <h2 style={styles.title}>{step === 1 && "Empecemos"}{step === 2 && "Objetivo"}{step === 3 && (sourceType === 'referencia' ? "Referencia" : "Tu Idea")}{step === 4 && "Detalles"}{step === 5 && "Resultado"}</h2>
        <p style={styles.subtitle}>{step === 1 && "¿En qué basamos el contenido?"}{step === 2 && "¿Qué quieres lograr con este post?"}{step === 3 && "Danos el material base."}{step === 4 && "Personaliza para tu negocio."}{step === 5 && "Aquí tienes tu guion optimizado."}</p>
      </div>

      <div style={styles.body}>
        {step === 1 && (<div style={{marginTop: '20px'}}><div style={styles.optionCard(sourceType === 'referencia')} onClick={() => { setSourceType('referencia'); setStep(2); }}><div style={styles.iconBox}>🔗</div><div style={styles.cardText}><div style={styles.cardTitle}>Tengo una Referencia</div><div style={styles.cardDesc}>Un link de TikTok, Reel o video.</div></div><div style={styles.radioCircle(sourceType === 'referencia')}></div></div><div style={styles.optionCard(sourceType === 'idea')} onClick={() => { setSourceType('idea'); setStep(2); }}><div style={styles.iconBox}>🧠</div><div style={styles.cardText}><div style={styles.cardTitle}>Tengo una Idea</div><div style={styles.cardDesc}>Un texto o borrador mental.</div></div><div style={styles.radioCircle(sourceType === 'idea')}></div></div></div>)}
        
        {step === 2 && (<div style={{marginTop: '20px'}}><div style={styles.optionCard(objective === 'viral')} onClick={() => { setObjective('viral'); setStep(3); }}><div style={styles.iconBox}>🚀</div><div style={styles.cardText}><div style={styles.cardTitle}>Viralidad</div><div style={styles.cardDesc}>Alcance masivo y entretenimiento.</div></div></div><div style={styles.optionCard(objective === 'venta')} onClick={() => { setObjective('venta'); setStep(3); }}><div style={styles.iconBox}>💰</div><div style={styles.cardText}><div style={styles.cardTitle}>Venta Directa</div><div style={styles.cardDesc}>Convertir espectadores en clientes.</div></div></div><div style={styles.optionCard(objective === 'valor')} onClick={() => { setObjective('valor'); setStep(3); }}><div style={styles.iconBox}>🎓</div><div style={styles.cardText}><div style={styles.cardTitle}>Aportar Valor</div><div style={styles.cardDesc}>Tips, educación y confianza.</div></div></div></div>)}
        
        {step === 3 && (<div style={{display: 'flex', flexDirection: 'column', height: '100%'}}><textarea style={styles.textArea} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={sourceType === 'referencia' ? "Pega aquí el link de Instagram/TikTok..." : "Escribe tu idea aquí..."} autoFocus /><button style={styles.btnPrimary} onClick={handleNext}>Siguiente Paso</button></div>)}
        
        {/* PASO 4 CON LOGICA CORREGIDA */}
        {step === 4 && (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <textarea style={styles.textArea} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ej: Quiero vender mis zapatillas modelo X, precio S/150, envío gratis..." autoFocus />
                <button style={styles.btnPrimary} onClick={handleNext} disabled={loading}>
                    {loading ? 'Generando con IA...' : '✨ Crear Contenido'}
                </button>
            </div>
        )}
        
        {step === 5 && result && (<div style={{display: 'flex', flexDirection: 'column', height: '100%'}}><div style={styles.resultContainer} dangerouslySetInnerHTML={{ __html: formatText(result.contenido) }} /><button style={{...styles.btnPrimary, backgroundColor: theme.colors.red, marginBottom: '10px'}} onClick={reset}>Copiar y Salir</button><button onClick={() => setStep(2)} style={{background: 'none', border: 'none', color: '#666', fontWeight: 'bold', cursor: 'pointer', padding: '15px'}}>Probar otra versión</button></div>)}
      </div>
    </div>
  );
};

const WhatsAppView = ({ isOpen, onClose }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (isOpen) api.obtenerChats().then(setChats);
  }, [isOpen]);

  if (!isOpen) return null;

  const styles = {
    overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff', zIndex: 3000, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.2s' },
    // Header estilo WhatsApp Business
    header: { backgroundColor: '#075E54', padding: '50px 20px 15px 20px', display: 'flex', alignItems: 'center', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' },
    backBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' },
    headerTitle: { fontSize: '1.2rem', fontWeight: 'bold' },
    list: { flex: 1, overflowY: 'auto', backgroundColor: '#f0f0f0' },
    chatItem: { display: 'flex', padding: '15px', backgroundColor: 'white', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', alignItems: 'center' },
    avatar: { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ddd', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', marginRight: '15px', color: '#555' },
    info: { flex: 1 },
    name: { fontWeight: 'bold', color: '#333', marginBottom: '5px', fontSize: '1rem' },
    msg: { color: '#666', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' },
    meta: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '50px' },
    time: { fontSize: '0.75rem', color: '#999', marginBottom: '5px' },
    badge: { backgroundColor: '#25D366', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold' }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.header}>
        <button onClick={onClose} style={styles.backBtn}>←</button>
        <div style={styles.headerTitle}>WhatsApp Business (3)</div>
      </div>
      <div style={styles.list}>
        {chats.map(chat => (
          <div key={chat.id} style={styles.chatItem} onClick={() => alert('Simulación: Abriendo chat con ' + chat.nombre)}>
            <div style={styles.avatar}>{chat.avatar}</div>
            <div style={styles.info}>
              <div style={styles.name}>{chat.nombre}</div>
              <div style={styles.msg}>{chat.noLeidos > 0 ? <strong>{chat.mensaje}</strong> : chat.mensaje}</div>
            </div>
            <div style={styles.meta}>
              <span style={{...styles.time, color: chat.noLeidos > 0 ? '#25D366' : '#999'}}>{chat.hora}</span>
              {chat.noLeidos > 0 && <span style={styles.badge}>{chat.noLeidos}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RechargeModal = ({ isOpen, onClose, onRecharge }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState(1); // 1: Planes, 2: Pago
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const planes = [
    { tokens: 10, precio: 5, label: 'Básico' },
    { tokens: 25, precio: 10, label: 'Popular', best: true },
    { tokens: 60, precio: 20, label: 'Pro' }
  ];

  const handlePayment = () => {
    setLoading(true);
    // Simula validación de Yape
    setTimeout(() => {
      setLoading(false);
      onRecharge(selectedPlan.tokens); // Añade los tokens
      setStep(1); setSelectedPlan(null); // Reset
      onClose();
    }, 2000);
  };

  const styles = {
    overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 4000, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', animation: 'fadeIn 0.2s' },
    container: { width: '90%', backgroundColor: 'white', borderRadius: '25px', padding: '25px', position: 'relative', textAlign: 'center' },
    title: { fontSize: '1.4rem', fontWeight: '900', color: theme.colors.dark, marginBottom: '5px' },
    subtitle: { fontSize: '0.9rem', color: '#666', marginBottom: '20px' },
    closeBtn: { position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' },
    
    // Grid de Planes
    plansGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
    planCard: (isActive, isBest) => ({
      padding: '15px', borderRadius: '15px', 
      border: isActive ? `2px solid ${theme.colors.yape}` : '1px solid #eee',
      backgroundColor: isActive ? '#F8F0FA' : 'white',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      cursor: 'pointer', position: 'relative'
    }),
    badge: { position: 'absolute', top: '-8px', right: '10px', backgroundColor: '#FFD700', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' },
    price: { fontSize: '1.2rem', fontWeight: '900', color: theme.colors.dark },
    
    // Área de Pago (Simulación Yape)
    yapeBox: { backgroundColor: '#742284', padding: '20px', borderRadius: '15px', color: 'white', marginTop: '10px' },
    qrPlaceholder: { width: '120px', height: '120px', backgroundColor: 'white', margin: '15px auto', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#742284', fontWeight: 'bold', border: '4px solid white' },
    btnAction: { width: '100%', padding: '15px', backgroundColor: theme.colors.dark, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        
        {step === 1 ? (
          <>
            <h2 style={styles.title}>Recargar Energía ⚡</h2>
            <p style={styles.subtitle}>Necesitas tokens para usar la IA.</p>
            <div style={styles.plansGrid}>
              {planes.map((plan) => (
                <div key={plan.tokens} style={styles.planCard(selectedPlan === plan, plan.best)} onClick={() => setSelectedPlan(plan)}>
                  {plan.best && <div style={styles.badge}>MEJOR OFERTA</div>}
                  <div style={{textAlign: 'left'}}>
                    <div style={{fontWeight: 'bold'}}>⚡ {plan.tokens} Tokens</div>
                    <div style={{fontSize: '0.8rem', color: '#666'}}>{plan.label}</div>
                  </div>
                  <div style={styles.price}>S/ {plan.precio}</div>
                </div>
              ))}
            </div>
            <button 
              style={{...styles.btnAction, opacity: selectedPlan ? 1 : 0.5}} 
              disabled={!selectedPlan}
              onClick={() => setStep(2)}
            >
              Continuar
            </button>
          </>
        ) : (
          <>
            <h2 style={styles.title}><span style={{color: '#742284'}}>Yapear</span> S/ {selectedPlan.precio}</h2>
            <p style={styles.subtitle}>Escanea para recibir {selectedPlan.tokens} tokens.</p>
            
            <div style={styles.yapeBox}>
              <div>📲 Yape a: <strong>GenioContent</strong></div>
              <div style={styles.qrPlaceholder}>[ QR YAPE ]</div>
              <div style={{fontSize: '0.8rem'}}>Espera la confirmación automática...</div>
            </div>

            <button style={styles.btnAction} onClick={handlePayment}>
              {loading ? 'Validando Pago...' : 'Ya Yapeé / Confirmar'}
            </button>
            <button style={{...styles.btnAction, backgroundColor: 'transparent', color: '#999', marginTop: '0', padding: '10px'}} onClick={() => setStep(1)}>
              Volver
            </button>
          </>
        )}
      </div>
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
  const [showChats, setShowChats] = useState(false);
  const [tokens, setTokens] = useState(5); // Empezamos con 5 para probar, luego se acaban
  const [showRecharge, setShowRecharge] = useState(false); // Modal Recarga

  const handleGoalUpdate = () => { setSalesGoal(tempGoal); setIsEditingGoal(false); };

  const handleTokenSpent = () => {
    setTokens(prev => Math.max(0, prev - 1));
  };

  // Función para recargar (viene del Modal de Recarga)
  const handleRechargeSuccess = (amount) => {
    setTokens(prev => prev + amount);
    alert(`¡Pago exitoso! Se agregaron ${amount} tokens.`);
  };

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
    editInput: { 
      fontSize: '2rem', 
      border: 'none', 
      borderBottom: '2px solid red', 
      textAlign: 'center', 
      marginBottom: '20px', 
      width: '200px', 
      outline: 'none', 
      backgroundColor: 'transparent', 
      color: '#1A1A1A' // Texto oscuro explícito
    },
    tokenBadge: {
      backgroundColor: '#fff', // Fondo blanco limpio
      color: theme.colors.dark, // Texto oscuro
      padding: '6px 14px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      border: '1px solid #e0e0e0', // Borde gris muy suave
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)', // Sombra ligera
      cursor: 'pointer',
      transition: 'all 0.2s'
    },

    plusBtn: {
      backgroundColor: '#f0f0f0',
      color: '#666',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      lineHeight: '1'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.headerBg}>
        <div style={styles.topBar}>
           <img src={miloLogo} alt="Milo" style={styles.logo} />
           
           {/* CONTADOR DE TOKENS SUTIL */}
           <div style={styles.tokenBadge} onClick={() => setShowRecharge(true)}>
             <span>⚡ {tokens}</span>
             <div style={styles.plusBtn}>+</div>
           </div>
        </div>
        {/* ... Resto del render igual ... */}
        <div>
          <h1 style={styles.welcomeText}>Hola, {userData?.nombreNegocio || 'Socio'}</h1>
          <p style={styles.subWelcome}>{userData?.rubro || 'General'}</p>
        </div>
        <div style={styles.goalCard} onClick={() => { setTempGoal(salesGoal); setIsEditingGoal(true); }}>
          <div>
            <div style={styles.goalLabel}>Objetivo Mensual</div>
            <div style={{fontSize: '0.8rem', color: '#bbb'}}>Toca para editar</div>
          </div>
          <div style={styles.goalValue}>S/ {salesGoal}</div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.sectionTitle}>Panel de Control</div>
        
        <div style={styles.actionCard} onClick={() => { setShowBrainstorm(true); setHasNewTrends(false); }}>
          {hasNewTrends && <div style={styles.notificationDot}></div>}
          <div style={styles.actionIconBox(theme.colors.red)}>🧠</div>
          <div style={styles.actionTextGroup}>
            <h3 style={styles.actionTitle}>Inspiración</h3>
            <p style={styles.actionDesc}>Descubre ideas y trends virales para hoy.</p>
          </div>
          <div style={{color: '#ddd', fontSize: '1.5rem'}}>›</div>
        </div>

        <div style={styles.actionCard} onClick={() => { if (tokens > 0) { setShowCreate(true); } else { setShowRecharge(true); } }}>
          <div style={styles.actionIconBox(theme.colors.dark)}>✨</div>
          <div style={styles.actionTextGroup}>
            <h3 style={styles.actionTitle}>Producir</h3>
            <p style={styles.actionDesc}>{tokens > 0 ? 'Genera guiones y copys con IA.' : <span style={{color: 'red', fontWeight: 'bold'}}>Sin energía. Recarga aquí.</span>}</p>
          </div>
          <div style={{color: '#ddd', fontSize: '1.5rem'}}>›</div>
        </div>

        <div style={styles.actionCard} onClick={() => setShowChats(true)}>
          <div style={styles.notificationDot}></div> 
          <div style={styles.actionIconBox('#25D366')}>💬</div>
          <div style={styles.actionTextGroup}>
            <h3 style={styles.actionTitle}>Clientes</h3>
            <p style={styles.actionDesc}>3 leads preguntando por precios.</p>
          </div>
          <div style={{color: '#ddd', fontSize: '1.5rem'}}>›</div>
        </div>
      </div>

      {isEditingGoal && (
        <div style={styles.editOverlay}>
          <h3>Editar Meta</h3>
          <input type="number" value={tempGoal} onChange={(e) => setTempGoal(e.target.value)} style={styles.editInput} autoFocus />
          <button onClick={handleGoalUpdate} style={{padding: '12px 30px', background: theme.colors.red, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold'}}>Guardar Cambios</button>
        </div>
      )}
      
      <BrainstormModal isOpen={showBrainstorm} onClose={() => setShowBrainstorm(false)} rubro={userData?.rubro} />
      <CreateContentModal isOpen={showCreate} onClose={() => setShowCreate(false)} onContentCreated={handleTokenSpent} />
      <WhatsAppView isOpen={showChats} onClose={() => setShowChats(false)} />
      <RechargeModal isOpen={showRecharge} onClose={() => setShowRecharge(false)} onRecharge={handleRechargeSuccess} />
    </div>
  );
};

export default Dashboard;