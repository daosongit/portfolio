import React, { useState, useRef } from 'react';
import { IconContext } from 'react-icons';
import { ImFilesEmpty as IcoFiles } from 'react-icons/im';
import { RxAvatar as IcoAvatar } from 'react-icons/rx';
import { SlSettings as IcoSetting } from 'react-icons/sl';
import cl from './ActivityBar.module.scss';

export default function ActivityBar() {
  const timeoutId = useRef(undefined);

  const menuItems = [
    { Explore: <IcoFiles /> },
    { About: <IcoAvatar /> },
    { Settings: <IcoSetting /> },
  ];
  const [stateMenuItems, setStateMenuItems] = useState(
    menuItems.map((itm) => {
      const [key] = Object.keys(itm);
      return { key, isActive: false, isHover: false };
    }),
  );

  const mouseEnterHandler = (key) => {
    timeoutId.current = setTimeout(() => {
      const idx = stateMenuItems.findIndex((a) => a.key === key);
      const newState = [...stateMenuItems];
      newState[idx].isHover = true;
      setStateMenuItems(newState);
      timeoutId.current = undefined;
    }, 600);
  };

  const mouseLeaveHandler = (key) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
      return;
    }
    const idx = stateMenuItems.findIndex((a) => a.key === key);
    const newState = [...stateMenuItems];
    newState[idx].isHover = false;
    setStateMenuItems(newState);
  };

  const menuItemClicked = (key) => {
    const newState = [...stateMenuItems];
    newState.forEach((itm) => {
      if (itm.key === key) itm.isActive = true;
      else itm.isActive = false;
    });
    setStateMenuItems(newState);
  };

  function generateList() {
    let arrLi = [];
    menuItems.forEach((itm) => {
      const [key] = Object.keys(itm);
      const [icon] = Object.values(itm);
      const currentEl = stateMenuItems.find((a) => a.key === key);

      const hintsClasses = [
        cl.hint,
        cl[key],
        currentEl.isHover && !currentEl.isActive ? cl.hovered : '',
      ].join(' ');

      const iconClasses = [cl.icon, currentEl.isActive ? cl.active : ''].join(' ');

      arrLi.push(
        <li
          className={currentEl.isActive ? cl.active : ''}
          key={key}
          onClick={menuItemClicked.bind(null, key)}>
          <span
            onMouseEnter={mouseEnterHandler.bind(null, key)}
            onMouseLeave={mouseLeaveHandler.bind(null, key)}
            className={iconClasses}>
            {icon}
          </span>
          <div className={hintsClasses}>
            <span>{key}</span>
          </div>
        </li>,
      );
    });

    return arrLi;
  }

  return (
    <aside className={cl.bar}>
      <ul className={cl.list}>
        <IconContext.Provider value={{ size: '27' }}>{generateList()}</IconContext.Provider>
      </ul>
    </aside>
  );
}
