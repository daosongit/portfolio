import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTab, updateLink } from '../../redux/reducers';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GrReactjs as IcoReact } from 'react-icons/gr';
import { VscJson as IcoJson } from 'react-icons/vsc';
import cl from './Tabs.module.scss';

export default function Tabs({ isSideBarShown }) {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const [isClosing, setClosing] = useState(false);
  const navigate = useNavigate();
  const tabs = useSelector((state) => state.rdcTabs.value);
  let location = useLocation();
  const dispatch = useDispatch();

  const icons = useRef({
    'jsx': <IcoReact color="rgb(0, 145, 255)" />,
    'json': <IcoJson color="#FBC02D" />,
  });

  useEffect(() => {
    if (!tabs.length) return;
    const currentTab = {
      ...tabs.find(
        (a) =>
          a.tabName.slice(0, a.tabName.indexOf('.')).toLowerCase() ===
          location.pathname.split('/')[1],
      ),
    };

    if (currentTab.link !== location.pathname) {
      currentTab.link = location.pathname;
      dispatch(updateLink(currentTab));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (tabs.length === 0) navigate('/');
    else if (isClosing) {
      navigate(tabs.at(-1).link);
      setClosing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const closeTab = (tabName) => {
    setClosing(true);
    dispatch(removeTab(tabName));
  };

  const linkClasses = (isActive) => {
    if (isActive) return [cl.linkWrapper, cl.active].join(' ');
    else return cl.linkWrapper;
  };

  return (
    <>
      {tabs.length ? (
        <nav
          className={[cl.tabsWrapper, cl[themeClass], isSideBarShown ? cl.sidebar : ''].join(' ')}>
          {tabs.map((itm) => (
            <NavLink
              key={itm.tabName}
              className={({ isActive }) => linkClasses(isActive)}
              to={itm.link}>
              <section className={cl.tab}>
                {icons.current[itm.tabName.slice(itm.tabName.indexOf('.') + 1)]}
                <label to={itm.link} className={cl.link}>
                  {itm.tabName}
                </label>
              </section>
              <button onClick={() => closeTab(itm.tabName)} className={cl.close}>
                ✖
              </button>
            </NavLink>
          ))}
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}
