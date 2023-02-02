import { useSelector } from 'react-redux';
import cl from './Loading.module.scss';

export default function Loading() {
  const themeClass = useSelector((state) => state.rdcTheme.cssSelector);
  return (
    <section className={cl.ringWrapper}>
      <div className={[cl.ring, cl[themeClass]].join(' ')}>
        Loading
        <span></span>
      </div>
    </section>
  );
}
