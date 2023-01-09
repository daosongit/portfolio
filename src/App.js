import React, { useState } from 'react';
import ActivityBar from './components/ActivityBar/ActivityBar';
import PrimarySideBar from './components/PrimarySideBar/PrimarySideBar';
export const PrimarySideBarCtx = React.createContext();

export default function App() {
  const [context, setContext] = useState({ key: '', isShown: false });
  return (
    <div className="App" style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <PrimarySideBarCtx.Provider value={{ context, setContext }}>
        <ActivityBar />
        <PrimarySideBar />
      </PrimarySideBarCtx.Provider>
    </div>
  );
}
