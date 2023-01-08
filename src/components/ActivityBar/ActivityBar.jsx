import React, { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { generateList } from './generateList';
import { initEventListener } from './mouseHoverHint';
import cl from './ActivityBar.module.scss';

export default function ActivityBar() {
  let timeoutId = undefined;

  const hoverHandler = (target) => {
    const hint = target.nextSibling;
    if (hint.classList.contains(cl.hovered) || timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
      hint.classList.remove(cl.hovered);
    } else {
      timeoutId = setTimeout(() => {
        hint.classList.add(cl.hovered);
      }, 600);
    }
  };

  useEffect(() => {
    const icons = document.querySelectorAll(`.${cl.icon}`);
    initEventListener(hoverHandler, icons);
  });

  return (
    <aside className={cl.bar}>
      <ul className={cl.list}>
        <IconContext.Provider value={{ size: '27' }}>
          {generateList(cl.icon, cl.hint)}
        </IconContext.Provider>
      </ul>
    </aside>
  );
}
