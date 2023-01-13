import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Intro from '../components/Intro/Intro';
import getPosts from '../getPosts';
import cl from './PostDetails.module.scss';

export default function PostDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const param = useParams();
  const post = getPosts().find((a) => a.id == param.id);
  return (
    <main>
      <Intro h1="Blog Post" h2={`Post ${post.id}`} description={post.description} />
      <section>
        <div className={cl.imgWrapper}>
          <picture>
            <source media="(max-width: 700px)" srcSet={post.img540} />
            <source media="(max-width: 980px)" srcSet={post.img850} />
            <img src={post.img1280} alt={`Post ${post.id}`} />
          </picture>
        </div>
        <div className={cl.details}>
          {post.details.map((itm, idx) => (
            <div key={idx}>
              <h1>{`POST DETAILS H${idx + 1}`}</h1>
              <p>{itm}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
