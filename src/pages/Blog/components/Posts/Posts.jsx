import React, { useState } from 'react';
import cl from './Posts.module.scss';
import { InView } from 'react-intersection-observer';
import getPosts from '../../getPosts';
import { Link, NavLink } from 'react-router-dom';

export default function Posts() {
  const PostsArray = getPosts();
  const [posts, setPosts] = useState([]);
  const PostLimit = 6;
  const TotalPosts = PostsArray.length;

  const loadPosts = () => {
    if (posts.length === TotalPosts) return;
    const postCount = posts.length + PostLimit;
    const newPostsCount = postCount > TotalPosts ? TotalPosts : postCount;

    const buff = [];
    for (let i = posts.length; i < newPostsCount; i++) {
      buff.push(PostsArray[i]);
    }
    setPosts([...posts, ...buff]);
  };

  const inViewCallback = (inView) => {
    if (inView) loadPosts();
  };

  return (
    <section className={cl.posts}>
      {posts.map((itm) => (
        <figure key={itm.id}>
          <picture>
            <source media="(max-width: 850px) and (min-width: 700px)" srcSet={itm.img540} />
            <source media="(max-width: 480px)" srcSet={itm.img540} />
            <img src={itm.img850} alt={`Post ${itm.id}`} />
          </picture>
          <div className={cl.text}>
            <figcaption>{itm.title}</figcaption>
            <p>{itm.description}</p>
          </div>
          <Link to={`/blog/post/${itm.id}`}>
            <button>Read more</button>
          </Link>
        </figure>
      ))}
      <InView onChange={inViewCallback} />
    </section>
  );
}
