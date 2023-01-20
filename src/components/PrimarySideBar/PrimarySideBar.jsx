import React, { useEffect, useRef, useState } from 'react';
import Explorer from './Explorer/Explorer';
import About from './About/About';
import cl from './PrimarySideBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateSideBar } from '../../redux/reducers';

export default function PrimarySideBar() {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const primarySideBar = useSelector((state) => state.rdcPrimarySideBar);
  const dispatch = useDispatch();
  const refPrimarySideBarEl = useRef();
  const barClasses = [cl.sidebar, cl[themeClass], primarySideBar.isShown ? '' : cl.hide].join(' ');
  const sideBarItems = {
    'Explorer': <Explorer />,
    'About': <About />,
  };

  useEffect(() => {
    const clickHandler = (e) => {
      const isActivityBar = refPrimarySideBarEl.current.parentElement.contains(e.target);
      const isPrimaryBar = refPrimarySideBarEl.current.contains(e.target);
      if (primarySideBar.isShown && !isActivityBar && !isPrimaryBar) {
        dispatch(updateSideBar({ ...primarySideBar, isShown: false }));
      }
    };
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [refPrimarySideBarEl, primarySideBar.isShown]);

  const SideBarComponent = () => sideBarItems[primarySideBar.key];
  return (
    <aside ref={refPrimarySideBarEl} className={barClasses}>
      <div className={cl.content}>
        <SideBarComponent />
      </div>
    </aside>
  );
}
