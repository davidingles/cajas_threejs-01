/**
 * Configuración del visor.
 *
 * Cambia aquí los valores y recarga la página: no hace falta tocar nada más.
 */
export const CONFIG = {
  /**
   * Modelo a mostrar.
   *
   * Con `url` en null se muestra el cubo de prueba. Cambia la ruta cuando
   * quieras otro archivo; por ejemplo `./models/otra_caja.glb`.
   *
   * También puedes arrastrar un .glb sobre la página o usar el botón
   * «Abrir .glb» para previsualizarlo sin tocar el código.
   */
  model: {
    url: './models/caja_04.glb',
    castShadow: true,
    receiveShadow: true,

    /**
     * El archivo de la caja trae su propio juego de 3 luces de estudio
     * (clave, recorte y relleno). Se ignoran por defecto y se usa la
     * iluminación del visor: así la luz se queda fija mientras la caja gira
     * y se aprecia mucho mejor el volumen.
     *
     * Ponlo en `true` para usar la iluminación original de Blender.
     */
    useEmbeddedLights: false,
  },

  /** Giro suave y automático sobre su propio eje vertical. */
  rotation: {
    enabled: true,
    speed: 0.4, // radianes por segundo (~23°/s)
  },

  /** Cubo provisional mientras no hay modelo .glb. */
  placeholder: {
    size: 1.6,
    color: 0x4f8cff,
  },

  camera: {
    fov: 45,
    /** Margen alrededor del modelo al encuadrar (1 = muy justo). */
    fitPadding: 1.55,
  },

  /** Sensibilidad de los controles de órbita (ratón y táctil). */
  controls: {
    rotateSpeed: 0.85,
    zoomSpeed: 0.9,
    panSpeed: 0.8,
    dampingFactor: 0.06,
  },

  /** Fondo degradado del lienzo. */
  background: {
    top: '#1b2440',
    bottom: '#070910',
  },

  /** Rejilla tenue de referencia en el suelo. */
  grid: true,
};
