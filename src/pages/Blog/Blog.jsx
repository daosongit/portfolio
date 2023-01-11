import React from 'react';
import cl from './Blog.module.scss';
import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import Posts from './components/Posts/Posts';

export default function Blog() {
  return (
    <div className={cl.blogWrapper}>
      <div className={cl.blog}>
        <Header />
        <main>
          <Intro />
          <Posts />
        </main>
      </div>
    </div>
  );
}
