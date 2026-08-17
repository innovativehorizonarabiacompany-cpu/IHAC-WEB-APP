'use client';

export default function GlobalError({ error, unstable_retry }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: '#ffffff',
          color: '#111827',
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
              background: 'linear-gradient(135deg, #1a73e8, #00bcd4)',
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
              background: '#1a73e8',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 28px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}