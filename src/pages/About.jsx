import React from 'react'

export default function About({ dict }) {
  return (
    <>
      <h1>{dict?.aboutTitle ?? 'About Settling Roots'}</h1>

      <section>
        <p>{dict?.p1 ?? ''}</p>
      </section>

      <section>
        <h2>{dict?.section1 ?? ''}</h2>
        <p>{dict?.p2 ?? ''}</p>
        <p>{dict?.p3 ?? ''}</p>
      </section>

      <section>
        <h2>{dict?.section2 ?? ''}</h2>
        <p>{dict?.p4 ?? ''}</p>
      </section>

      <section>
        <h2>{dict?.section3 ?? ''}</h2>
        <ul>
          <li>{dict?.li1 ?? ''}</li>
          <li>{dict?.li2 ?? ''}</li>
          <li>{dict?.li3 ?? ''}</li>
          <li>{dict?.li4 ?? ''}</li>
          <li>{dict?.li5 ?? ''}</li>
        </ul>
      </section>
    </>
  )
}
