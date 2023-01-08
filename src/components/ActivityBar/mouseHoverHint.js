export function initEventListener(handler, arrEl) {
  arrEl.forEach((itm) => {
    itm.addEventListener('mouseenter', handler.bind(null, itm));
    itm.addEventListener('mouseleave', handler.bind(null, itm));
  });

  return () => {
    arrEl.forEach((itm) => {
      itm.removeEventListener('mouseenter', handler);
      itm.removeEventListener('mouseleave', handler);
    });
  };
}
