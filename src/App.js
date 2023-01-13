import React, { useState } from 'react';
import ActivityBar from './components/ActivityBar/ActivityBar';
import EmptyMainPage from './components/EmptyMainPage/EmptyMainPage';
import PrimarySideBar from './components/PrimarySideBar/PrimarySideBar';
import Blog, { BlogRoot } from './pages/Blog/Blog';
import { createBrowserRouter, RouterProvider, useOutlet } from 'react-router-dom';
import PostDetails from './pages/Blog/PostDetails/PostDetails';
import Game from './pages/Game/Game';
export const PrimarySideBarCtx = React.createContext();

const Root = () => {
  const outlet = useOutlet();
  const [context, setContext] = useState({ key: 'Explorer', isShown: true });
  return (
    <div style={{ display: 'flex' }}>
      <PrimarySideBarCtx.Provider value={{ context, setContext }}>
        <ActivityBar />
        <PrimarySideBar />
        {outlet || <EmptyMainPage />}
      </PrimarySideBarCtx.Provider>
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
  return <RouterProvider router={router} />;
}
