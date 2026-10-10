# Visor 3D con Three.js

Visor 3D muy sencillo hecho **solo con HTML, CSS y JavaScript**. La única
librería externa es [three.js](https://threejs.org/), cargada por CDN.

Muestra la caja de cartón `models/caja_04.glb`, que gira despacio sobre su eje.

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
  url: './models/caja_04.glb',
},
```

El visor se adapta solo: centra el modelo, lo apoya en el suelo y ajusta la
cámara, las luces y la sombra a su tamaño. También admite modelos comprimidos
con Draco o meshopt.

### Las luces que trae el `.glb`

El archivo de la caja incluye su propio juego de tres luces de estudio
(`Luz_Clave_Key`, `Luz_Recorte_Rim`, `Luz_Relleno_Fill`). Por defecto el visor
**las ignora** y usa su propia iluminación, porque así la luz se queda fija
mientras la caja gira y se aprecia mucho mejor el volumen.

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
| `rotation.speed` | Velocidad del giro automático (radianes por segundo). |
| `rotation.enabled` | Si el modelo gira solo al abrir la página. |
| `placeholder.size` / `color` | Tamaño y color del cubo de prueba. |
| `camera.fitPadding` | Margen alrededor del modelo al encuadrarlo. |
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
