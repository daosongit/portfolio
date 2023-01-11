import React, { useEffect, useState } from 'react';
import ActivityBar from './components/ActivityBar/ActivityBar';
import EmptyMainPage from './components/EmptyMainPage/EmptyMainPage';
import PrimarySideBar from './components/PrimarySideBar/PrimarySideBar';
import Blog from './pages/Blog/Blog';
export const PrimarySideBarCtx = React.createContext();

export default function App() {
  const [context, setContext] = useState({ key: '', isShown: false });

  return (
    <div className="App">
      {/* <PrimarySideBarCtx.Provider value={{ context, setContext }}>
        <ActivityBar />
        <PrimarySideBar />
        <EmptyMainPage />
      </PrimarySideBarCtx.Provider> */}
      <Blog />
    </div>
  );
}
