import React from 'react';
import cl from './Header.module.scss';
import hireSvg from '../../../../assets/hireMe.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  return (
    <header className={[cl.header, cl[themeClass]].join(' ')}>
      <Link to="/blog">
        <h1>Ivan Kulai BLOG</h1>
      </Link>
      <a href="https://www.linkedin.com" target="_blank">
        <img src={hireSvg} alt="hire me" />
      </a>
    </header>
  );
}
