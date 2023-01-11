import React from 'react';
import introSvg from '../../../../assets/intro.svg';
import cl from './Intro.module.scss';
import {
  SiTwitter as IcoTwitter,
  SiTelegram as IcoTelegram,
  SiLinkedin as IcoLinkedin,
} from 'react-icons/si';

export default function Intro() {
  const contactBtns = [
    { name: 'TWITTER', btn: <IcoTwitter />, href: 'https://twitter.com/' },
    { name: 'LINKEDIN', btn: <IcoLinkedin />, href: 'https://www.linkedin.com/' },
    { name: 'TELEGRAM', btn: <IcoTelegram />, href: 'https://bezmn.t.me/' },
  ];
  return (
    <section className={cl.intro}>
      <div className={cl.description}>
        <h1>Blog Posts</h1>
        <h2>I think so, this is it. </h2>
        <p>
          Design begins after I begin to think about how to present an experience most successfully,
          whether a button I put in can solve a problem. The only point in design is not ui design,
          if the user does not have a good experience at the end of the product, the design will be
          considered unsuccessful in my opinion.
        </p>
        <div className={cl.btn}>
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
      <img src={introSvg} alt="blog description decoration" style={{ width: '250px' }} />
    </section>
  );
}
