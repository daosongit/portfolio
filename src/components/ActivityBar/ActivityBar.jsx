import React from 'react';
import { IconContext } from 'react-icons';
import MenuListGeneration from './MenuListGeneration';
import cl from './ActivityBar.module.scss';

export default function ActivityBar() {
  return (
    <aside className={cl.bar}>
      <ul className={cl.list}>
        <IconContext.Provider value={{ size: '27' }}>
          <MenuListGeneration cl={cl} />
        </IconContext.Provider>
      </ul>
    </aside>
  );
}
