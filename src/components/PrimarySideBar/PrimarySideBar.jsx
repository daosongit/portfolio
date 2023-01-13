import React, { useContext } from 'react';
import { PrimarySideBarCtx } from '../../App';
import Explorer from './Explorer/Explorer';
import About from './About/About';
import Settings from './Settings/Settings';
import cl from './PrimarySideBar.module.scss';

export default function PrimarySideBar() {
  const ctx = useContext(PrimarySideBarCtx);
  const barClasses = [cl.sidebar, ctx.context.isShown ? '' : cl.hide].join(' ');
  const sideBarItems = {
    'Explorer': <Explorer barname="Explorer" />,
    'About': <About barname="About" />,
    'Settings': <Settings barname="Settings" />,
  };

  const SideBarComponent = () => sideBarItems[ctx.context.key];
  return (
    <aside className={barClasses}>
      <SideBarComponent />
    </aside>
  );
}
