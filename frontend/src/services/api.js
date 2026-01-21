// Este archivo será el único que necesites modificar para conectar Flask
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

  // NUEVO: Datos simulados de resultados
  obtenerMetricas: async () => {
    return {
      vistas: 1250,
      clics: 84,
      costoPorClic: 0.45
    };
  },

  // NUEVO: Generador de links de WhatsApp
  generarLinkCierre: async (producto) => {
    return `https://wa.me/51999999999?text=Hola, vi tu video sobre ${producto} y quiero pedirlo.`;
  }
};  