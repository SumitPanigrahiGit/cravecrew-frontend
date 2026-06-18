import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Clock, CheckCircle, XCircle, Package, Star } from 'lucide-react';
import axios from 'axios';
import { API } from '../context/AuthContext';

const STATUS_CONFIG = {
  placed: { label: 'Order Placed', color: '#6366F1', icon: Package },
  accepted: { label: 'Accepted', color: '#F5C842', icon: CheckCircle },
  preparing: { label: 'Preparing', color: '#E8821A', icon: Clock },
  ready: { label: 'Ready', color: '#2ECC8A', icon: CheckCircle },
  delivered: { label: 'Delivered', color: '#2ECC8A', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: '#DC3545', icon: XCircle },
};

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    axios.get(`${API}/orders/my-orders`).then(r => setOrders(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const active = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
  const past = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Welcome */}
        <div style={{
          background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))',
          borderRadius: '24px', padding: '2rem 2.5rem', marginBottom: '2rem', color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.25rem' }}>
                Hey {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>Your homemade food dashboard</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/explore">
                <button className="btn" style={{ background: 'white', color: 'var(--saffron)', fontWeight: '700' }}>
                  <ShoppingBag size={16}/> Order Food
                </button>
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.75rem' }}>
            {[
              { label: 'Total Orders', value: orders.length },
              { label: 'Active', value: active.length },
              { label: 'Delivered', value: past.filter(o => o.status === 'delivered').length }
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '14px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'Playfair Display, serif' }}>{value}</div>
                <div style={{ opacity: 0.8, fontSize: '0.82rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* First order promo */}
        {user?.isFirstOrder && (
          <div style={{
            background: 'rgba(46,204,138,0.1)', border: '1.5px dashed var(--mint)',
            borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <div>
              <p style={{ fontWeight: '700', color: 'var(--mint-dark)', fontSize: '0.95rem' }}>🎉 You have ₹100 first-order discount waiting!</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Applies automatically on your first order.</p>
            </div>
            <Link to="/explore"><button className="btn btn-mint btn-sm">Order Now →</button></Link>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[['active', `Active Orders (${active.length})`], ['past', `Past Orders (${past.length})`]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: '0.55rem 1.25rem', borderRadius: '50px', fontWeight: '600', fontSize: '0.88rem',
              border: activeTab === id ? 'none' : '1px solid var(--border)',
              background: activeTab === id ? 'var(--saffron)' : 'var(--bg-card)',
              color: activeTab === id ? 'white' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.2s'
            }}>{label}</button>
          ))}
        </div>

        {loading ? (
          <div className="page-loading"><div className="loading-spinner"/></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(activeTab === 'active' ? active : past).length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <h3>{activeTab === 'active' ? 'No active orders' : 'No past orders'}</h3>
                <p>{activeTab === 'active' ? 'Place your first order and enjoy homemade food!' : 'Your order history will appear here.'}</p>
                <Link to="/explore"><button className="btn btn-primary" style={{ marginTop: '1rem' }}>Explore Food</button></Link>
              </div>
            ) : (
              (activeTab === 'active' ? active : past).map(order => <OrderCard key={order._id} order={order} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
  const Icon = cfg.icon;

  return (
    <div style={{
      background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border)', overflow: 'hidden'
    }}>
      {/* Status bar */}
      <div style={{ background: cfg.color, height: '4px', width: '100%' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <p style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1rem' }}>
              {order.chef?.kitchenName || order.chef?.name}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700',
            background: `${cfg.color}18`, color: cfg.color
          }}>
            <Icon size={14}/> {cfg.label}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
          {order.items?.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.87rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.name} × {item.quantity}</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            {order.discountApplied > 0 && (
              <span style={{ fontSize: '0.78rem', color: 'var(--mint-dark)', fontWeight: '600', marginRight: '0.75rem' }}>
                🎉 ₹{order.discountApplied} off applied
              </span>
            )}
            <span style={{ fontWeight: '700', color: 'var(--saffron)', fontSize: '1rem' }}>Total: ₹{order.finalAmount}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: '0.5rem' }}>via {order.paymentMethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
