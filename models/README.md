# Carpeta de modelos

Aquí van tus archivos **`.glb`**. Ahora mismo contiene `caja_04.glb`, que es el
modelo que muestra el visor.

1. Copia tu archivo, por ejemplo `caja.glb`, dentro de esta carpeta.
2. Abre `js/config.js` y pon la ruta:

   ```js
   model: {
     url: './models/caja.glb',
   }
   ```

3. Recarga la página.

> Mientras `url` siga en `null`, el visor muestra el cubo de prueba.

También puedes previsualizar un `.glb` sin tocar el código: arrástralo sobre la
página o pulsa **Abrir .glb**. Así ves cómo queda antes de subirlo al repositorio.

## Recomendaciones

- Usa **`.glb`** (un solo archivo, con las texturas dentro). Los `.gltf` que
  apuntan a un `.bin` o a texturas externas no se pueden cargar arrastrándolos.
- Se admiten modelos comprimidos con **Draco** o **meshopt**.
- Mantén el archivo por debajo de ~15 MB para que la página cargue rápido en móvil.
  Si pesa más, puedes comprimirlo con [gltf-transform](https://gltf-transform.dev/)
  o [gltfpack](https://meshoptimizer.org/gltf/).
