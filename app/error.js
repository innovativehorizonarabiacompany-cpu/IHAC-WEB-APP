'use client';

import { useEffect } from 'react';

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <div
          style={{
            width: 72,
            height: 72,
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          !
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 12px' }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.75, margin: '0 0 24px' }}>
          An unexpected error occurred while loading this page.
          {error && error.message ? (
            <code style={{ display: 'block', marginTop: 12, fontSize: '0.8rem', opacity: 0.6 }}>
              {error.message}
            </code>
          ) : null}
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm, 8px)',
            padding: '12px 28px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}