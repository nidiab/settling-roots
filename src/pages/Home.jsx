import React from 'react';

export default function Home({ dict }) {
  return (
    <>
      <h1>{dict?.title ?? 'Settling Roots Portugal'}</h1>
      <p className="tagline">{dict?.tagline ?? ''}</p>
      <div className="soon">{dict?.comingSoon ?? ''}</div>
      <div className="cta" dangerouslySetInnerHTML={{ __html: dict?.cta ?? '' }} />
    </>
  );
}
