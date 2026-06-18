import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Plus, Minus, ShoppingCart, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const FOOD_EMOJIS = { Breakfast: '🥞', Lunch: '🍛', Dinner: '🍲', Snacks: '🥪', Sweets: '🍮', Beverages: '☕', Thali: '🥘' };
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
  'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80',
  'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
  'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80',
];

export default function DishCard({ dish }) {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);

  const cartItem = cart.items.find(i => i._id === dish._id);
  const imgSrc = (!dish.image || imgError)
    ? PLACEHOLDER_IMAGES[dish.name?.charCodeAt(0) % PLACEHOLDER_IMAGES.length]
    : dish.image;

  const handleAdd = () => {
    if (!user) { toast.error('Please login to order food'); return; }
    if (user.role === 'chef') { toast.error('Chefs cannot place orders'); return; }
    addToCart(dish, dish.chef || { _id: dish.chefId });
    toast.success(`${dish.name} added to cart! 🛒`);
  };

  const Stars = ({ rating = 0 }) => (
    <div className="stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`star ${s <= Math.round(rating) ? 'filled' : 'empty'}`}>★</span>
      ))}
    </div>
  );

  return (
    <div className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <img
          src={imgSrc}
          alt={dish.name}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        {/* Overlays */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
          <span className={`badge ${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
            {dish.isVeg ? '🌱 Veg' : '🍖 Non-Veg'}
          </span>
        </div>
        <div style={{
          position: 'absolute', top: '10px', right: '10px',
          background: 'rgba(0,0,0,0.6)', color: 'white',
          borderRadius: '8px', padding: '0.2rem 0.5rem',
          fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          <Clock size={11} /> {dish.preparationTime}m
        </div>
        <div style={{
          position: 'absolute', bottom: '10px', right: '10px',
          background: 'var(--saffron)', color: 'white',
          borderRadius: '10px', padding: '0.3rem 0.6rem', fontSize: '1rem'
        }}>
          {FOOD_EMOJIS[dish.category] || '🍽️'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.3' }}>
            {dish.name}
          </h3>
          <span style={{ color: 'var(--saffron)', fontWeight: '700', fontSize: '1.05rem', flexShrink: 0, marginLeft: '0.5rem' }}>
            ₹{dish.price}
          </span>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.5', flex: 1 }}>
          {dish.description?.length > 80 ? dish.description.slice(0, 80) + '...' : dish.description}
        </p>

        {/* Chef info */}
        {dish.chef && (
          <Link to={`/chefs/${dish.chef._id || dish.chef}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.6rem', fontWeight: '700' }}>
                {(dish.chef.name || 'C')?.[0]}
              </div>
              <span style={{ color: 'var(--saffron)', fontWeight: '500' }}>{dish.chef.kitchenName || dish.chef.name}</span>
              {dish.chef.city && <span>· {dish.chef.city}</span>}
            </div>
          </Link>
        )}

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Stars rating={dish.rating} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            {dish.rating > 0 ? dish.rating.toFixed(1) : 'New'} · {dish.ordersCount} orders
          </span>
          {dish.ordersCount > 50 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#FF6B35', fontSize: '0.75rem', fontWeight: '600' }}>
              <Flame size={12} /> Popular
            </span>
          )}
        </div>

        {/* Cart Control */}
        <div style={{ marginTop: '0.25rem' }}>
          {cartItem ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => updateQuantity(dish._id, cartItem.quantity - 1)} style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'var(--bg-alt)', border: '1.5px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <Minus size={15} />
              </button>
              <span style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--saffron)', minWidth: '24px', textAlign: 'center' }}>
                {cartItem.quantity}
              </span>
              <button onClick={() => updateQuantity(dish._id, cartItem.quantity + 1)} style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'var(--saffron)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <Plus size={15} />
              </button>
            </div>
          ) : (
            <button onClick={handleAdd} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <ShoppingCart size={16} /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
