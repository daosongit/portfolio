import React, { useContext } from 'react';
import cl from './Blog.module.scss';
import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import Posts from './components/Posts/Posts';
import { Outlet } from 'react-router-dom';

export const BlogRoot = () => {
  return (
    <div className={cl.blog}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default function Blog() {
  const intro = {
    h1: 'Blog Posts',
    h2: 'I think so, this is it.',
    description: `Design begins after I begin to think about how to present an experience most successfully,
    whether a button I put in can solve a problem. The only point in design is not ui design,
    if the user does not have a good experience at the end of the product, the design will be
    considered unsuccessful in my opinion.`,
  };
  return (
    <main>
      <Intro h1={intro.h1} h2={intro.h2} description={intro.description} />
      <Posts />
    </main>
  );
}
