import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Heart, ChefHat, Users, TrendingUp, Award, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API } from '../context/AuthContext';
import DishCard from '../components/DishCard';

const STATS = [
  { value: '2,400+', label: 'Home Chefs', icon: ChefHat },
  { value: '18,000+', label: 'Happy Customers', icon: Users },
  { value: '4.8★', label: 'Avg. Rating', icon: Star },
  { value: '120+', label: 'Cities', icon: TrendingUp },
];

const FEATURES = [
  { icon: Shield, title: 'Hygienic & Safe', desc: 'Every kitchen is verified. Strict hygiene checks. No compromise on food safety.', color: '#2ECC8A' },
  { icon: Heart, title: 'Cooked with Love', desc: 'Real homemakers making authentic recipes passed down through generations.', color: '#E8821A' },
  { icon: Truck, title: 'Fresh to Door', desc: 'Food prepared fresh for your order — not sitting in warmers for hours.', color: '#F5C842' },
  { icon: Award, title: 'Cloud Kitchen Path', desc: 'Top chefs get sponsored restaurant outlets. Real career growth awaits.', color: '#7C5CBF' },
];

const HOW_IT_WORKS_CUSTOMER = [
  { step: '01', title: 'Browse & Discover', desc: 'Explore dishes from verified home chefs in your city.' },
  { step: '02', title: 'Order & Pay', desc: 'Choose UPI or Cash on Delivery. Simple, secure, fast.' },
  { step: '03', title: 'Enjoy Homemade!', desc: 'Fresh food delivered to your door, just like mom\'s kitchen.' },
];

const HOW_IT_WORKS_CHEF = [
  { step: '01', title: 'Register Your Kitchen', desc: 'Sign up as a Chef and list your home kitchen on CraveCrew.' },
  { step: '02', title: 'Add Your Dishes', desc: 'Upload your menu with prices, photos, and availability.' },
  { step: '03', title: 'Earn & Grow', desc: 'Receive orders, earn income, and get sponsored for a restaurant!' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Kanpur', role: 'Customer', quote: "I found the dal makhani I've been missing since moving away from home. Pure magic!", rating: 5, initials: 'PS' },
  { name: 'Sunita Devi', city: 'Jhansi', role: 'Home Chef', quote: "CraveCrew gave me a real income from my own kitchen. My kids are proud of me!", rating: 5, initials: 'SD' },
  { name: 'Rahul Gupta', city: 'Varanasi', role: 'Customer', quote: "Way cheaper than restaurants, way better than anything. The thali is unbelievable.", rating: 5, initials: 'RG' },
];

export default function Home() {
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [activeTab, setActiveTab] = useState('customer');

  useEffect(() => {
    axios.get(`${API}/dishes`).then(r => setFeaturedDishes(r.data.slice(0, 6))).catch(() => {}).finally(() => setLoadingDishes(false));
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex', alignItems: 'center',
        paddingTop: '90px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background blobs */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,130,26,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46,204,138,0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          {/* First 100 promo banner */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(232,130,26,0.1)', border: '1px solid rgba(232,130,26,0.25)',
            borderRadius: '50px', padding: '0.5rem 1.25rem', marginBottom: '2rem',
            animation: 'fadeInUp 0.5s ease both'
          }}>
            <span style={{ fontSize: '1rem' }}>🎉</span>
            <span style={{ color: 'var(--saffron)', fontWeight: '600', fontSize: '0.88rem' }}>
              First 100 customers get <strong>₹100 OFF</strong> their first order!
            </span>
            <span style={{ background: 'var(--saffron)', color: 'white', borderRadius: '20px', padding: '0.15rem 0.6rem', fontSize: '0.75rem', fontWeight: '700' }}>
              LIMITED
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left */}
            <div style={{ animation: 'fadeInUp 0.7s ease both' }}>
              <span className="section-eyebrow">Homemade Food Marketplace</span>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: '700',
                lineHeight: '1.15',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)'
              }}>
                Real Home Cooking,<br />
                <span style={{
                  background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>Delivered to You</span>
              </h1>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.75', marginBottom: '2.5rem', maxWidth: '460px' }}>
                Miss Mom's cooking? Order authentic homemade meals from verified home chefs nearby. Hygienic, affordable, and made with real love — not factory shortcuts.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <Link to="/explore">
                  <button className="btn btn-primary btn-lg">
                    <Sparkles size={18} /> Order Homemade Food
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-secondary btn-lg">
                    <ChefHat size={18} /> Become a Chef
                  </button>
                </Link>
              </div>

              {/* Promo code */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                background: 'var(--bg-alt)', border: '1.5px dashed var(--saffron)',
                borderRadius: '14px', padding: '0.9rem 1.25rem'
              }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>First Order Promo</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: '700', color: 'var(--saffron)' }}>
                    CRAVE100 → ₹100 OFF
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Floating Kitchen Cards */}
            <div style={{ position: 'relative', height: '480px', display: 'none' }} className="hero-visual">
              <HeroVisual />
            </div>
          </div>
        </div>

        <style>{`@media (min-width: 900px) { .hero-visual { display: block !important; } }`}</style>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} style={{ color: 'white' }}>
                <Icon size={28} style={{ margin: '0 auto 0.5rem', opacity: 0.85 }} />
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: '700' }}>{value}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.85, fontWeight: '500' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED DISHES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Today's Specials</span>
            <h2 className="section-title">Fresh from Home Kitchens</h2>
            <p className="section-subtitle">Hand-picked dishes from our top-rated home chefs, made fresh today.</p>
          </div>

          {loadingDishes ? (
            <div className="page-loading"><div className="loading-spinner" /><p style={{ color: 'var(--text-muted)' }}>Loading delicious food...</p></div>
          ) : featuredDishes.length > 0 ? (
            <>
              <div className="grid-3">{featuredDishes.map(d => <DishCard key={d._id} dish={d} />)}</div>
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <Link to="/explore"><button className="btn btn-primary btn-lg">Explore All Dishes <ArrowRight size={18}/></button></Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🍽️</div>
              <h3>No dishes yet!</h3>
              <p>Be the first chef to list your homemade food.</p>
              <Link to="/register"><button className="btn btn-primary">Register as Chef</button></Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">Simple. Delicious. Impactful.</h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
            {['customer', 'chef'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '0.65rem 1.75rem', borderRadius: '50px', fontWeight: '600',
                border: 'none', cursor: 'pointer', transition: 'all 0.25s',
                background: activeTab === tab ? 'var(--saffron)' : 'var(--bg-card)',
                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                border: activeTab === tab ? 'none' : '1px solid var(--border)',
                boxShadow: activeTab === tab ? '0 4px 16px rgba(232,130,26,0.3)' : 'none',
              }}>
                {tab === 'customer' ? '🛍️ As Customer' : '👩‍🍳 As Chef'}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {(activeTab === 'customer' ? HOW_IT_WORKS_CUSTOMER : HOW_IT_WORKS_CHEF).map(({ step, title, desc }) => (
              <div key={step} style={{
                background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem',
                border: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: '-15px', right: '-15px',
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: 'rgba(232,130,26,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} />
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  fontFamily: 'Playfair Display, serif', color: 'white',
                  fontSize: '1.3rem', fontWeight: '700'
                }}>{step}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Why CraveCrew</span>
            <h2 className="section-title">Food You Can Trust</h2>
            <p className="section-subtitle">We're not just a food app. We're building a movement for home-cooked goodness.</p>
          </div>
          <div className="grid-4">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} style={{
                background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem',
                border: '1px solid var(--border)', textAlign: 'center', transition: 'all 0.3s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{
                  width: '60px', height: '60px', borderRadius: '18px',
                  background: `${color}18`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 1.25rem'
                }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: '1.6' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOUD KITCHEN PROGRAM ===== */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1A1206 0%, #2D1F0A 100%)',
            borderRadius: '28px', padding: 'clamp(2rem, 5vw, 4rem)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem', alignItems: 'center', overflow: 'hidden', position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(232,130,26,0.1)' }} />
            <div>
              <span style={{ color: 'var(--turmeric)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                🌟 Cloud Kitchen Program
              </span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'white', marginBottom: '1.25rem', lineHeight: '1.25' }}>
                Cook Today,<br />Own a Restaurant Tomorrow
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: '1.75', marginBottom: '2rem' }}>
                Top-performing home chefs on CraveCrew get sponsored to open their own restaurant outlet. Your kitchen is the launchpad. We provide the funding, training, and platform.
              </p>
              <Link to="/register">
                <button className="btn" style={{ background: 'var(--saffron)', color: 'white', padding: '0.9rem 2rem' }}>
                  <ChefHat size={18} /> Apply as Chef
                </button>
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { emoji: '🏠', title: 'Start from Home', desc: 'No investment needed. Use your existing kitchen.' },
                { emoji: '📈', title: 'Build Your Brand', desc: 'Your kitchen name on our platform, your reputation grows.' },
                { emoji: '🏪', title: 'Get Sponsored', desc: 'Top chefs receive restaurant sponsorship from CraveCrew.' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} style={{
                  background: 'rgba(255,255,255,0.06)', borderRadius: '16px',
                  padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</span>
                  <div>
                    <p style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Real Stories</span>
            <h2 className="section-title">Loved by the CraveCrew Family</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map(({ name, city, role, quote, rating, initials }) => (
              <div key={name} style={{
                background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem',
                border: '1px solid var(--border)', position: 'relative'
              }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--saffron)', opacity: 0.3, fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '0.5rem' }}>"</div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem', fontStyle: 'italic', fontSize: '0.95rem' }}>{quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: '700', fontSize: '0.85rem'
                  }}>{initials}</div>
                  <div>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{role} · {city}</p>
                  </div>
                  <div className="stars" style={{ marginLeft: 'auto' }}>
                    {[...Array(rating)].map((_, i) => <span key={i} className="star filled">★</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, var(--saffron) 0%, var(--saffron-dark) 100%)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem' }}>
            Ready to Taste Home?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
            Join thousands of people enjoying authentic homemade meals every day.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register"><button className="btn btn-lg" style={{ background: 'white', color: 'var(--saffron)', fontWeight: '700' }}>Get Started Free <ArrowRight size={18}/></button></Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKdJvf53qxw_M1enw4UdYSPOhh4b9ql9s6qrmXImE3rvW_jg/viewform" target="_blank" rel="noreferrer">
              <button className="btn btn-lg" style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.6)' }}>
                Chef Registration Form ↗
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroVisual() {
  const dishes = ['🍛 Dal Makhani', '🥘 Rajma Chawal', '🍲 Kadai Paneer', '🥞 Masala Dosa', '🍮 Gulab Jamun'];
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Main card */}
      <div className="float" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'var(--bg-card)', borderRadius: '24px', padding: '2rem',
        border: '1px solid var(--border)', boxShadow: '0 24px 64px var(--shadow)', width: '240px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>🍲</div>
        <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', color: 'var(--text-primary)', fontSize: '1rem' }}>Amma's Special Thali</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0.25rem 0' }}>Sunita's Kitchen · Kanpur</p>
        <p style={{ color: 'var(--saffron)', fontWeight: '700', fontSize: '1.1rem', marginTop: '0.5rem' }}>₹120</p>
        <div className="stars" style={{ justifyContent: 'center', marginTop: '0.4rem' }}>
          {[...Array(5)].map((_, i) => <span key={i} className="star filled" style={{ fontSize: '0.85rem' }}>★</span>)}
        </div>
      </div>

      {/* Floating badges */}
      {[
        { style: { top: '8%', left: '5%' }, content: '✅ Verified Kitchen' },
        { style: { top: '15%', right: '0%' }, content: '🕐 30 min' },
        { style: { bottom: '20%', left: '0%' }, content: '🌱 100% Hygienic' },
        { style: { bottom: '10%', right: '5%' }, content: '⭐ 4.9 Rating' },
      ].map((item, i) => (
        <div key={i} style={{
          position: 'absolute', ...item.style,
          background: 'var(--bg-card)', borderRadius: '50px',
          padding: '0.5rem 0.9rem', fontSize: '0.78rem',
          fontWeight: '600', color: 'var(--text-secondary)',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 16px var(--shadow-dark)',
          animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          whiteSpace: 'nowrap'
        }}>{item.content}</div>
      ))}
    </div>
  );
}
