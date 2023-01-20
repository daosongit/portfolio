import React, { useEffect, useRef } from 'react';
import { SlSettings as IcoSetting } from 'react-icons/sl';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTab } from '../../redux/reducers';
import cl from './Settings.module.scss';

export function SettingsButton({ isShown, setShown }) {
  return (
    <li title="Settings">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShown(!isShown);
        }}>
        <IcoSetting />
      </button>
    </li>
  );
}

export function SettingsMenu({ isShown, setShown }) {
  const dispatch = useDispatch();
  const refSettings = useRef();
  useEffect(() => {
    const clickHandle = (e) => {
      if (isShown && refSettings.current !== e.target) {
        setShown(false);
      }
    };
    document.addEventListener('click', clickHandle);
    return () => document.removeEventListener('click', clickHandle);
  }, [refSettings, isShown]);
  return (
    <div ref={refSettings} className={[cl.themeSettings, isShown ? cl.show : ''].join(' ')}>
      <Link
        onClick={() => {
          dispatch(addTab({ tabName: 'theme.json', link: '' }));
          setShown(false);
        }}
        to="/theme">
        Theme preference
      </Link>
    </div>
  );
}
