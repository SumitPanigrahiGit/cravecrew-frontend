import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, UtensilsCrossed, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      toast.success(`Welcome back, ${data.name}! 🍛`);
      navigate(data.role === 'chef' ? '/chef-dashboard' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '440px', padding: '0 1.5rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeInUp 0.5s ease' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem', boxShadow: '0 8px 24px rgba(232,130,26,0.35)'
          }}>
            <UtensilsCrossed size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sign in to continue your food journey</p>
        </div>

        <div style={{
          background: 'var(--bg-card)', borderRadius: '24px',
          border: '1px solid var(--border)', padding: '2.5rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
          animation: 'fadeInUp 0.6s ease both', boxShadow: '0 8px 32px var(--shadow)'
        }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@email.com"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Password</label>
            <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Your password"
              value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={{ paddingRight: '3rem' }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <button onClick={() => setShowPass(s => !s)} style={{
              position: 'absolute', right: '1rem', bottom: '0.85rem',
              background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
            }}>
              {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>

          <button onClick={handleSubmit} disabled={loading} className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
            {loading
              ? <><div className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}/> Signing in...</>
              : <>Sign In <ArrowRight size={18}/></>
            }
          </button>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--saffron)', fontWeight: '600' }}>Sign up free</Link>
          </p>
        </div>

        {/* Demo hint */}
        <div style={{
          marginTop: '1.5rem', background: 'rgba(46,204,138,0.08)', borderRadius: '14px',
          padding: '1rem 1.25rem', border: '1px solid rgba(46,204,138,0.2)',
          fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center'
        }}>
          <strong style={{ color: 'var(--mint-dark)' }}>New here?</strong> Register above to get started. First 100 customers get <strong>₹100 OFF</strong>!
        </div>
      </div>
    </div>
  );
}
