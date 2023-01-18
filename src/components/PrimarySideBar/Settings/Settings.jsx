import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../../redux/reducers';
import cl from './Settings.module.scss';

export default function Settings() {
  const theme = useSelector((state) => state.rdcTheme.key);
  console.log(theme);
  const dispatch = useDispatch();
  const themesList = [
    { key: 'Dark', label: 'Dark (Visual Studio)', cssSelector: 'dark-theme' },
    { key: 'Light', label: 'Light (Visual Studio)', cssSelector: 'light-theme' },
  ];
  const radioHandler = (key, cssSelector) => {
    dispatch(changeTheme({ key, cssSelector }));
  };

  return (
    <div className={cl.settings}>
      <h1>Settings</h1>
      <h2>Theme: </h2>
      {themesList.map((itm) => (
        <div key={itm.key} className={cl.radio}>
          <input
            type="radio"
            id={itm.key}
            name="themes"
            value={itm.key}
            onChange={() => radioHandler(itm.key, itm.cssSelector)}
            checked={theme === itm.key}
          />
          <label htmlFor={itm.key}>{itm.label}</label>
        </div>
      ))}
    </div>
  );
}
