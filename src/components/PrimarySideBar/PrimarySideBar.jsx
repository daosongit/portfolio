import React from 'react';
import Explorer from './Explorer/Explorer';
import About from './About/About';
import cl from './PrimarySideBar.module.scss';
import { useSelector } from 'react-redux';

export default function PrimarySideBar() {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const primarySideBar = useSelector((state) => state.rdcPrimarySideBar);
  const barClasses = [cl.sidebar, cl[themeClass], primarySideBar.isShown ? '' : cl.hide].join(' ');
  const sideBarItems = {
    'Explorer': <Explorer />,
    'About': <About />,
  };

  const SideBarComponent = () => sideBarItems[primarySideBar.key];
  return (
    <aside className={barClasses}>
      <div className={cl.content}>
        <SideBarComponent />
      </div>
    </aside>
  );
}
