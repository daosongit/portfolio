import React from 'react';
import { SiVisualstudio as IcoVS } from 'react-icons/si';
import cl from './EmptyMainPage.module.scss';

export default function EmptyMainPage() {
  return (
    <main className={cl.emptyPage}>
      <IcoVS size={350} style={{ color: 'rgba(24, 23, 23, .4)' }} />
    </main>
  );
}
