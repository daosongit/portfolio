import cl from './Loading.module.scss';

export default function Loading() {
  return (
    <section className={cl.ringWrapper}>
      <div className={cl.ring}>
        Loading
        <span></span>
      </div>
    </section>
  );
}
