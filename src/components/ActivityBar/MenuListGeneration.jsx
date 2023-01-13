import React, { useState, useRef, useContext } from 'react';
import { useMenuItemClicked, useMouseEnterHandler, useMouseLeaveHandler } from './useHandler';
import { ImFilesEmpty as IcoExplore } from 'react-icons/im';
import { RxAvatar as IcoAvatar } from 'react-icons/rx';
import { SlSettings as IcoSetting } from 'react-icons/sl';
import { useDispatch } from 'react-redux';

export default function MenuListGeneration({ cl }) {
  const dispatch = useDispatch();
  const timeoutId = useRef(undefined);

  const menuItems = [
    { 'Explorer': <IcoExplore /> },
    { 'About': <IcoAvatar /> },
    { 'Settings': <IcoSetting /> },
  ];

  const [stateMenuItems, setStateMenuItems] = useState(
    menuItems.map((itm) => {
      const [key] = Object.keys(itm);
      if (key === 'Explorer') return { key, isActive: true, isHover: false };
      else return { key, isActive: false, isHover: false };
    }),
  );

  const generateList = () => {
    let arrLi = [];
    menuItems.forEach((itm) => {
      const [key] = Object.keys(itm);
      const [icon] = Object.values(itm);
      const currentEl = stateMenuItems.find((a) => a.key === key);

      const hintClasses = [
        cl.hint,
        cl[key],
        currentEl.isHover && !currentEl.isActive ? cl.hovered : '',
      ].join(' ');

      const iconClasses = [cl.icon, currentEl.isActive ? cl.active : ''].join(' ');

      arrLi.push(
        <li
          className={currentEl.isActive ? cl.active : ''}
          key={key}
          onClick={useMenuItemClicked.bind(null, stateMenuItems, setStateMenuItems, key, dispatch)}>
          <span
            onMouseEnter={useMouseEnterHandler.bind(
              null,
              stateMenuItems,
              setStateMenuItems,
              key,
              timeoutId,
            )}
            onMouseLeave={useMouseLeaveHandler.bind(
              null,
              stateMenuItems,
              setStateMenuItems,
              key,
              timeoutId,
            )}
            className={iconClasses}>
            {icon}
          </span>
          <div className={hintClasses}>
            <span>{key}</span>
          </div>
        </li>,
      );
    });
    return arrLi;
  };

  return generateList();
}
