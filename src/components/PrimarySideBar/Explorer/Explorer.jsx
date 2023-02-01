import React, { useState } from 'react';
import cl from './Explorer.module.scss';
import { FcFolder as IcoFolder, FcOpenedFolder as IcoFolderOpen } from 'react-icons/fc';
import { GrReactjs as IcoReact } from 'react-icons/gr';
import { SlArrowDown as IcoArrowDown, SlArrowRight as IcoArrowRight } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTab } from '../../../redux/reducers';

export default function Explorer() {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const dispatch = useDispatch();
  const [isDropped, setIsDropped] = useState(true);
  const projectList = ['Blog.jsx', 'Game.jsx'];
  const changeIcons = () => {
    if (isDropped)
      return (
        <>
          <IcoArrowDown size={10} /> <IcoFolderOpen />
        </>
      );
    else
      return (
        <>
          <IcoArrowRight size={10} /> <IcoFolder />
        </>
      );
  };

  const updateTabs = (tabName) => {
    dispatch(addTab({ tabName, link: '' }));
  };

  return (
    <div className={[cl.wrapper, cl[themeClass]].join(' ')}>
      <h1>Explorer</h1>
      <div className={cl.head} onClick={() => setIsDropped(!isDropped)}>
        {changeIcons()}
        <h2>Portfolio</h2>
      </div>
      <ul className={[cl.projects, isDropped ? cl.drop : ''].join(' ')}>
        {projectList.map((itm) => (
          <NavLink
            onClick={(e) => {
              e.stopPropagation();
              updateTabs(itm);
            }}
            key={itm}
            to={`/${itm.slice(0, -4).toLowerCase()}`}
            className={({ isActive }) => (isActive ? cl.active : '')}>
            <li className={cl.projectItm}>
              <IcoReact color="rgb(0, 145, 255)" />
              <span>{itm}</span>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
