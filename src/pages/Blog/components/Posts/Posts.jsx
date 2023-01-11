import React from 'react';
import cl from './Posts.module.scss';
import uid from 'uniqid';
import notebook540 from '../../../../assets/540x360.jpg';
import notebook850 from '../../../../assets/850x480.jpg';

export default function Posts() {
  const arrPosts = [
    {
      id: 1,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 1',
      description:
        'Oft du von ja weißt in ich heimat so. Brust gefärbt ich glück sie denkst jedoch, fort ort mutter geschaut.',
    },
    {
      id: 2,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 2',
      description:
        'Festzuhalten mild und unbestimmten sich das mit, was wahn erste die stunden nach bilder äolsharfe ich nun. Schwebet jenem sich.',
    },
    {
      id: 3,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 3',
      description:
        'E la facciamo quegli noi di, se con maesta nostri nel, le a al coloro nome. Non divina della maesta.',
    },
    {
      id: 4,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 4',
      description:
        'There the whose flee reverie low, their agen below parasites he from chaste, the their might condemned by could day.',
    },
    {
      id: 5,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 5',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 6,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 6',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 7,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 7',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 8,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 8',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 9,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 9',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 10,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 10',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 11,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 11',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 12,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 12',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
    {
      id: 13,
      img540: notebook540,
      img850: notebook850,
      title: 'Post 13',
      description:
        'Amet amet no magna ea nonumy elitr dolor. Duo takimata est erat gubergren. Ipsum eos sea ipsum gubergren dolor duo.',
    },
  ];

  return (
    <section className={cl.posts}>
      {arrPosts.map((itm) => (
        <figure key={uid()}>
          <picture>
            <source media="(max-width: 850px) and (min-width: 700px)" srcSet={notebook540} />
            <source media="(max-width: 480px)" srcSet={notebook540} />
            <img src={notebook850} alt={`Post ${itm.id}`} />
          </picture>
          <div className={cl.text}>
            <figcaption>{itm.title}</figcaption>
            <p>{itm.description}</p>
          </div>
          <button>Read more</button>
        </figure>
      ))}
    </section>
  );
}
