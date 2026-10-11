# Visor 3D con Three.js

Visor 3D muy sencillo hecho **solo con HTML, CSS y JavaScript**. La única
librería externa es [three.js](https://threejs.org/), cargada por CDN.

**Ver en vivo:** <https://davidingles.github.io/cajas_threejs-01/>

Muestra la caja de cartón `models/caja_02.glb`, plegada y formada con las
solapas de arriba abiertas, girando despacio sobre su eje.

> Si borras el modelo o pones `model.url` en `null` dentro de `js/config.js`,
> el visor muestra un cubo de prueba en su lugar.

## Controles

| Acción | Ratón | Móvil / tableta |
| --- | --- | --- |
| Girar | Arrastrar | Un dedo |
| Escalar (zoom) | Rueda del ratón | Pellizcar |
| Mover | Botón derecho + arrastrar | Dos dedos arrastrando |
| Pausar el giro | Botón «Pausar giro» o tecla `Espacio` | Botón |
| Volver a la vista inicial | Botón «Reiniciar vista» o tecla `R` | Botón |

## Ver la página en local

Los módulos ES no funcionan abriendo `index.html` con doble clic, hace falta un
servidor. Incluye uno mínimo, sin dependencias (solo necesita Node.js):

```bash
node tools/serve.mjs
```

Y abre <http://localhost:5173>.

Cualquier otro servidor estático también vale:

```bash
npx serve .
python -m http.server 5173
```

## Poner tu propio modelo `.glb`

**Opción rápida (sin tocar código):** arrastra el archivo `.glb` sobre la página
o pulsa **Abrir .glb**. Ideal para ir viendo cómo queda.

**Opción definitiva:** copia el archivo a `models/` y edita `js/config.js`:

```js
model: {
  url: './models/caja_02.glb',
},
```

El visor se adapta solo: centra el modelo, lo apoya en el suelo y ajusta la
cámara, las luces y la sombra a su tamaño. También admite modelos comprimidos
con Draco o meshopt.

### Plegar la caja (el `.glb` viene desplegado)

El archivo guarda la caja **desplegada** (una plancha plana) y trae un
esqueleto con un hueso por panel y por solapa. El visor la **pliega** hasta
montarla aplicando el bloque `pose` de `js/config.js`: levanta las paredes,
cierra las solapas del fondo y abre las de arriba.

```js
pose: {
  Bone_Raiz: [['x', 90]],          // deja la abertura mirando hacia arriba
  Panel_Lateral_Izq: [['y', 90]],  // paredes
  Panel_Lateral_Der: [['y', -90]],
  Panel_Trasera: [['y', -90]],
  Solapa_Encolado: [['y', 90]],
  Solapa_Inf_Frente: [['y', -90]], // fondo (cerrado)
  /* … las cuatro Solapa_Inf_* … */
  Solapa_Sup_Frente: [['y', -45]], // arriba (abiertas hacia fuera)
  /* … las cuatro Solapa_Sup_* … */
},
```

Cada entrada lleva el **nombre del hueso** y una lista de giros sobre sus ejes
locales (`x`, `y`, `z`) en grados, aplicados en orden. Los nombres que no
existan en el archivo se ignoran, así que puedes arrastrar otro `.glb` sin que
se rompa nada. Con `pose: null` se ve la plancha tal cual viene en el archivo.

### Las luces que trae el `.glb`

Algunos archivos incluyen su propio juego de luces de estudio (clave, recorte y
relleno). Por defecto el visor **las ignora** y usa su propia iluminación,
porque así la luz se queda fija mientras la caja gira y se aprecia mucho mejor
el volumen.

Si prefieres la iluminación original de Blender:

```js
model: {
  useEmbeddedLights: true,
},
```

En ese caso el visor baja automáticamente la intensidad de sus propias luces
para que no se sumen y queme la imagen.

## Estructura

```
.
├── index.html          Estructura de la página e importmap de three.js
├── css/styles.css      Estilos (incluye la interfaz flotante y el modo móvil)
├── js/
│   ├── config.js       Ajustes: modelo, velocidad de giro, colores, cámara
│   ├── viewer.js       Escena de three.js, luces, controles y carga de .glb
│   └── main.js         Arranque y conexión de los botones con el visor
├── models/             Aquí van tus archivos .glb
├── tools/serve.mjs     Servidor local para previsualizar (solo desarrollo)
└── .nojekyll           Necesario para que GitHub Pages no procese el sitio
```

## Ajustes habituales (`js/config.js`)

| Ajuste | Para qué sirve |
| --- | --- |
| `model.url` | Ruta del `.glb` (o `null` para el cubo de prueba). |
| `model.useEmbeddedLights` | Usar las luces que trae el propio archivo. |
| `pose` | Giros por hueso para plegar y montar la caja (ver arriba). |
| `quality.maxPixelRatio` | Densidad de pantalla (nitidez frente a rendimiento). |
| `quality.shadowMapSize` | Resolución de la sombra (más alto = borde más fino). |
| `quality.anisotropy` | Filtrado de texturas: `'auto'` usa el máximo del equipo. |
| `materials.forceDielectric` | Quita el metal de los materiales (cartón, no metal). |
| `materials.roughnessRange` | Rugosidad mínima y máxima de los materiales. |
| `materials.envMapIntensity` | Fuerza de los reflejos del entorno sobre el modelo. |
| `rotation.speed` | Velocidad del giro automático (radianes por segundo). |
| `rotation.enabled` | Si el modelo gira solo al abrir la página. |
| `placeholder.size` / `color` | Tamaño y color del cubo de prueba. |
| `camera.fitPadding` | Margen alrededor del modelo al encuadrarlo. |
| `camera.direction` | Desde dónde mira la cámara (más altura = más vista superior). |
| `controls.*` | Sensibilidad de giro, zoom y desplazamiento. |
| `background.top` / `bottom` | Colores del fondo degradado. |
| `grid` | Mostrar u ocultar la rejilla del suelo. |

## Despliegue en GitHub Pages

El sitio es estático, así que basta con publicar la rama `main`:

1. Sube el proyecto a un repositorio de GitHub.
2. En el repositorio: **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Guarda. En un minuto estará en
   `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`.

Cada `git push` a `main` actualiza la página automáticamente.

## Notas

- Los modelos comprimidos con **Draco** o **meshopt** se cargan sin configurar nada.
- Los `.gltf` con archivos externos (`.bin`, texturas sueltas) no se pueden
  arrastrar a la página; usa `.glb`, que lo lleva todo dentro.
- Si el `.glb` pesa mucho, la primera carga en móvil se nota. Comprímelo con
  [gltf-transform](https://gltf-transform.dev/) o
  [gltfpack](https://meshoptimizer.org/gltf/).

## Licencia

MIT.
