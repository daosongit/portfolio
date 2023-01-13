import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, useOutlet } from 'react-router-dom';
import store from './redux/store';

import ActivityBar from './components/ActivityBar/ActivityBar';
import EmptyMainPage from './components/EmptyMainPage/EmptyMainPage';
import PrimarySideBar from './components/PrimarySideBar/PrimarySideBar';
import Blog, { BlogRoot } from './pages/Blog/Blog';
import PostDetails from './pages/Blog/PostDetails/PostDetails';
import Game from './pages/Game/Game';

const Root = () => {
  const outlet = useOutlet();
  return (
    <div style={{ display: 'flex' }}>
      <ActivityBar />
      <PrimarySideBar />
      {outlet || <EmptyMainPage />}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/blog',
        element: <BlogRoot />,
        children: [
          {
            path: '/blog',
            element: <Blog />,
          },
          {
            path: '/blog/post/:id',
            element: <PostDetails />,
          },
        ],
      },
      {
        path: '/game',
        element: <Game />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
