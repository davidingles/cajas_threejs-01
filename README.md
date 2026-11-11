# Visor de cajas para clientes

Web: https://davidingles.github.io/cajas_threejs-01/

La página empieza únicamente con un formulario. El cliente introduce el nombre del archivo, con o sin .glb, y se carga modelos/NOMBRE.glb. No se carga una caja inicial ni un cubo de prueba. Las claves distinguen mayúsculas y admiten de 1 a 80 letras ASCII, números, guiones y guiones bajos; deben comenzar por letra o número.

Desde Troqueles Vicente, abre una caja, ajusta su plegado y el arte y pulsa **Publicar para cliente**. La aplicación guarda el GLB con la posición actual en modelos/ y entrega el enlace del visor y la clave. No sustituye claves existentes. La publicación de GitHub Pages puede tardar unos minutos.

El visor permite girar, acercar y mover la caja, pausar el giro y regresar al formulario con **Otra caja**. Los modelos con los huesos definidos en js/config.js conservan los controles de solapas.

Los archivos son públicos. La clave selecciona un archivo y no es una contraseña. El visor no contiene credenciales de GitHub.

Para probar en local: node tools/serve.mjs (http://localhost:5173). Three.js se descarga por CDN únicamente después de introducir una clave.

Los archivos antiguos de models/ se conservan, pero los nuevos clientes se publican en modelos/.
