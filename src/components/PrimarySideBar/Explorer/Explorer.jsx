import React, { useState } from 'react';
import cl from './Explorer.module.scss';
import { FcFolder as IcoFolder, FcOpenedFolder as IcoFolderOpen } from 'react-icons/fc';
import { GrReactjs as IcoReact } from 'react-icons/gr';
import { SlArrowDown as IcoArrowDown, SlArrowRight as IcoArrowRight } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTab } from '../../../redux/reducers';

export default function Explorer({ barname }) {
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
    <div className={cl.explorer}>
      <h1>{barname}</h1>
      <div className={cl.head} onClick={() => setIsDropped(!isDropped)}>
        {changeIcons()}
        <span className={cl.title}>Portfolio</span>
      </div>
      <ul className={[cl.projects, isDropped ? cl.drop : ''].join(' ')}>
        {projectList.map((itm) => (
          <NavLink
            onClick={() => updateTabs(itm)}
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
