import { useState } from 'preact/hooks';

export function SimpleTest() {
  const [count, setCount] = useState(0);

  console.log('SimpleTest rendered, count:', count);

  const handleClick = () => {
    console.log('Button clicked! Current count:', count);
    setCount(count + 1);
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px 0' }}>
      <h3>Simple Counter Test</h3>
      <p>Count: {count}</p>
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Click Me
      </button>
    </div>
  );
}
