import React from 'react';
import introSvg from '../../../../assets/intro.svg';
import cl from './Intro.module.scss';
import {
  SiTwitter as IcoTwitter,
  SiTelegram as IcoTelegram,
  SiLinkedin as IcoLinkedin,
} from 'react-icons/si';
import { useSelector } from 'react-redux';

export default function Intro({ h1, h2, description }) {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const contactBtns = [
    { name: 'TWITTER', btn: <IcoTwitter />, href: 'https://twitter.com/' },
    { name: 'LINKEDIN', btn: <IcoLinkedin />, href: 'https://www.linkedin.com/' },
    { name: 'TELEGRAM', btn: <IcoTelegram />, href: 'https://bezmn.t.me/' },
  ];
  return (
    <section className={cl.intro}>
      <div className={cl.description}>
        <h1>{h1}</h1>
        <h2>{h2} </h2>
        <p>{description}</p>
        <div className={[cl.btn, cl[themeClass]].join(' ')}>
          {contactBtns.map((itm, idx) => (
            <a key={idx} href={itm.href} rel="noreferrer" target="_blank">
              <button className={cl[itm.name.toLowerCase()]}>
                {itm.btn}
                {itm.name}
              </button>
            </a>
          ))}
        </div>
      </div>
      <img src={introSvg} alt="blog decoration" style={{ width: '250px' }} />
    </section>
  );
}
