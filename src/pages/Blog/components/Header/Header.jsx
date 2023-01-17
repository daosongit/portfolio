import React from 'react';
import cl from './Header.module.scss';
import hireSvg from '../../../../assets/hireMe.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={cl.header}>
      <Link to="/blog">
        <h1>Ivan Kulai BLOG</h1>
      </Link>
      <a href="https://www.linkedin.com">
        <img src={hireSvg} alt="hire me" />
      </a>
    </header>
  );
}
