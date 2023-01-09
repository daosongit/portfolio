import React, { useState } from 'react';
import cl from './Explorer.module.scss';
import { FcFolder as IcoFolder, FcOpenedFolder as IcoFolderOpen } from 'react-icons/fc';
import { FaReact as IcoReact } from 'react-icons/fa';
import { SlArrowDown as IcoArrowDown, SlArrowRight as IcoArrowRight } from 'react-icons/sl';

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
    <div className={cl.explorer}>
      <div className={cl.head} onClick={() => setIsDropped(!isDropped)}>
        {changeIcons()}
        <span className={cl.title}>Portfolio</span>
      </div>

      <ul className={[cl.projects, isDropped ? cl.drop : ''].join(' ')}>
        {projectList.map((itm) => (
          <li key={itm} className={cl.projectItm}>
            <IcoReact />
            <span>{itm}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
