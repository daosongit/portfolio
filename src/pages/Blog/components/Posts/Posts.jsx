import React, { useState } from 'react';
import cl from './Posts.module.scss';
import { InView } from 'react-intersection-observer';
import getPosts from '../../getPosts';
import { Link } from 'react-router-dom';

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
          <Link to={`/blog/post/${itm.id}`}>
            <picture>
              <source media="(max-width: 770px)" srcSet={itm.img540} />
              <source media="(max-width: 980px)" srcSet={itm.img850} />
              <source media="(max-width: 1080px)" srcSet={itm.img300} />
              <div className={cl.imgWrapper}>
                <img src={itm.img540} alt={`Post ${itm.id}`} />
              </div>
            </picture>
          </Link>
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
