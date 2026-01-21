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
  }
};  