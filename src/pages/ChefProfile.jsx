import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Phone, ArrowLeft, ChefHat, Package } from 'lucide-react';
import axios from 'axios';
import { API } from '../context/AuthContext';
import DishCard from '../components/DishCard';

export default function ChefProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get(`${API}/chefs/${id}`).then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-loading" style={{ paddingTop: '90px' }}><div className="loading-spinner"/></div>;
  if (!data) return <div className="page-loading" style={{ paddingTop: '90px' }}><p>Chef not found.</p></div>;

  const { chef, dishes } = data;
  const categories = ['All', ...new Set(dishes.map(d => d.category))];
  const filtered = filter === 'All' ? dishes : dishes.filter(d => d.category === filter);

  const Stars = ({ n }) => (
    <div className="stars">
      {[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= Math.round(n||0) ? 'filled' : 'empty'}`}>★</span>)}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Back */}
        <Link to="/chefs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem', fontWeight: '500' }}>
          <ArrowLeft size={16}/> Back to Chefs
        </Link>

        {/* Chef Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1206, #2D1F0A)',
          borderRadius: '24px', padding: '2.5rem', marginBottom: '2rem', color: 'white',
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'center'
        }}>
          <div style={{
            width: '90px', height: '90px', borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', fontWeight: '800', fontFamily: 'Playfair Display, serif',
            flexShrink: 0, boxShadow: '0 8px 24px rgba(232,130,26,0.4)'
          }}>
            {chef.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
                {chef.kitchenName || chef.name + "'s Kitchen"}
              </h1>
              {chef.isVerified && (
                <span style={{ background: 'var(--mint)', color: 'white', borderRadius: '20px', padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: '700' }}>✓ Verified</span>
              )}
            </div>
            <p style={{ opacity: 0.7, marginBottom: '0.75rem', fontSize: '0.9rem' }}>by {chef.name}</p>

            {chef.kitchenDescription && (
              <p style={{ opacity: 0.75, fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1rem', maxWidth: '500px' }}>{chef.kitchenDescription}</p>
            )}

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {chef.city && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.7, fontSize: '0.85rem' }}>
                  <MapPin size={14} style={{ color: 'var(--turmeric)' }}/> {chef.city}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Stars n={chef.rating}/>
                <span style={{ opacity: 0.7, fontSize: '0.82rem' }}>{chef.rating?.toFixed(1) || 'New'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.7, fontSize: '0.85rem' }}>
                <Package size={14} style={{ color: 'var(--turmeric)' }}/> {chef.totalOrders || 0} orders
              </div>
            </div>

            {chef.specialties?.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                {chef.specialties.map(s => (
                  <span key={s} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0.25rem 0.75rem', fontSize: '0.76rem', fontWeight: '500' }}>{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              Menu ({dishes.length} dishes)
            </h2>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  padding: '0.4rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600',
                  border: filter === cat ? 'none' : '1px solid var(--border)',
                  background: filter === cat ? 'var(--saffron)' : 'var(--bg-card)',
                  color: filter === cat ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>{cat}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🍽️</div>
              <h3>No dishes in this category</h3>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map(d => <DishCard key={d._id} dish={{ ...d, chef }} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
