import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PrimarySideBar from '../PrimarySideBar/PrimarySideBar';
import Tabs from '../Tabs/Tabs';
import { SettingsButton, SettingsMenu } from '../Settings/Settings';
import { ImFilesEmpty as IcoExplore } from 'react-icons/im';
import { RxAvatar as IcoAvatar } from 'react-icons/rx';
import cl from './ActivityBar.module.scss';

export default function ActivityBar() {
  const [isSettingShown, setIsSettingShown] = useState();
  const [primarySideBar, setPrimarySideBar] = useState({ key: '', isShown: false });

  const location = useLocation();
  const menuItems = [
    { key: 'Explorer', icon: <IcoExplore /> },
    { key: 'About', icon: <IcoAvatar /> },
  ];

  useEffect(() => {
    if (location.pathname === '/') {
      setPrimarySideBar({ key: menuItems[0].key, isShown: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMenuClickHandle = (key) => {
    setIsSettingShown(false);
    if (primarySideBar.key === key) {
      setPrimarySideBar({ ...primarySideBar, isShown: !primarySideBar.isShown });
    } else {
      setPrimarySideBar({ key, isShown: true });
    }
  };

  return (
    <header>
      <nav className={cl.bar}>
        <ul className={cl.list}>
          {menuItems.map((itm) => {
            const activeClass = primarySideBar.key === itm.key ? cl.active : '';
            return (
              <li key={itm.key} title={itm.key}>
                <button
                  className={activeClass}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMenuClickHandle(itm.key);
                  }}>
                  {itm.icon}
                </button>
              </li>
            );
          })}
          <SettingsButton isShown={isSettingShown} setShown={setIsSettingShown} />
        </ul>
        <SettingsMenu isShown={isSettingShown} setShown={setIsSettingShown} />
      </nav>
      <PrimarySideBar primarySideBar={primarySideBar} setPrimarySideBar={setPrimarySideBar} />
      <Tabs isSideBarShown={primarySideBar.isShown} />
    </header>
  );
}
