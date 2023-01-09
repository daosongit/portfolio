import React, { useContext } from 'react';
import { SiVisualstudio as IcoVS } from 'react-icons/si';
import { PrimarySideBarCtx } from '../../App';
import cl from './EmptyMainPage.module.scss';

export default function EmptyMainPage() {
  const ctx = useContext(PrimarySideBarCtx);
  return (
    <section className={[cl.emptyPage, ctx.context.isShown ? cl.sidebar : ''].join(' ')}>
      <IcoVS size={200} style={{ color: 'rgba(24, 23, 23, .4)' }} />
    </section>
  );
}
