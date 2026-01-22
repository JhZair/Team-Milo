export const api = {
  // Simulación de consulta a MySQL
  getSaldo: async (usuarioId) => {
    return 0.00; 
  },
  
  // Simulación de recarga en Ad-Wallet
  recargarSaldo: async (monto) => {
    console.log(`Petición al backend: Recarga de S/ ${monto}`);
    return true;
  },

  // Simulación de respuesta de la IA proactiva
  generarGuion: async (rubro) => {
    return {
      estrategia: "Atracción Proactiva",
      contenido: "¡Hola! Hoy la tendencia es mostrar el proceso de preparación. Graba un video de 10 segundos de tu producto estrella en primer plano."
    };
  },

  getSaldo: async () => 0.00,
  recargarSaldo: async () => true,
  generarGuion: async () => ({
    estrategia: "Atracción Proactiva",
    contenido: "¡Hola! Hoy la tendencia es mostrar el proceso de preparación. Graba un video de 10 segundos de tu producto estrella en primer plano."
  }),

  obtenerMetricas: async () => {
    return {
      vistas: 1250,
      clics: 84,
      costoPorClic: 0.45
    };
  },

  generarLinkCierre: async (producto) => {
    return `https://wa.me/51999999999?text=Hola, vi tu video sobre ${producto} y quiero pedirlo.`;
  },

  registrarUsuario: async (datos) => {
    console.log("Registrando usuario en Backend:", datos);
    // Aquí iría la llamada POST a Flask /api/usuario/crear
    return { success: true, id: 123 };
  },
  
  // Asegúrate de mantener las funciones anteriores aquí abajo...
  getSaldo: async () => 0.00,
  recargarSaldo: async () => true,
  generarGuion: async (rubro) => {
    // Podemos personalizar el guion según el rubro elegido en el registro
    const estrategias = {
      'Gastronomía': "Muestra el vapor saliendo de tu plato estrella.",
      'Moda': "Haz un 'Get Ready With Me' usando tu nueva colección.",
      'Turismo': "Muestra un testimonio de un cliente feliz en Machu Picchu.",
      'default': "Cuenta la historia de cómo iniciaste tu negocio."
    };
    return {
      estrategia: "Tendencia Local Detectada",
      contenido: `¡Hola! Para tu rubro, hoy funciona esto: ${estrategias[rubro] || estrategias['default']}`
    };
  },
  obtenerMetricas: async () => ({ vistas: 1250, clics: 84 }),
  generarLinkCierre: async () => "https://wa.me/51999...",
  registrarUsuario: async (datos) => ({ success: true }),
  recargarSaldo: async () => true,
  obtenerMetricas: async () => ({ vistas: 1250, clics: 84 }),
  generarLinkCierre: async () => "https://wa.me/51999...",

  // NUEVO: Historial de la Billetera
  getMovimientosWallet: async () => {
    return [
      { id: 1, tipo: 'ingreso', descripcion: 'Recarga Yape', monto: 50.00, fecha: 'Hoy, 10:30 AM' },
      { id: 2, tipo: 'egreso', descripcion: 'Campaña Meta Ads (Día 1)', monto: -12.50, fecha: 'Ayer' },
      { id: 3, tipo: 'egreso', descripcion: 'Campaña Meta Ads (Día 2)', monto: -15.00, fecha: 'Hace 2 días' },
    ];
  },

  // NUEVO: Respuestas del Chat IA según el rubro
  enviarMensajeIA: async (intencion, rubro) => {
    // Simulamos "pensar"
    await new Promise(r => setTimeout(r, 1000));

    const respuestas = {
      'Idea de Video': {
        'Gastronomía': "¡Perfecto! Aquí tienes una estructura ganadora para hoy:\n\n🎥 **Concepto:** ASMR de Cocina.\n1. **Gancho (0-3s):** Primer plano cortando algo crujiente (sonido alto).\n2. **Cuerpo:** Muestra el montaje del plato en cámara rápida.\n3. **Cierre:** Tú probándolo y haciendo un gesto de aprobación.\n🎶 **Audio:** Usa 'Cooking Beats' (Tendencia #2 en Cusco).",
        'Moda': "Hagamos un '3 Outfits, 1 Prenda'.\n\n🎥 **Concepto:** Versatilidad.\n1. **Gancho:** Muestra la prenda estrella colgada sola.\n2. **Cuerpo:** Transiciones rápidas (chasquido de dedos) usándola para: Oficina, Cita y Domingo relax.\n3. **CTA:** '¿Cuál fue tu favorito? Comenta 1, 2 o 3'."
      },
      'Texto para Redes': {
        'default': "Aquí tienes un copy optimizado para ventas:\n\n'¿Sientes que te falta algo hoy? 🤔\n\nNo es casualidad, es que no has probado nuestro [Producto Estrella]. ✨\n\n🔥 Solo por hoy: 20% OFF si muestras este post.\n\n📍 Visítanos en [Dirección] o pide por DM. 🚀\n#Cusco #Emprendimiento #Oferta'"
      },
      'Tendencia': {
        'default': "📈 **Tendencia en Cusco hoy:**\nLa gente está buscando 'Planes para el fin de semana'. Aprovecha y publica una historia tipo agenda: 'Tu plan perfecto para este sábado empieza aquí'. Usa stickers de 'Tu Turno' para generar interacción."
      }
    };

    // Lógica simple para elegir respuesta o dar una genérica
    const respuestaBase = respuestas[intencion]?.[rubro] || respuestas[intencion]?.['default'] || "Claro, estoy analizando tu negocio para darte la mejor opción...";
    
    return respuestaBase;
  },

  registrarUsuario: async (datos) => ({ success: true }),

  // NUEVO: Ideas de texto
  obtenerIdeas: async (rubro) => {
    return [
      "Publica una foto del 'detrás de cámaras' de tu producto estrella.",
      "Crea una encuesta: ¿Qué sabor/color prefieren tus clientes para el viernes?",
      "Comparte la historia de tu primer cliente satisfecho.",
      "Haz un video rápido respondiendo la pregunta más frecuente que te hacen.",
      "Oferta relámpago: 'Solo por las próximas 3 horas' en historias."
    ];
  },

  // NUEVO: Trends (Simulación de TikToks/Reels)
  obtenerTrends: async (rubro) => {
    return [
      { id: 1, platform: 'TikTok', title: 'Audio Viral: "Capybara"', views: '1.2M', desc: 'Usa este audio mostrando tus productos en fila.' },
      { id: 2, platform: 'Instagram', title: 'Plantilla: "Mi día en 3 segundos"', views: '850k', desc: 'Cortes rápidos de tu proceso de trabajo.' },
      { id: 3, platform: 'TikTok', title: 'Trend: "Pedro Pedro"', views: '2.5M', desc: 'Pon a tu producto girando con este audio.' }
    ];
  },
  registrarUsuario: async (datos) => ({ success: true }),
  obtenerIdeas: async () => ["Idea 1", "Idea 2"], // (Resumido)
  obtenerTrends: async () => [{id:1, title: "Trend"}], // (Resumido)

  // NUEVO: Generador de Contenido
  generarContenido: async (tipoOrigen, datosInput, detallesNegocio) => {
    // Simulamos tiempo de "pensado"
    await new Promise(r => setTimeout(r, 2000));

    if (tipoOrigen === 'referencia') {
      return {
        tipo: 'Guion de Reel (Basado en Referencia)',
        titulo: 'Adaptación de Tendencia',
        contenido: `🎥 **Estructura Sugerida:**\n\n1. **Visual (0-3s):** ${detallesNegocio} (Tu producto) entrando en escena igual que en el video de referencia.\n2. **Audio:** Usar el mismo audio del link enviado.\n3. **Texto en pantalla:** "Cuando pruebas ${detallesNegocio} por primera vez..."\n4. **Cierre:** Muestra tu logo y una flecha al link de la bio.\n\n💡 **Tip:** Imita la iluminación del video original.`
      };
    } else {
      return {
        tipo: 'Post / Copy (Basado en Idea)',
        titulo: 'Desarrollo de tu Idea',
        contenido: `✍️ **Copy Propuesto:**\n\n"${datosInput}..."\n\nEs lo que muchos piensan, pero aquí en **${detallesNegocio}** lo hacemos realidad. ✨\n\n✅ Calidad garantizada.\n✅ Envíos a todo el país.\n\n👇 Cuéntanos si estás de acuerdo en los comentarios.\n#Emprendimiento #Cusco`
      };
    }
  }
};  