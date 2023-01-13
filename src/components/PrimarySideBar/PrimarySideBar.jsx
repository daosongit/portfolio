import React from 'react';
import Explorer from './Explorer/Explorer';
import About from './About/About';
import Settings from './Settings/Settings';
import cl from './PrimarySideBar.module.scss';
import { useSelector } from 'react-redux';

export default function PrimarySideBar() {
  const primarySideBar = useSelector((state) => state.rdcPrimarySideBar);
  const barClasses = [cl.sidebar, primarySideBar.isShown ? '' : cl.hide].join(' ');
  const sideBarItems = {
    'Explorer': <Explorer barname="Explorer" />,
    'About': <About barname="About" />,
    'Settings': <Settings barname="Settings" />,
  };

  const SideBarComponent = () => sideBarItems[primarySideBar.key];
  return (
    <aside className={barClasses}>
      <SideBarComponent />
    </aside>
  );
}
