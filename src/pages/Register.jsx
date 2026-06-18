import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, User, Eye, EyeOff, ArrowRight, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', city: '', address: '',
    kitchenName: '', kitchenDescription: '', specialties: ''
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all required fields'); return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters'); return;
    }
    if (role === 'chef' && !form.kitchenName) {
      toast.error('Please enter your kitchen name'); return;
    }
    setLoading(true);
    try {
      const data = await register({ ...form, role });
      toast.success(`Welcome to CraveCrew, ${data.name}! 🎉`);
      navigate(role === 'chef' ? '/chef-dashboard' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeInUp 0.5s ease' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Join CraveCrew
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Create your account and start your food journey</p>
        </div>

        {/* Role Toggle */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          background: 'var(--bg-alt)', borderRadius: '16px', padding: '6px',
          marginBottom: '2rem', border: '1px solid var(--border)'
        }}>
          {[
            { id: 'customer', icon: User, label: 'I\'m a Customer', sub: 'Order homemade food' },
            { id: 'chef', icon: ChefHat, label: 'I\'m a Chef', sub: 'Sell my cooking' }
          ].map(({ id, icon: Icon, label, sub }) => (
            <button key={id} onClick={() => setRole(id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
              padding: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: role === id ? 'var(--bg-card)' : 'transparent',
              color: role === id ? 'var(--saffron)' : 'var(--text-muted)',
              boxShadow: role === id ? '0 2px 8px var(--shadow-dark)' : 'none',
              transition: 'all 0.25s'
            }}>
              <Icon size={22} />
              <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{label}</span>
              <span style={{ fontSize: '0.75rem', color: role === id ? 'var(--text-muted)' : 'var(--text-muted)', opacity: 0.7 }}>{sub}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: '24px',
          border: '1px solid var(--border)', padding: '2rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
          animation: 'fadeInUp 0.6s ease both'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="Priya Sharma" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Password *</label>
            <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={e => update('password', e.target.value)} style={{ paddingRight: '3rem' }} />
            <button onClick={() => setShowPass(s => !s)} style={{
              position: 'absolute', right: '1rem', bottom: '0.85rem',
              background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
            }}>
              {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="Kanpur" value={form.city} onChange={e => update('city', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input className="form-input" placeholder="Your locality" value={form.address} onChange={e => update('address', e.target.value)} />
            </div>
          </div>

          {/* Chef-only fields */}
          {role === 'chef' && (
            <div style={{
              borderTop: '1px solid var(--border)', paddingTop: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '1.25rem'
            }}>
              <div style={{
                background: 'rgba(232,130,26,0.08)', borderRadius: '12px', padding: '0.85rem 1rem',
                border: '1px solid rgba(232,130,26,0.2)', fontSize: '0.85rem', color: 'var(--saffron)', fontWeight: '500'
              }}>
                👩‍🍳 Welcome, Chef! Fill in your kitchen details to get started.
              </div>

              <div className="form-group">
                <label className="form-label">Kitchen Name *</label>
                <input className="form-input" placeholder="Sunita's Kitchen" value={form.kitchenName} onChange={e => update('kitchenName', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Kitchen Description</label>
                <textarea className="form-input" rows={3} placeholder="Tell customers about your kitchen, cooking style, and specialties..." value={form.kitchenDescription} onChange={e => update('kitchenDescription', e.target.value)} style={{ resize: 'vertical' }} />
              </div>

              <div className="form-group">
                <label className="form-label">Specialties (comma-separated)</label>
                <input className="form-input" placeholder="Dal Makhani, Rajma, Thali, Gulab Jamun" value={form.specialties} onChange={e => update('specialties', e.target.value)} />
              </div>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? <><div className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}/> Creating Account...</> : <>Create Account <ArrowRight size={18}/></>}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--saffron)', fontWeight: '600' }}>Log in</Link>
          </p>
        </div>

        {/* Alternative registration */}
        <div style={{
          marginTop: '1.5rem', textAlign: 'center', padding: '1.25rem',
          background: 'var(--bg-alt)', borderRadius: '16px', border: '1px solid var(--border)'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            Prefer a simple form? Use the alternative registration:
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKdJvf53qxw_M1enw4UdYSPOhh4b9ql9s6qrmXImE3rvW_jg/viewform" target="_blank" rel="noreferrer">
            <button className="btn btn-secondary" style={{ gap: '0.5rem' }}>
              <ExternalLink size={16} /> Google Form Registration
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
