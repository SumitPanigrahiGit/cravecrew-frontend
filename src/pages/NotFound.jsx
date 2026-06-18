import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', paddingTop: '70px' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🍽️</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
          Looks like this dish is not on the menu. Let's get you back home!
        </p>
        <Link to="/">
          <button className="btn btn-primary btn-lg">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
