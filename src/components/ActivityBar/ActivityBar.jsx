import React from 'react';
import cl from './ActivityBar.module.scss';
import { IconContext } from 'react-icons';
import { ImFilesEmpty as IcoFiles } from 'react-icons/im';
import { RxAvatar as IcoAvatar } from 'react-icons/rx';
import { SlSettings as IcoSetting } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';

export default function ActivityBar() {
  return (
    <aside className={cl.bar}>
      <ul className={cl.list}>
        <IconContext.Provider value={{ size: '27' }}>
          <li>
            <a href="">
              <IcoFiles />
            </a>
          </li>
          <li>
            <a href="">
              <IcoAvatar />
            </a>
          </li>
          <li>
            <a href="">
              <IcoSetting />
            </a>
          </li>
        </IconContext.Provider>
      </ul>
    </aside>
  );
}
