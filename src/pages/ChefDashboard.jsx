import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, Eye, EyeOff, ChefHat, TrendingUp, Package, Star, CheckCircle, Clock, X } from 'lucide-react';
import axios from 'axios';
import { API } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Sweets', 'Beverages', 'Thali'];

const STATUS_FLOW = ['placed', 'accepted', 'preparing', 'ready', 'delivered'];
const STATUS_LABELS = { placed: 'Placed', accepted: 'Accepted', preparing: 'Preparing', ready: 'Ready', delivered: 'Delivered', cancelled: 'Cancelled' };
const STATUS_COLORS = { placed: '#6366F1', accepted: '#F5C842', preparing: '#E8821A', ready: '#2ECC8A', delivered: '#2ECC8A', cancelled: '#DC3545' };

const EMPTY_DISH = { name: '', description: '', price: '', category: 'Lunch', cuisine: 'Indian', isVeg: true, preparationTime: 30, servings: 1, image: '', ingredients: '' };

export default function ChefDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('orders');
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [form, setForm] = useState(EMPTY_DISH);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [d, o] = await Promise.all([
        axios.get(`${API}/dishes/chef/my-dishes`),
        axios.get(`${API}/orders/chef-orders`)
      ]);
      setDishes(d.data);
      setOrders(o.data);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditingDish(null); setForm(EMPTY_DISH); setShowModal(true); };
  const openEdit = (dish) => {
    setEditingDish(dish);
    setForm({ ...dish, ingredients: dish.ingredients?.join(', ') || '', price: String(dish.price) });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.description) { toast.error('Fill in name, price, and description'); return; }
    try {
      const payload = { ...form, price: Number(form.price), ingredients: form.ingredients ? form.ingredients.split(',').map(s => s.trim()) : [] };
      if (editingDish) {
        const { data } = await axios.put(`${API}/dishes/${editingDish._id}`, payload);
        setDishes(prev => prev.map(d => d._id === data._id ? data : d));
        toast.success('Dish updated!');
      } else {
        const { data } = await axios.post(`${API}/dishes`, payload);
        setDishes(prev => [data, ...prev]);
        toast.success('Dish added! 🍛');
      }
      setShowModal(false);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save dish'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this dish?')) return;
    try {
      await axios.delete(`${API}/dishes/${id}`);
      setDishes(prev => prev.filter(d => d._id !== id));
      toast.success('Dish removed');
    } catch { toast.error('Failed to delete dish'); }
  };

  const toggleAvailability = async (dish) => {
    try {
      const { data } = await axios.put(`${API}/dishes/${dish._id}`, { isAvailable: !dish.isAvailable });
      setDishes(prev => prev.map(d => d._id === data._id ? data : d));
    } catch { toast.error('Failed to update'); }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.put(`${API}/orders/${orderId}/status`, { status });
      setOrders(prev => prev.map(o => o._id === data._id ? { ...o, status: data.status } : o));
      toast.success(`Order marked as ${STATUS_LABELS[status]}`);
    } catch { toast.error('Failed to update order'); }
  };

  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.finalAmount, 0);
  const pendingOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1206 0%, #2D1F0A 100%)',
          borderRadius: '24px', padding: '2rem 2.5rem', marginBottom: '2rem', color: 'white', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(232,130,26,0.12)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <ChefHat size={24} style={{ color: 'var(--turmeric)' }} />
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.7rem' }}>
                  {user?.kitchenName || 'My Kitchen'}
                </h1>
              </div>
              <p style={{ opacity: 0.65, fontSize: '0.9rem' }}>Chef: {user?.name} · {user?.city}</p>
            </div>
            <button onClick={openAdd} className="btn" style={{ background: 'var(--saffron)', color: 'white' }}>
              <Plus size={18}/> Add Dish
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.75rem' }}>
            {[
              { label: 'Total Dishes', value: dishes.length, icon: '🍛' },
              { label: 'Total Orders', value: orders.length, icon: '📦' },
              { label: 'Pending', value: pendingOrders.length, icon: '⏳' },
              { label: 'Revenue', value: `₹${totalRevenue}`, icon: '💰' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{icon}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'Playfair Display, serif' }}>{value}</div>
                <div style={{ opacity: 0.65, fontSize: '0.78rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {[['orders', `Orders (${pendingOrders.length} active)`], ['dishes', `My Menu (${dishes.length})`], ['history', 'Order History']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding: '0.55rem 1.25rem', borderRadius: '50px', fontWeight: '600', fontSize: '0.88rem',
              border: tab === id ? 'none' : '1px solid var(--border)',
              background: tab === id ? 'var(--saffron)' : 'var(--bg-card)',
              color: tab === id ? 'white' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.2s'
            }}>{label}</button>
          ))}
        </div>

        {loading ? (
          <div className="page-loading"><div className="loading-spinner"/></div>
        ) : (
          <>
            {/* ORDERS TAB */}
            {tab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pendingOrders.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h3>No active orders</h3>
                    <p>New orders will appear here. Make sure your dishes are visible!</p>
                  </div>
                ) : pendingOrders.map(order => (
                  <ChefOrderCard key={order._id} order={order} onUpdateStatus={updateOrderStatus} />
                ))}
              </div>
            )}

            {/* DISHES TAB */}
            {tab === 'dishes' && (
              <div>
                {dishes.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">🍽️</div>
                    <h3>No dishes yet</h3>
                    <p>Add your first dish to start receiving orders!</p>
                    <button onClick={openAdd} className="btn btn-primary" style={{ marginTop: '1rem' }}><Plus size={16}/> Add First Dish</button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                    {dishes.map(dish => (
                      <div key={dish._id} style={{
                        background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border)',
                        overflow: 'hidden', opacity: dish.isAvailable ? 1 : 0.65
                      }}>
                        <div style={{ background: 'var(--bg-alt)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
                          {dish.image ? <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🍛'}
                          <div style={{
                            position: 'absolute', top: '8px', right: '8px',
                            background: dish.isAvailable ? 'rgba(46,204,138,0.9)' : 'rgba(220,53,69,0.85)',
                            color: 'white', borderRadius: '20px', padding: '0.2rem 0.6rem', fontSize: '0.72rem', fontWeight: '700'
                          }}>{dish.isAvailable ? 'Available' : 'Hidden'}</div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--text-primary)' }}>{dish.name}</h3>
                            <span style={{ color: 'var(--saffron)', fontWeight: '700' }}>₹{dish.price}</span>
                          </div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{dish.category} · {dish.isVeg ? '🌱 Veg' : '🍖 Non-Veg'}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '1rem' }}>⭐ {dish.rating?.toFixed(1) || 'New'} · {dish.ordersCount || 0} orders</p>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => toggleAvailability(dish)} style={{
                              flex: 1, padding: '0.5rem', borderRadius: '10px', fontSize: '0.78rem', fontWeight: '600',
                              border: '1px solid var(--border)', background: 'var(--bg-alt)', cursor: 'pointer',
                              color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem'
                            }}>
                              {dish.isAvailable ? <EyeOff size={14}/> : <Eye size={14}/>}
                              {dish.isAvailable ? 'Hide' : 'Show'}
                            </button>
                            <button onClick={() => openEdit(dish)} style={{
                              flex: 1, padding: '0.5rem', borderRadius: '10px', fontSize: '0.78rem', fontWeight: '600',
                              border: '1px solid var(--saffron)', background: 'rgba(232,130,26,0.08)',
                              color: 'var(--saffron)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem'
                            }}>
                              <Edit size={14}/> Edit
                            </button>
                            <button onClick={() => handleDelete(dish._id)} style={{
                              padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid rgba(220,53,69,0.3)',
                              background: 'rgba(220,53,69,0.08)', color: '#DC3545', cursor: 'pointer',
                              display: 'flex', alignItems: 'center'
                            }}>
                              <Trash2 size={14}/>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* HISTORY TAB */}
            {tab === 'history' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.filter(o => ['delivered', 'cancelled'].includes(o.status)).length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <h3>No past orders yet</h3>
                    <p>Completed orders will appear here.</p>
                  </div>
                ) : orders.filter(o => ['delivered', 'cancelled'].includes(o.status)).map(order => (
                  <ChefOrderCard key={order._id} order={order} onUpdateStatus={updateOrderStatus} readOnly />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Dish Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
          backdropFilter: 'blur(4px)'
        }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{
            background: 'var(--bg-card)', borderRadius: '24px', padding: '2rem',
            width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto',
            animation: 'fadeInUp 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                {editingDish ? 'Edit Dish' : 'Add New Dish'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18}/>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Dish Name *</label>
                  <input className="form-input" placeholder="Dal Makhani" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input className="form-input" type="number" placeholder="120" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-input" rows={3} placeholder="A rich, creamy lentil dish simmered overnight..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Prep Time (mins)</label>
                  <input className="form-input" type="number" value={form.preparationTime} onChange={e => setForm(f => ({ ...f, preparationTime: Number(e.target.value) }))} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ingredients (comma-separated)</label>
                <input className="form-input" placeholder="Lentils, tomatoes, cream, spices" value={form.ingredients} onChange={e => setForm(f => ({ ...f, ingredients: e.target.value }))} />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL (optional)</label>
                <input className="form-input" placeholder="https://..." value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
                  <input type="checkbox" checked={form.isVeg} onChange={e => setForm(f => ({ ...f, isVeg: e.target.checked }))} style={{ width: '18px', height: '18px', accentColor: 'var(--mint)' }} />
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>🌱 Vegetarian</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button onClick={handleSave} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {editingDish ? 'Save Changes' : 'Add Dish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChefOrderCard({ order, onUpdateStatus, readOnly }) {
  const cfg = { color: STATUS_COLORS[order.status] || '#999' };
  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1];

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ background: cfg.color, height: '4px' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <p style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              {order.customer?.name} · 📞 {order.customer?.phone || 'N/A'}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              {' · '}{order.paymentMethod} · {order.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending'}
            </p>
          </div>
          <div style={{
            padding: '0.3rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700',
            background: `${cfg.color}18`, color: cfg.color
          }}>{STATUS_LABELS[order.status]}</div>
        </div>

        <div style={{ background: 'var(--bg-alt)', borderRadius: '12px', padding: '0.85rem', marginBottom: '1rem' }}>
          {order.items?.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.87rem', padding: '0.2rem 0' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.name} × {item.quantity}</span>
              <span style={{ fontWeight: '600' }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
          {order.specialInstructions && (
            <p style={{ color: 'var(--saffron)', fontSize: '0.78rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
              📝 {order.specialInstructions}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>📍 {order.deliveryAddress}</p>
            <p style={{ fontWeight: '700', color: 'var(--saffron)', fontSize: '1rem', marginTop: '0.2rem' }}>₹{order.finalAmount}</p>
          </div>
          {!readOnly && nextStatus && (
            <button onClick={() => onUpdateStatus(order._id, nextStatus)} className="btn btn-primary btn-sm">
              <CheckCircle size={15}/> Mark as {STATUS_LABELS[nextStatus]}
            </button>
          )}
          {!readOnly && order.status === 'placed' && (
            <button onClick={() => onUpdateStatus(order._id, 'cancelled')} style={{
              padding: '0.45rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600',
              border: '1px solid rgba(220,53,69,0.4)', background: 'rgba(220,53,69,0.08)',
              color: '#DC3545', cursor: 'pointer'
            }}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
}
