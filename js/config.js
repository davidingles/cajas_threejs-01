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
    url: './models/caja_02.glb',
    castShadow: true,
    receiveShadow: true,

    /**
     * Algunos .glb traen su propio juego de luces (clave, recorte y relleno).
     * Se ignoran por defecto y se usa la iluminación del visor: así la luz se
     * queda fija mientras la caja gira y se aprecia mucho mejor el volumen.
     *
     * Ponlo en `true` para respetar la iluminación original de Blender.
     */
    useEmbeddedLights: false,
  },

  /** Calidad de dibujado: más alto = más nitidez a cambio de más GPU. */
  quality: {
    /** Límite del factor de píxel (densidad de pantalla). 2 = pantallas retina. */
    maxPixelRatio: 2,
    /** Resolución del mapa de sombras. 2048 da un borde nítido y suave. */
    shadowMapSize: 2048,
    /** Filtrado anisotrópico de las texturas. 'auto' = el máximo del equipo. */
    anisotropy: 'auto',
  },

  /**
   * Ajuste de materiales para que se vean realistas.
   *
   * El cartón es un material dieléctrico (no metálico) y bastante mate. Con
   * los valores que trae el archivo, el metal brilla de más y el cartón parece
   * plástico; aquí se corrige. Solo se tocan los materiales sin mapa de metal
   * o de rugosidad, para no pisar los que sí los traen.
   */
  materials: {
    /** Quita el metal de los materiales: el cartón no refleja como el metal. */
    forceDielectric: true,
    /** Rango al que se lleva la rugosidad (0 = espejo, 1 = totalmente mate). */
    roughnessRange: [0.62, 0.92],
    /** Multiplicador de los reflejos del entorno sobre el modelo. */
    envMapIntensity: 1,
  },

  /**
   * Plegado de la caja.
   *
   * El .glb guarda la caja desplegada (una plancha plana) y trae un esqueleto
   * con un hueso por panel y por solapa. Aquí se gira cada hueso hasta montar
   * la caja con la cara impresa hacia fuera: los paneles levantan las paredes
   * y las solapas de abajo cierran el fondo.
   *
   * Cada hueso admite giros sobre sus ejes locales (`x`, `y`, `z`) en grados,
   * aplicados en orden. Los nombres que no existan en el archivo se ignoran.
   * Ponlo en `null` para ver la plancha tal cual viene.
   */
  pose: {
    // Deja la abertura (las solapas de arriba) mirando hacia arriba.
    Bone_Raiz: [['x', 90]],

    // Paredes: cada panel gira sobre la arista que comparte con el anterior.
    Panel_Lateral_Izq: [['y', -90]],
    Panel_Lateral_Der: [['y', 90]],
    Panel_Trasera: [['y', 90]],
    Solapa_Encolado: [['y', -90]],

    // Fondo: las cuatro solapas de abajo cerradas.
    Solapa_Inf_Frente: [['y', 90]],
    Solapa_Inf_Trasera: [['y', 90]],
    Solapa_Inf_Lat_Izq: [['y', 90]],
    Solapa_Inf_Lat_Der: [['y', 90]],

    // Las solapas de arriba (Solapa_Sup_*) las controla el usuario: ver `flaps`.
  },

  /**
   * Solapas de arriba: las que el usuario abre y cierra.
   *
   * Cada entrada indica su hueso y los grados de giro (sobre el eje local
   * `axis`) que corresponden a cerrada y a abierta. Los controles van de 0 %
   * (cerrada) a 100 % (abierta) y también admiten un valor escrito a mano.
   */
  flaps: {
    /** Eje local del hueso sobre el que se gira la solapa. */
    axis: 'y',
    /** Grados del hueso con la solapa cerrada (tapando la abertura). */
    closed: -90,
    /** Grados con la solapa abierta del todo (hacia fuera). */
    open: 45,
    /** Apertura al cargar, en % (0 = cerrada, 100 = abierta). */
    initial: 100,
    /** Las cuatro solapas y el hueso de cada una. */
    bones: [
      { id: 'frente', label: 'Frente', bone: 'Solapa_Sup_Frente' },
      { id: 'trasera', label: 'Trasera', bone: 'Solapa_Sup_Trasera' },
      { id: 'izquierda', label: 'Lateral izq.', bone: 'Solapa_Sup_Lat_Izq' },
      { id: 'derecha', label: 'Lateral der.', bone: 'Solapa_Sup_Lat_Der' },
    ],
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
    fitPadding: 1.22,
    /**
     * Dirección desde la que mira la cámara (se normaliza). Cuanto mayor es el
     * segundo valor, más se ve la cara superior: con una caja abierta conviene
     * un ángulo generoso para que se vea el interior.
     */
    direction: [0.62, 0.8, 0.95],
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
