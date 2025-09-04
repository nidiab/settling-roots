import React from 'react';

export default function Products({ dict }) {
  return (
    <>
      <h1>{dict?.pageTitleH1 ?? 'Products'}</h1>
      <section className="product-grid">
        <article className="product-card" aria-labelledby="product-1-title">
          <header>
            <h2 id="product-1-title">{dict?.product1_title ?? 'Relocation Guide for Families'}</h2>
            <p className="product-subtitle">{dict?.product1_subtitle ?? 'Schools • Enrollment • Daily life'}</p>
          </header>
          <p className="product-desc">
            {dict?.product1_desc ??
              'A practical digital guide to help expat families navigate schools and community in Portugal: timelines, documents, enrollment, and how to settle smoothly.'}
          </p>
          <div className="product-cta">
            <span className="price">{dict?.product1_price ?? '€29'}</span>
            <a
              className="btn primary"
              href={dict?.product1_cta_href ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict?.product1_cta ?? 'Get it soon'}
            </a>
          </div>
        </article>
      </section>
    </>
  );
}
