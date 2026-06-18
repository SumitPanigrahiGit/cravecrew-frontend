import { Link } from 'react-router-dom';
import { UtensilsCrossed, Instagram, Twitter, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', paddingTop: '4rem', marginTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <UtensilsCrossed size={20} color="white" />
              </div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: '700', color: 'var(--saffron)' }}>CraveCrew</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Empowering home chefs across India. Every meal cooked with love, delivered with care.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--saffron)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--saffron)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['/', 'Home'], ['/explore', 'Explore Food'], ['/chefs', 'Our Chefs'], ['/about', 'About Us']].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--saffron)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* For Chefs */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>For Home Chefs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['/register', 'Register as Chef'], ['/chef-dashboard', 'Chef Dashboard'], ['https://docs.google.com/forms/d/e/1FAIpQLSeKdJvf53qxw_M1enw4UdYSPOhh4b9ql9s6qrmXImE3rvW_jg/viewform', 'Alternative Registration'], ['#', 'Chef Guidelines'], ['#', 'Cloud Kitchen Program']].map(([to, label]) => (
                <a key={label} href={to} target={to.startsWith('http') ? '_blank' : undefined}
                  rel={to.startsWith('http') ? 'noreferrer' : undefined}
                  style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--saffron)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                [Mail, 'hello@cravecrew.in'],
                [Phone, '+91 98765 43210'],
                [MapPin, 'India — Serving Tier 2 & 3 Cities']
              ].map(([Icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  <Icon size={15} style={{ color: 'var(--saffron)', flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))',
          borderRadius: '16px', padding: '1.25rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div style={{ color: 'white' }}>
            <p style={{ fontWeight: '700', fontSize: '1rem' }}>🎉 First 100 Customers Get ₹100 OFF!</p>
            <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>Use code CRAVE100 at checkout. Limited offer!</p>
          </div>
          <Link to="/register"><button className="btn" style={{ background: 'white', color: 'var(--saffron)', fontWeight: '700' }}>Grab the Deal →</button></Link>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)', padding: '1.5rem 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.75rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © 2024 CraveCrew. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <Heart size={14} style={{ color: 'var(--saffron)' }} fill="var(--saffron)" /> for home chefs of India
          </p>
        </div>
      </div>
    </footer>
  );
}
