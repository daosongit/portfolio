import React, { useState } from 'react';
import cl from './Posts.module.scss';
import notebook540 from '../../../../assets/540x360.jpg';
import notebook850 from '../../../../assets/850x480.jpg';
import { InView } from 'react-intersection-observer';
import getPosts from './getPosts';

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
            <source media="(max-width: 850px) and (min-width: 700px)" srcSet={notebook540} />
            <source media="(max-width: 480px)" srcSet={notebook540} />
            <img src={notebook850} alt={`Post ${itm.id}`} />
          </picture>
          <div className={cl.text}>
            <figcaption>{itm.title}</figcaption>
            <p>{itm.description}</p>
          </div>
          <button>Read more</button>
        </figure>
      ))}
      <InView onChange={inViewCallback} />
    </section>
  );
}
