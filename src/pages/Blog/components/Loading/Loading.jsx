import cl from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={cl.ringWrapper}>
      <div className={cl.ring}>
        Loading
        <span></span>
      </div>
    </div>
  );
}
