import React, { useState, useEffect, useRef } from 'react';
import { theme } from '../styles/theme';
import { api } from '../services/api';

// --- COMPONENTE MODAL INTERNO ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', // Fondo oscuro para resaltar
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '400px',
        position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <button 
          onClick={onClose} 
          style={{position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', fontSize: '1.8rem', cursor: 'pointer', color: theme.colors.dark, fontWeight: 'bold'}}
        >
          &times;
        </button>
        <h3 style={{marginTop: 0, color: theme.colors.red, fontSize: '1.5rem', borderBottom: `1px solid ${theme.colors.red}`, paddingBottom: '10px'}}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

const Dashboard = ({ onLogout, userData }) => {
  const negocio = userData?.nombreNegocio || "Mi Negocio";
  const rubro = userData?.rubro || "Gastronomía";
  const ciudad = userData?.ciudad || "Cusco";

  // --- ESTADOS DE ECONOMÍA ---
  const [saldo, setSaldo] = useState(120.50);
  const [tokens, setTokens] = useState(50); // Iniciamos con pocos tokens para probar la mecánica
  const COSTO_POR_MENSAJE = 20; // Costo por uso de IA
  const RATIO_RECARGA = 10; // 1 Sol recargado = 10 Tokens de regalo

  const [movimientos, setMovimientos] = useState([]);
  
  // --- ESTADOS DE CHAT ---
  const [mensajes, setMensajes] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // --- ESTADOS DE MODALES ---
  const [showYapeModal, setShowYapeModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [montoRecarga, setMontoRecarga] = useState(50);

  const chatEndRef = useRef(null);

  useEffect(() => {
    api.getMovimientosWallet().then(data => setMovimientos(data));
    setMensajes([{ 
      id: 0, 
      sender: 'bot', 
      text: `Hola, soy tu Director de Marketing. Tienes ${tokens} créditos disponibles. ¿En qué trabajamos hoy?` 
    }]);
  }, [negocio, ciudad]); // eslint-disable-line

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  // --- LÓGICA DE CHAT CON TOKENS ---
  const handleOpcionChat = async (opcion) => {
    // 1. Validar Tokens
    if (tokens < COSTO_POR_MENSAJE) {
      alert("🚫 Sin créditos suficientes. Recarga tu Ad-Wallet para obtener más.");
      return; 
    }

    // 2. Descontar Tokens
    setTokens(prev => prev - COSTO_POR_MENSAJE);

    // 3. Flujo Normal de Chat
    const nuevoMsgUser = { id: Date.now(), sender: 'user', text: opcion };
    setMensajes(prev => [...prev, nuevoMsgUser]);
    setIsTyping(true);

    const respuestaTexto = await api.enviarMensajeIA(opcion, rubro);
    
    const nuevoMsgBot = { id: Date.now() + 1, sender: 'bot', text: respuestaTexto };
    setMensajes(prev => [...prev, nuevoMsgBot]);
    setIsTyping(false);
  };

  // --- LÓGICA DE RECARGA + BONIFICACIÓN DE TOKENS ---
  const confirmarRecarga = () => {
    const monto = Number(montoRecarga);
    const bonusTokens = monto * RATIO_RECARGA; // Calculamos tokens ganados

    // Actualizamos Saldo
    setSaldo(prev => prev + monto);
    
    // Actualizamos Tokens (Gamificación)
    setTokens(prev => prev + bonusTokens);

    const nuevaTransaccion = {
      id: Date.now(),
      tipo: 'ingreso',
      descripcion: 'Recarga Yape',
      monto: monto,
      fecha: 'Ahora mismo'
    };
    setMovimientos(prev => [nuevaTransaccion, ...prev]);
    setShowYapeModal(false);
    
    // Mensaje de éxito enfocado en el beneficio
    alert(`¡Éxito! Recargaste S/ ${monto} y ganaste ${bonusTokens} Créditos IA.`);
  };

  const styles = {
    mainWrapper: { width: '100vw', minHeight: '100vh', backgroundColor: theme.colors.cream, display: 'flex', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' },
    contentContainer: { width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: `2px solid rgba(227, 27, 35, 0.1)` },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' },
    
    // CHAT
    chatContainer: { backgroundColor: theme.colors.white, borderRadius: '20px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', gridColumn: 'span 2', display: 'flex', flexDirection: 'column', height: '600px', position: 'relative' },
    chatHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' },
    tokenBadge: { backgroundColor: theme.colors.dark, color: '#FFD700', padding: '5px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.9rem', border: '1px solid #FFD700' },
    
    chatWindow: { flex: 1, overflowY: 'auto', marginBottom: '15px', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '15px' },
    bubbleBot: { alignSelf: 'flex-start', backgroundColor: '#F3F4F6', color: theme.colors.dark, padding: '15px', borderRadius: '15px 15px 15px 0', maxWidth: '80%', lineHeight: '1.5', whiteSpace: 'pre-wrap', border: '1px solid #ddd' },
    bubbleUser: { alignSelf: 'flex-end', backgroundColor: theme.colors.red, color: 'white', padding: '12px 20px', borderRadius: '15px 15px 0 15px', maxWidth: '70%', fontWeight: '500' },
    
    // ESTADO "SIN TOKENS"
    noTokensOverlay: { padding: '20px', backgroundColor: '#FFEBEB', border: `2px solid ${theme.colors.red}`, borderRadius: '10px', textAlign: 'center' },
    noTokensTitle: { color: theme.colors.red, fontWeight: '900', fontSize: '1.1rem', marginBottom: '5px' },
    noTokensText: { color: theme.colors.dark, fontSize: '0.9rem', marginBottom: '10px', fontWeight: 'bold' },
    
    // BOTONES CHAT
    optionsContainer: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    optionButton: { flex: 1, padding: '12px', borderRadius: '10px', border: `2px solid ${theme.colors.red}`, backgroundColor: 'white', color: theme.colors.red, fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', minWidth: '120px' },
    
    // WALLET
    walletCard: { backgroundColor: theme.colors.white, borderRadius: '20px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', height: 'fit-content' },
    transactionRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #333', fontSize: '0.9rem' },
    cityBadge: { backgroundColor: theme.colors.dark, color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '10px', display: 'inline-block', verticalAlign: 'middle' },
    
    // MODAL YAPE
    qrPlaceholder: { width: '150px', height: '150px', backgroundColor: '#ddd', margin: '20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #333', borderRadius: '10px', color: theme.colors.dark, fontWeight: '900' },
    inputContainer: { display: 'flex', alignItems: 'center', border: '2px solid #333', borderRadius: '8px', marginBottom: '10px', overflow: 'hidden' },
    currencySymbol: { backgroundColor: '#333', color: 'white', padding: '10px 15px', fontWeight: 'bold', fontSize: '1.2rem' },
    inputMonto: { width: '100%', padding: '10px', fontSize: '1.2rem', border: 'none', outline: 'none', color: theme.colors.white, fontWeight: 'bold' },
    btnConfirmar: { width: '100%', padding: '15px', backgroundColor: theme.colors.yape, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' },
    bonusText: { textAlign: 'center', color: 'green', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' },

    logoutButton: { background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: theme.colors.red, fontWeight: 'bold', fontSize: '1rem' }
  };

  return (
    <div style={styles.mainWrapper}>
      <div style={styles.contentContainer}>
        
        <header style={styles.header}>
          <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <h2 style={{margin: 0, color: theme.colors.red, fontSize: '1.8rem'}}>{negocio}</h2>
              <span style={styles.cityBadge}>📍 {ciudad}</span>
            </div>
            <p style={{margin: '5px 0 0 0', color: theme.colors.dark, fontSize: '0.9rem'}}>Panel de Control • {rubro}</p>
          </div>
          <button onClick={onLogout} style={styles.logoutButton}>Salir</button>
        </header>

        <div style={styles.grid}>
          
          {/* SECCIÓN 1: CHAT IA CON SISTEMA DE TOKENS */}
          <div style={styles.chatContainer}>
            
            {/* Cabecera del Chat con Contador */}
            <div style={styles.chatHeader}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.colors.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', marginRight: '10px'}}>IA</div>
                <div>
                  <h3 style={{margin: 0, fontSize: '1.1rem', color: theme.colors.red}}>Asistente Milo</h3>
                  <p style={{margin: 0, fontSize: '0.8rem', color: theme.colors.dark, fontWeight: 'bold'}}>● En línea</p>
                </div>
              </div>
              {/* INDICADOR DE CRÉDITOS */}
              <div style={styles.tokenBadge}>
                ⚡ {tokens} Créditos
              </div>
            </div>

            <div style={styles.chatWindow}>
              {mensajes.map((msg) => (
                <div key={msg.id} style={msg.sender === 'bot' ? styles.bubbleBot : styles.bubbleUser}>
                  {msg.text}
                </div>
              ))}
              {isTyping && <div style={{...styles.bubbleBot, fontStyle: 'italic'}}>Generando estrategia...</div>}
              <div ref={chatEndRef} />
            </div>

            {/* ZONA DE ACCIONES: SE BLOQUEA SI NO HAY TOKENS */}
            {tokens >= COSTO_POR_MENSAJE ? (
              <div style={styles.optionsContainer}>
                <button style={styles.optionButton} onClick={() => handleOpcionChat('Idea de Video')} disabled={isTyping}>🎥 Idea Video (-20)</button>
                <button style={styles.optionButton} onClick={() => handleOpcionChat('Texto para Redes')} disabled={isTyping}>✍️ Copy (-20)</button>
                <button style={styles.optionButton} onClick={() => handleOpcionChat('Tendencia')} disabled={isTyping}>📈 Tendencia (-20)</button>
              </div>
            ) : (
              // MENSAJE DE BLOQUEO OSCURO Y CLARO
              <div style={styles.noTokensOverlay}>
                <div style={styles.noTokensTitle}>⚠️ CRÉDITOS AGOTADOS</div>
                <div style={styles.noTokensText}>
                  Necesitas recargar tu Ad-Wallet para seguir usando la IA.
                </div>
                <button 
                  onClick={() => setShowYapeModal(true)}
                  style={{...styles.btnConfirmar, padding: '10px', fontSize: '0.9rem'}}
                >
                  Recargar Ahora y Ganar Créditos
                </button>
              </div>
            )}
          </div>

          {/* SECCIÓN 2: AD-WALLET */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            
            <div style={styles.walletCard}>
              <h3 style={{margin: 0, color: theme.colors.dark, fontSize: '1.1rem'}}>Saldo Disponible</h3>
              <p style={{fontSize: '3rem', fontWeight: '800', margin: '10px 0', color: theme.colors.dark}}>
                S/ {saldo.toFixed(2)}
              </p>
              <button 
                onClick={() => setShowYapeModal(true)}
                style={{width: '100%', padding: '15px', backgroundColor: theme.colors.yape, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}
              >
                <span>📲</span> Recargar con Yape
              </button>
            </div>

            <div style={styles.walletCard}>
              <h3 style={{margin: '0 0 15px 0', fontSize: '1.1rem', color: theme.colors.dark}}>Últimos Movimientos</h3>
              {movimientos.slice(0, 3).map((mov) => (
                <div key={mov.id} style={styles.transactionRow}>
                  <div>
                    <div style={{fontWeight: 'bold', color: theme.colors.dark}}>{mov.descripcion}</div>
                    <div style={{fontSize: '0.8rem', color: theme.colors.dark}}>{mov.fecha}</div>
                  </div>
                  <div style={{fontWeight: 'bold', color: mov.tipo === 'ingreso' ? 'green' : theme.colors.red}}>
                    {mov.tipo === 'ingreso' ? '+' : ''} S/ {Math.abs(mov.monto).toFixed(2)}
                  </div>
                </div>
              ))}
              <div 
                onClick={() => setShowReportModal(true)}
                style={{textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: theme.colors.red, cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline'}}
              >
                Ver reporte completo
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- MODAL DE YAPE/PLIN --- */}
      <Modal isOpen={showYapeModal} onClose={() => setShowYapeModal(false)} title="Recarga Rápida">
        <p style={{textAlign: 'center', color: theme.colors.dark, fontWeight: 'bold'}}>
          Escanea el QR o yapea al <strong>999-000-123</strong>
        </p>
        <div style={styles.qrPlaceholder}>[ CÓDIGO QR ]</div>
        
        <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', color: theme.colors.dark}}>
          Monto a recargar:
        </label>
        
        <div style={styles.inputContainer}>
          <div style={styles.currencySymbol}>S/.</div>
          <input 
            type="number" 
            value={montoRecarga} 
            onChange={(e) => setMontoRecarga(e.target.value)}
            style={styles.inputMonto}
          />
        </div>

        {/* MENSAJE DE INCENTIVO */}
        <div style={styles.bonusText}>
          🎁 Bono: Recibirás {Number(montoRecarga) * RATIO_RECARGA} Créditos IA extra
        </div>
        
        <button style={styles.btnConfirmar} onClick={confirmarRecarga}>
          Confirmar "Ya Yapeé"
        </button>
      </Modal>

      {/* --- MODAL DE REPORTE --- */}
      <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)} title="Reporte Financiero">
        <div style={{maxHeight: '300px', overflowY: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{textAlign: 'left', borderBottom: '2px solid #333'}}>
                <th style={{padding: '10px', color: theme.colors.dark}}>Fecha</th>
                <th style={{padding: '10px', color: theme.colors.dark}}>Concepto</th>
                <th style={{padding: '10px', color: theme.colors.dark}}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((mov) => (
                <tr key={mov.id} style={{borderBottom: '1px solid #ccc'}}>
                  <td style={{padding: '10px', fontSize: '0.9rem', color: theme.colors.dark}}>{mov.fecha}</td>
                  <td style={{padding: '10px', fontSize: '0.9rem', color: theme.colors.dark}}>{mov.descripcion}</td>
                  <td style={{padding: '10px', fontWeight: 'bold', color: mov.tipo === 'ingreso' ? 'green' : theme.colors.red}}>
                    {mov.tipo === 'ingreso' ? '+' : ''} {Math.abs(mov.monto).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{marginTop: '20px', width: '100%', padding: '12px', backgroundColor: theme.colors.dark, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>
            Descargar PDF (Simulado)
          </button>
        </div>
      </Modal>

    </div>
  );
};

export default Dashboard;