import React, { useEffect, useRef, useState } from 'react';
import cl from './Posts.module.scss';
import { InView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getPosts from './../../../../redux/JsonApi/getPosts';
import Loading from '../Loading/Loading';

export default function Posts() {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const { posts, loading } = useSelector((state) => state.rdcPosts);
  const dispatch = useDispatch();
  const [shownPosts, setShownPosts] = useState([]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const loadPosts = () => {
    const TotalPosts = posts.length;

    if (shownPosts.length === TotalPosts) return;
    const PostLimit = 6;
    const postCount = shownPosts.length + PostLimit;
    const newPostsCount = postCount > TotalPosts ? TotalPosts : postCount;

    const buff = [];
    for (let i = shownPosts.length; i < newPostsCount; i++) {
      buff.push(posts[i]);
    }
    setShownPosts([...shownPosts, ...buff]);
  };

  useEffect(() => {
    if (loading) return;
    loadPosts();
  }, [loading]);

  const inViewCallback = (inView) => {
    if (inView) loadPosts();
  };

  const GeneratePosts = () => {
    return shownPosts.map((itm) => (
      <figure key={itm.id} className={cl[themeClass]}>
        <Link to={`/blog/post/${itm.id}`}>
          <picture>
            <source media="(max-width: 440px)" srcSet={itm.img300} />
            <source media="(max-width: 770px)" srcSet={itm.img540} />
            <source media="(max-width: 980px)" srcSet={itm.img850} />
            <source media="(max-width: 1200px)" srcSet={itm.img300} />
            <img src={itm.img540} alt={`Post ${itm.id}`} />
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
    ));
  };

  return (
    <>
      {shownPosts.length ? (
        <section className={cl.posts}>
          <GeneratePosts />
          <InView onChange={inViewCallback} />
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
