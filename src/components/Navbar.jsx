import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Sun, Moon, ShoppingCart, Menu, X, ChefHat, User, LogOut, UtensilsCrossed } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(232,130,26,0.35)'
          }}>
            <UtensilsCrossed size={20} color="white" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem', fontWeight: '700',
            background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>CraveCrew</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/chefs">Our Chefs</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={toggleTheme} style={{
            background: 'var(--bg-alt)', border: '1px solid var(--border)',
            borderRadius: '50%', width: '38px', height: '38px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)', transition: 'all 0.2s'
          }}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {user?.role === 'customer' && (
            <Link to="/cart" style={{ position: 'relative' }}>
              <button style={{
                background: 'var(--bg-alt)', border: '1px solid var(--border)',
                borderRadius: '50%', width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', transition: 'all 0.2s'
              }}>
                <ShoppingCart size={17} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    background: 'var(--saffron)', color: 'white',
                    borderRadius: '50%', width: '18px', height: '18px',
                    fontSize: '0.7rem', fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{cartCount}</span>
                )}
              </button>
            </Link>
          )}

          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(o => !o)} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--bg-alt)', border: '1px solid var(--border)',
                borderRadius: '50px', padding: '0.4rem 0.75rem 0.4rem 0.4rem',
                color: 'var(--text-primary)', transition: 'all 0.2s', cursor: 'pointer'
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '0.75rem', fontWeight: '700'
                }}>{user.name?.[0]?.toUpperCase()}</div>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{user.name?.split(' ')[0]}</span>
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '0.5rem',
                  minWidth: '180px', boxShadow: '0 16px 40px var(--shadow-dark)',
                  animation: 'fadeInUp 0.2s ease'
                }}>
                  <DropdownItem icon={user.role === 'chef' ? <ChefHat size={15}/> : <User size={15}/>}
                    label={user.role === 'chef' ? 'Chef Dashboard' : 'My Dashboard'}
                    onClick={() => { navigate(user.role === 'chef' ? '/chef-dashboard' : '/dashboard'); setDropdownOpen(false); }} />
                  <DropdownItem icon={<LogOut size={15}/>} label="Logout" onClick={handleLogout} danger />
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }} className="auth-btns">
              <Link to="/login"><button className="btn btn-secondary btn-sm">Login</button></Link>
              <Link to="/register"><button className="btn btn-primary btn-sm">Join Free</button></Link>
            </div>
          )}

          <button onClick={() => setMenuOpen(o => !o)} className="mobile-menu-btn" style={{
            display: 'none', background: 'var(--bg-alt)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '0.5rem', color: 'var(--text-primary)'
          }}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--nav-bg)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)', padding: '1rem 1.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem'
        }}>
          {['/', '/explore', '/chefs', '/about'].map((path, i) => (
            <Link key={i} to={path} style={{
              padding: '0.75rem 1rem', borderRadius: '10px',
              color: 'var(--text-primary)', fontWeight: '500',
              transition: 'background 0.2s'
            }}>{['Home', 'Explore', 'Our Chefs', 'About'][i]}</Link>
          ))}
          {!user && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Link to="/login" style={{ flex: 1 }}><button className="btn btn-secondary" style={{ width: '100%' }}>Login</button></Link>
              <Link to="/register" style={{ flex: 1 }}><button className="btn btn-primary" style={{ width: '100%' }}>Join Free</button></Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .auth-btns { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function NavLink({ to, children }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} style={{
      padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: '500', fontSize: '0.9rem',
      color: active ? 'var(--saffron)' : 'var(--text-secondary)',
      background: active ? 'rgba(232,130,26,0.1)' : 'transparent',
      transition: 'all 0.2s'
    }}>{children}</Link>
  );
}

function DropdownItem({ icon, label, onClick, danger }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      padding: '0.6rem 0.9rem', borderRadius: '10px', width: '100%',
      background: 'transparent', color: danger ? '#DC3545' : 'var(--text-primary)',
      fontSize: '0.88rem', fontWeight: '500', transition: 'background 0.15s',
      cursor: 'pointer'
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {icon} {label}
    </button>
  );
}
