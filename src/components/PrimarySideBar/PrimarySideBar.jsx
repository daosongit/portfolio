import React, { useEffect, useRef, useState } from 'react';
import Explorer from './Explorer/Explorer';
import About from './About/About';
import cl from './PrimarySideBar.module.scss';
import { useSelector } from 'react-redux';

export default function PrimarySideBar({ primarySideBar, setPrimarySideBar }) {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const refPrimarySideBarEl = useRef();
  const barClasses = [cl.sidebar, cl[themeClass], primarySideBar.isShown ? '' : cl.hide].join(' ');
  const sideBarItems = {
    'Explorer': <Explorer />,
    'About': <About />,
  };

  useEffect(() => {
    const clickHandler = (e) => {
      const isActivityBar = refPrimarySideBarEl.current.parentElement.contains(e.target);
      const isSideBar = refPrimarySideBarEl.current.contains(e.target);
      if (primarySideBar.isShown && !isActivityBar && !isSideBar) {
        setPrimarySideBar(false);
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
