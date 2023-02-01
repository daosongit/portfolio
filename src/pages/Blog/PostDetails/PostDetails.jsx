import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Intro from '../components/Intro/Intro';
import cl from './PostDetails.module.scss';
import getPosts from './../../../redux/JsonApi/getPosts';
import Loading from '../components/Loading/Loading';

export default function PostDetails() {
  const param = useParams();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.rdcPosts);
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    if (posts.length && !post) {
      setPost(posts.find((a) => a.id == param.id));
    } else if (!post) {
      dispatch(getPosts());
    }
  }, [loading, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {!post ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}
