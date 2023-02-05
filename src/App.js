import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { createHashRouter, RouterProvider, useOutlet } from 'react-router-dom';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import ActivityBar from './components/ActivityBar/ActivityBar';
import EmptyMainPage from './pages/EmptyMainPage/EmptyMainPage';
import Blog, { BlogRoot } from './pages/Blog/Blog';
import PostDetails from './pages/Blog/PostDetails/PostDetails';
import Game from './pages/Game/Game';
import './styles/App.scss';
import ThemePreference from './pages/ThemePreference/ThemePreference';
import Error from './pages/Error/Error';

const Root = () => {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  const outlet = useOutlet();
  return (
    <div className={['App', themeClass].join(' ')}>
      <ActivityBar />
      {outlet || <EmptyMainPage />}
    </div>
  );
};

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
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
      {
        path: '/theme',
        element: <ThemePreference />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
