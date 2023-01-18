import React, { useEffect } from 'react';
import { ImFilesEmpty as IcoExplore } from 'react-icons/im';
import { RxAvatar as IcoAvatar } from 'react-icons/rx';
import { SlSettings as IcoSetting } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateSideBar } from '../../redux/reducers';
import PrimarySideBar from '../PrimarySideBar/PrimarySideBar';
import cl from './ActivityBar.module.scss';

export default function ActivityBar() {
  const dispatch = useDispatch();
  const primarySideBarState = useSelector((state) => state.rdcPrimarySideBar);
  const location = useLocation();
  const menuItems = [
    { key: 'Explorer', icon: <IcoExplore /> },
    { key: 'About', icon: <IcoAvatar /> },
    { key: 'Settings', icon: <IcoSetting /> },
  ];

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(updateSideBar({ key: menuItems[0].key, isShown: true }));
    }
  }, []);

  const clickHanler = (key) => {
    if (primarySideBarState.key === key) {
      dispatch(updateSideBar({ ...primarySideBarState, isShown: !primarySideBarState.isShown }));
    } else {
      dispatch(updateSideBar({ key, isShown: true }));
    }
  };

  return (
    <header>
      <nav className={cl.bar}>
        <ul className={cl.list}>
          {menuItems.map((itm) => {
            const activeClass = primarySideBarState.key === itm.key ? cl.active : '';
            return (
              <li key={itm.key} className={''} title={itm.key}>
                <button className={activeClass} onClick={() => clickHanler(itm.key)}>
                  {itm.icon}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <PrimarySideBar />
    </header>
  );
}
