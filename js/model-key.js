  function modelFilename(value) {
    const name = String(value || '').trim().replace(/\.glb$/i, '');
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(name)) {
      throw new Error('Usa entre 1 y 80 letras sin acentos, números, guiones o guiones bajos.');
    }
    return name + '.glb';
  }

export { modelFilename };
