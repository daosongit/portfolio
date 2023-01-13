import React, { useState } from 'react';
import cl from './Explorer.module.scss';
import { FcFolder as IcoFolder, FcOpenedFolder as IcoFolderOpen } from 'react-icons/fc';
import { FaReact as IcoReact } from 'react-icons/fa';
import { SlArrowDown as IcoArrowDown, SlArrowRight as IcoArrowRight } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';

export default function Explorer() {
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

  return (
    <div>
      <div className={cl.head} onClick={() => setIsDropped(!isDropped)}>
        {changeIcons()}
        <span className={cl.title}>Portfolio</span>
      </div>
      <ul className={[cl.projects, isDropped ? cl.drop : ''].join(' ')}>
        {projectList.map((itm) => (
          <NavLink
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
