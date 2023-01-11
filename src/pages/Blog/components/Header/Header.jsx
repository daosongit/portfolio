import React from 'react';
import cl from './Header.module.scss';
import hireSvg from '../../../../assets/hireMe.svg';

export default function Header() {
  return (
    <header className={cl.header}>
      <h1>Ivan Kulai BLOG</h1>
      <a href="https://www.linkedin.com">
        <img src={hireSvg} alt="hire me" style={{ width: '60px' }} />
      </a>
    </header>
  );
}
