import React from 'react';
import cl from './About.module.scss';
import {
  BsLink45Deg as IcoLink,
  BsGithub as IcoGit,
  BsTelegram as IcoTelegram,
  BsLinkedin as IcoLinkedin,
} from 'react-icons/bs';

export default function About() {
  const linksList = [
    { key: 'GitHub', icon: <IcoGit size={25} />, href: 'https://twitter.com/' },
    {
      key: 'Linkedin',
      icon: <IcoLinkedin size={25} color={'#0A66C2'} />,
      href: 'https://www.linkedin.com/',
    },
    {
      key: 'Telegram',
      icon: <IcoTelegram size={25} color={'#34A8E4'} />,
      href: 'https://bezmn.t.me/',
    },
  ];

  return (
    <div className={cl.about}>
      <h1>About</h1>
      <div className={cl.head}>
        <IcoLink size={20} />
        <h2>Links</h2>
      </div>
      <div className={cl.linkWrapper}>
        {linksList.map((itm) => (
          <a key={itm.key} className={cl.link} href={itm.href} rel="noreferrer" target="_blank">
            {itm.icon}
            <h3>{itm.key}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
