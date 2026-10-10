import { CONFIG } from './config.js';
import { ModelViewer } from './viewer.js';

/* -------------------------------------------------------------- elementos --- */

const canvas = document.getElementById('scene');
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlay-text');
const sourceLabel = document.getElementById('source-label');
const dropzone = document.getElementById('dropzone');
const btnRotate = document.getElementById('btn-rotate');
const btnReset = document.getElementById('btn-reset');
const btnOpen = document.getElementById('btn-open');
const fileInput = document.getElementById('file-input');

const root = document.documentElement;
const ACCEPTED = /\.(glb|gltf)$/i;

/* ------------------------------------------------------------ visor --- */

let viewer = null;

try {
  viewer = new ModelViewer(canvas, CONFIG);
  window.__VISOR_BOOT__.ok = true;
} catch (error) {
  showFatal();
  throw error;
}

/* --------------------------------------------------- errores en pantalla --- */

// Se deja constancia del error en el propio <html>, útil para diagnosticar
// sin abrir la consola del navegador.
window.addEventListener('error', (event) => {
  root.dataset.visorError = String(event.message || 'error').slice(0, 300);
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  root.dataset.visorError = String((reason && reason.message) || reason || 'promesa rechazada').slice(0, 300);
});

/* ---------------------------------------------------------- interfaz --- */

function showOverlay(message) {
  if (message) overlayText.textContent = message;
  overlay.classList.remove('overlay--hidden');
  overlay.classList.remove('overlay--error');
}

function hideOverlay() {
  overlay.classList.add('overlay--hidden');
}

function showError(message) {
  overlayText.textContent = message;
  overlay.classList.add('overlay--error');
  overlay.classList.remove('overlay--hidden');
}

function showFatal() {
  overlayText.textContent =
    'No se ha podido iniciar el visor 3D. Tu navegador o tu tarjeta gráfica no soportan WebGL.';
  overlay.classList.add('overlay--error');
  overlay.classList.remove('overlay--hidden');
}

function syncRotateButton() {
  const active = viewer.autoRotate;
  btnRotate.textContent = active ? 'Pausar giro' : 'Reanudar giro';
  btnRotate.setAttribute('aria-pressed', String(active));
}

viewer.onStatus = (state, detail = {}) => {
  if (state === 'loading') {
    root.dataset.visorState = 'loading';
    showOverlay(`Cargando ${detail.label || 'modelo'}…`);
    return;
  }

  if (state === 'ready') {
    root.dataset.visorState = 'ready';
    root.dataset.visorReady = 'true';
    sourceLabel.textContent = viewer.contentLabel || 'Modelo';
    hideOverlay();
    return;
  }

  if (state === 'error') {
    root.dataset.visorState = 'error';
    showError(`No se ha podido cargar «${detail.label}». Comprueba que sea un .glb válido.`);
  }
};

/* ------------------------------------------------------------ carga --- */

/**
 * Carga un archivo local elegido con el botón o arrastrado a la página.
 * @param {File} file
 */
async function loadFile(file) {
  if (!ACCEPTED.test(file.name)) {
    showError('Formato no soportado. Usa un archivo .glb (o .gltf de un solo archivo).');
    window.setTimeout(() => {
      if (root.dataset.visorState === 'ready') hideOverlay();
    }, 3500);
    return;
  }

  await viewer.loadFromFile(file);
}

async function start() {
  syncRotateButton();

  if (CONFIG.model.url) {
    await viewer.loadModel(CONFIG.model.url);
  } else {
    viewer.showPlaceholder();
  }
}

start();

/* ----------------------------------------------------------- botones --- */

btnRotate.addEventListener('click', () => {
  viewer.toggleAutoRotate();
  syncRotateButton();
});

btnReset.addEventListener('click', () => {
  viewer.resetView();
});

btnOpen.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files && fileInput.files[0];
  // Se limpia siempre para poder volver a elegir el mismo archivo.
  fileInput.value = '';
  if (file) loadFile(file);
});

/* -------------------------------------------------- arrastrar y soltar --- */

let dragDepth = 0;

function isFileDrag(event) {
  const types = event.dataTransfer && event.dataTransfer.types;
  return Boolean(types) && Array.prototype.includes.call(types, 'Files');
}

window.addEventListener('dragenter', (event) => {
  if (!isFileDrag(event)) return;
  event.preventDefault();
  dragDepth += 1;
  dropzone.classList.add('dropzone--active');
});

window.addEventListener('dragover', (event) => {
  if (!isFileDrag(event)) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
});

window.addEventListener('dragleave', (event) => {
  if (!isFileDrag(event)) return;
  dragDepth = Math.max(0, dragDepth - 1);
  if (dragDepth === 0) dropzone.classList.remove('dropzone--active');
});

window.addEventListener('drop', (event) => {
  if (!isFileDrag(event)) return;
  event.preventDefault();
  dragDepth = 0;
  dropzone.classList.remove('dropzone--active');

  const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
  if (file) loadFile(file);
});

/* ---------------------------------------------------------- teclado --- */

window.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLInputElement) return;

  if (event.code === 'Space') {
    event.preventDefault();
    viewer.toggleAutoRotate();
    syncRotateButton();
    return;
  }

  if (event.key === 'r' || event.key === 'R') {
    viewer.resetView();
  }
});

/* ------------------------------------------------------ WebGL perdido --- */

canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  showError('Se ha perdido el contexto WebGL. Recarga la página para volver a empezar.');
});
