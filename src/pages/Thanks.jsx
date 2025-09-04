import React from 'react';

export default function Thanks({ dict }) {
  return (
    <>
      <h1>{dict?.title ?? 'Thank you!'}</h1>
      <p>{dict?.p1 ?? 'Your purchase was successful.'}</p>
      <p>
        {dict?.p2 ??
          'You will receive an email with your PDF shortly. Please check your inbox (and spam folder).'}
      </p>
      <p className="cta" dangerouslySetInnerHTML={{ __html: dict?.support ?? '' }} />
    </>
  );
}
