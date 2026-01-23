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

  generarContenido: async (tipoOrigen, objetivo, datosInput, detallesNegocio) => {
    await new Promise(r => setTimeout(r, 2000));
    
    // Personalizamos la respuesta según el objetivo
    let intro = "";
    if (objetivo === 'viral') intro = "🚀 **Estrategia Viral:** Usaremos un audio en tendencia y cortes rápidos.";
    if (objetivo === 'venta') intro = "💰 **Estrategia de Venta:** Nos enfocaremos en la escasez y el llamado a la acción directo.";
    if (objetivo === 'valor') intro = "🎓 **Estrategia de Valor:** Educaremos al cliente para generar confianza.";

    return {
      tipo: tipoOrigen === 'referencia' ? 'Guion Adaptado' : 'Copy Creativo',
      contenido: `${intro}\n\n**Propuesta para ${detallesNegocio}:**\n\n1. **Gancho Visual:** ${datosInput.substring(0, 20)}...\n2. **Desarrollo:** Muestra el producto en uso real.\n3. **Cierre:** "Comenta YO para info".\n\n💡 **Tip Pro:** Usa buena iluminación.`
    };
  },

  registrarUsuario: async (datos) => ({ success: true }),

  // NUEVO: Ideas inteligentes por Rubro
  obtenerIdeas: async (rubro) => {
    const db = {
      'Gastronomía': [
        "📸 **Detrás de Cámara:** Muestra al chef preparando el plato más pedido en cámara rápida.",
        "🗣️ **Testimonio:** Graba la reacción genuina de un cliente al probar tu postre estrella.",
        "✨ **ASMR:** Un video solo con los sonidos de tu cocina (cortar, freír, servir). Sin música."
      ],
      'Moda': [
        "👗 **Transición:** Haz un cambio de outfit instantáneo con un chasquido de dedos.",
        "📦 **Unboxing:** Muestra cómo empacas un pedido con cuidado y detalles bonitos.",
        "💡 **Tip de Estilo:** Enseña 3 formas diferentes de usar la misma prenda."
      ],
      'Turismo': [
        "🌄 **Pov:** 'Despierta conmigo en Cusco'. Muestra la vista desde tu hotel/tour.",
        "🎒 **Checklist:** Qué llevar en la mochila para el tour de mañana.",
        "📍 **Secreto:** Muestra un rincón poco conocido de la ciudad cerca de tu negocio."
      ]
    };
    // Retorna las del rubro o unas genéricas si no coincide
    return db[rubro] || [
      "Muestra tu espacio de trabajo.",
      "Presenta a tu equipo.",
      "Cuenta la historia de cómo empezaste."
    ];
  },

  obtenerTrends: async (rubro) => {
    // Usamos videos de prueba de Google. Son horizontales, pero en el CSS
    // usamos 'object-fit: cover' para recortarlos y que parezcan verticales.
    const videos = [
      { id: 1, title: 'Trend: Naturaleza', views: '1.2M', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      { id: 2, title: 'Audio Viral: "Joy"', views: '850k', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { id: 3, title: 'Challenge: Fast', views: '2.5M', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
    ];
    return videos;
  },

  obtenerChats: async () => {
    return [
      { id: 1, nombre: 'Carlos Gomez', mensaje: 'Hola, vi el reel del postre. ¿Hacen delivery?', hora: '10:45', noLeidos: 2, avatar: '👤' },
      { id: 2, nombre: 'Maria L.', mensaje: 'Me interesa el vestido rojo, precio?', hora: '09:30', noLeidos: 1, avatar: '👩' },
      { id: 3, nombre: 'Juan Perez', mensaje: 'Gracias, ya recibí mi pedido.', hora: 'Ayer', noLeidos: 0, avatar: '👨' },
      { id: 4, nombre: 'Luisa M.', mensaje: '¿Tienen talla M disponible?', hora: 'Ayer', noLeidos: 0, avatar: '👩' }
    ];
  }
};