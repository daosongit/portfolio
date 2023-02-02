import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/reducers';
import cl from './ThemePreference.module.scss';

export default function ThemePreference() {
  const theme = useSelector((state) => state.rdcTheme);
  const dispatch = useDispatch();
  const themesList = [
    { key: 'Dark', label: '"theme.vs-dark" :', cssSelector: 'dark-theme' },
    { key: 'Light', label: '"theme.cs-light" :', cssSelector: 'light-theme' },
  ];

  const radioHandler = (key, cssSelector) => {
    dispatch(changeTheme({ key, cssSelector }));
  };

  const Radio = (line) => {
    return themesList.map((itm, idx) => (
      <div
        key={itm.key}
        className={[[cl.line, cl[theme.cssSelector]].join(' '), cl.indent1].join(' ')}>
        <i>{line.lineNumber + idx}</i>
        <section className={cl.radio}>
          <label htmlFor={itm.key}>
            {itm.label}
            <span className={cl.var}>{theme.key === itm.key ? 'true' : 'false'}</span>
          </label>
          <input
            type="radio"
            id={itm.key}
            name="theme"
            value={itm.key}
            onChange={() => radioHandler(itm.key, itm.cssSelector)}
            checked={theme.key === itm.key}
          />
        </section>
      </div>
    ));
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.theme}>
        <div className={[cl.line, cl[theme.cssSelector]].join(' ')}>
          <i>1</i>
          <span className={cl.title}>{'// theme preference'}</span>
        </div>
        <div className={[cl.line, cl[theme.cssSelector]].join(' ')}>
          <i>2</i>
          <span className={cl.brace}>{'{'}</span>
        </div>
        <Radio lineNumber={3} />
        <div className={[cl.line, cl[theme.cssSelector]].join(' ')}>
          <i>5</i>
          <span className={cl.brace}>{'}'}</span>
        </div>
      </div>
    </div>
  );
}
