import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ChefHat, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { API } from '../context/AuthContext';

export default function Chefs() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    axios.get(`${API}/chefs`).then(r => setChefs(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = chefs.filter(c =>
    (c.kitchenName?.toLowerCase().includes(search.toLowerCase()) || c.name?.toLowerCase().includes(search.toLowerCase())) &&
    (city === '' || c.city?.toLowerCase().includes(city.toLowerCase()))
  );

  const cities = [...new Set(chefs.map(c => c.city).filter(Boolean))];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)', padding: '3rem 0' }}>
        <div className="container">
          <span className="section-eyebrow">Our Home Chefs</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Meet the Cooks Behind the Magic 👩‍🍳
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', maxWidth: '500px' }}>Real homemakers turning their passion for cooking into a livelihood. Browse verified home kitchens near you.</p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '400px' }}>
              <Search size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="form-input" placeholder="Search kitchens..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.8rem' }} />
            </div>
            <select className="form-input" value={city} onChange={e => setCity(e.target.value)} style={{ width: 'auto', minWidth: '150px' }}>
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {loading ? (
          <div className="page-loading"><div className="loading-spinner"/></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👩‍🍳</div>
            <h3>No chefs found</h3>
            <p>Be the first chef to join CraveCrew in your city!</p>
            <Link to="/register"><button className="btn btn-primary" style={{ marginTop: '1rem' }}>Register as Chef</button></Link>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(chef => <ChefCard key={chef._id} chef={chef} />)}
          </div>
        )}
      </div>

      {/* CTA for chefs */}
      <div style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', padding: '4rem 0', textAlign: 'center', marginTop: '2rem' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'white', marginBottom: '0.75rem' }}>
            Are You a Home Cook? 🍳
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1rem', maxWidth: '460px', margin: '0 auto 2rem' }}>
            Turn your kitchen into a cloud kitchen. Earn income doing what you love — cooking for people who crave real homemade food.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button className="btn btn-lg" style={{ background: 'white', color: 'var(--saffron)', fontWeight: '700' }}>
                <ChefHat size={18}/> Start Your Kitchen
              </button>
            </Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKdJvf53qxw_M1enw4UdYSPOhh4b9ql9s6qrmXImE3rvW_jg/viewform" target="_blank" rel="noreferrer">
              <button className="btn btn-lg" style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.6)' }}>
                Apply via Google Form ↗
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChefCard({ chef }) {
  const Stars = ({ n }) => (
    <div className="stars">
      {[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= Math.round(n) ? 'filled' : 'empty'}`}>★</span>)}
    </div>
  );

  return (
    <Link to={`/chefs/${chef._id}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 0 }}>
        {/* Cover */}
        <div style={{
          height: '120px',
          background: `linear-gradient(135deg, ${['#E8821A','#2ECC8A','#6366F1','#F5C842'][chef.name?.charCodeAt(0) % 4]}22, ${['#F5C842','#E8821A','#2ECC8A','#6366F1'][chef.name?.charCodeAt(0) % 4]}33)`,
          position: 'relative'
        }}>
          {chef.isVerified && (
            <div style={{
              position: 'absolute', top: '10px', right: '10px',
              background: 'var(--mint)', color: 'white',
              borderRadius: '20px', padding: '0.25rem 0.7rem', fontSize: '0.72rem', fontWeight: '700'
            }}>✓ Verified</div>
          )}
        </div>

        <div style={{ padding: '0 1.5rem 1.5rem', position: 'relative' }}>
          {/* Avatar */}
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px',
            background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.4rem', fontWeight: '800', fontFamily: 'Playfair Display, serif',
            border: '3px solid var(--bg-card)',
            marginTop: '-30px', marginBottom: '0.75rem',
            boxShadow: '0 4px 16px rgba(232,130,26,0.3)'
          }}>
            {chef.name?.[0]?.toUpperCase()}
          </div>

          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            {chef.kitchenName || chef.name + "'s Kitchen"}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>by {chef.name}</p>

          {chef.city && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              <MapPin size={13} style={{ color: 'var(--saffron)' }} /> {chef.city}
            </div>
          )}

          {chef.specialties?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
              {chef.specialties.slice(0, 3).map(s => (
                <span key={s} style={{
                  background: 'var(--bg-alt)', borderRadius: '20px',
                  padding: '0.2rem 0.6rem', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '500'
                }}>{s}</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Stars n={chef.rating || 0} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{chef.totalOrders || 0} orders</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--saffron)', fontWeight: '600', fontSize: '0.85rem' }}>
              View Menu <ArrowRight size={15}/>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
