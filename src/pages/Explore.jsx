import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import axios from 'axios';
import { API } from '../context/AuthContext';
import DishCard from '../components/DishCard';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Sweets', 'Beverages', 'Thali'];

export default function Explore() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isVeg, setIsVeg] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchDishes();
  }, [category, isVeg]);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (isVeg !== 'all') params.isVeg = isVeg === 'veg';
      const { data } = await axios.get(`${API}/dishes`, { params });
      setDishes(data);
    } catch {
      setDishes([]);
    } finally { setLoading(false); }
  };

  const filtered = dishes.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.description?.toLowerCase().includes(search.toLowerCase()) ||
    d.chef?.kitchenName?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'orders') return b.ordersCount - a.ordersCount;
    return 0;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--bg-alt), var(--cream-dark))', padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Explore Homemade Food 🍛
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>Discover authentic meals from verified home chefs near you</p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '520px' }}>
            <Search size={19} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="form-input"
              placeholder="Search dishes, kitchens..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2.8rem', paddingRight: search ? '3rem' : '1rem', fontSize: '1rem' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={17}/>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Filters Row */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {/* Category chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: '0.45rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '600',
                border: category === cat ? 'none' : '1px solid var(--border)',
                background: category === cat ? 'var(--saffron)' : 'var(--bg-card)',
                color: category === cat ? 'white' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>{cat}</button>
            ))}
          </div>

          {/* Veg filter */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[['all', 'All'], ['veg', '🌱 Veg'], ['nonveg', '🍖 Non-Veg']].map(([val, label]) => (
              <button key={val} onClick={() => setIsVeg(val)} style={{
                padding: '0.45rem 0.85rem', borderRadius: '50px', fontSize: '0.82rem', fontWeight: '600',
                border: isVeg === val ? 'none' : '1px solid var(--border)',
                background: isVeg === val ? 'var(--mint)' : 'var(--bg-card)',
                color: isVeg === val ? 'white' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>{label}</button>
            ))}
          </div>

          {/* Sort */}
          <select className="form-input" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', fontSize: '0.85rem', padding: '0.45rem 2rem 0.45rem 0.85rem' }}>
            <option value="default">Sort: Default</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="orders">Most Ordered</option>
          </select>
        </div>

        {/* Results */}
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          {loading ? 'Loading...' : `${sorted.length} dishes found`}
        </div>

        {loading ? (
          <div className="page-loading"><div className="loading-spinner" /><p style={{ color: 'var(--text-muted)' }}>Fetching fresh food...</p></div>
        ) : sorted.length > 0 ? (
          <div className="grid-3">
            {sorted.map(d => <DishCard key={d._id} dish={d} />)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🍽️</div>
            <h3>No dishes found</h3>
            <p>Try a different search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
