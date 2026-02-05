import { useState } from 'preact/hooks';

export function TestIsland() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      padding: '1rem',
      border: '2px solid #4f46e5',
      borderRadius: '0.5rem',
      backgroundColor: '#f3f4f6'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        ✅ Preact Island Test
      </h2>
      <p style={{ marginBottom: '0.5rem' }}>
        If you can click the button below and see the counter increment,
        Preact island hydration is working correctly!
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Count: {count}
      </button>
    </div>
  );
}
