import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Users, Shield, ChefHat, ArrowRight, ExternalLink } from 'lucide-react';

const TEAM = [
  { name: 'Arjun Mehta', role: 'Co-Founder & CEO', emoji: '👨‍💼', bio: 'Ex-Zomato. Passionate about food tech and social impact.' },
  { name: 'Priya Agarwal', role: 'Co-Founder & CTO', emoji: '👩‍💻', bio: 'Full-stack engineer. Built platforms used by 100k+ users.' },
  { name: 'Sunita Verma', role: 'Head of Chef Success', emoji: '👩‍🍳', bio: 'Ex-home chef herself. Knows every challenge first-hand.' },
];

const IMPACT = [
  { icon: Users, value: '2,400+', label: 'Home Chefs Empowered', desc: 'Mostly women in Tier 2 & 3 cities earning sustainable income', color: '#E8821A' },
  { icon: Heart, value: '18,000+', label: 'Meals Delivered', desc: 'Fresh homemade meals reaching people who miss home food', color: '#2ECC8A' },
  { icon: TrendingUp, value: '₹2.4 Cr+', label: 'Chef Earnings', desc: 'Total income generated for home chefs across India', color: '#6366F1' },
  { icon: Shield, value: '100%', label: 'Hygienic Kitchens', desc: 'Every listed kitchen undergoes our verification process', color: '#F5C842' },
];

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px' }}>
      {/* Hero */}
      <section style={{ padding: '4rem 0 3rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <span className="section-eyebrow">Our Story</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            We're on a Mission to Bring<br />
            <span style={{ color: 'var(--saffron)' }}>Home Food Back</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto' }}>
            Millions of Indians living away from family miss the warmth of home-cooked food. At the same time, talented homemakers — especially women — have no platform to monetise their cooking skills. CraveCrew bridges this gap.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.15)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>😔</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>The Problem</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', fontSize: '0.9rem' }}>
                Students, working professionals, and migrants crave authentic homemade food but are stuck with unhygienic restaurants or expensive catering. They spend more, eat worse, and feel disconnected from home.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Meanwhile, millions of homemakers — especially in Tier 2 & 3 cities — have exceptional cooking skills but no income, no platform, no voice.
              </p>
            </div>
            <div style={{ background: 'rgba(46,204,138,0.06)', border: '1px solid rgba(46,204,138,0.15)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Our Solution</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', fontSize: '0.9rem' }}>
                CraveCrew is a two-sided marketplace that connects home chefs directly with hungry customers. Home cooks get their own "cloud kitchen" profile, set their own prices, and receive orders directly.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Our Cloud Kitchen Program even sponsors the best chefs to open real restaurant outlets — turning a home kitchen into a full-fledged business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Impact</span>
            <h2 className="section-title">Numbers That Matter</h2>
          </div>
          <div className="grid-4">
            {IMPACT.map(({ icon: Icon, value, label, desc, color }) => (
              <div key={label} style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Icon size={24} style={{ color }} />
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{value}</div>
                <div style={{ fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: '1.5' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="section-eyebrow">Our Mission</span>
          <h2 className="section-title">Empowering Women, One Meal at a Time</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.85', marginBottom: '2rem' }}>
            80% of our chefs are women homemakers from Tier 2 and Tier 3 cities. For many, CraveCrew is their first source of independent income. We believe that when you empower a woman to earn, you strengthen an entire family.
          </p>
          <div style={{
            background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))',
            borderRadius: '20px', padding: '2rem', color: 'white', fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontStyle: 'italic', lineHeight: '1.65'
          }}>
            "Every meal on CraveCrew is a story — of a mother who wanted independence, a daughter who found her voice, a home that became a kitchen that became a career."
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">The Team</span>
            <h2 className="section-title">Who's Behind CraveCrew</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
            {TEAM.map(({ name, role, emoji, bio }) => (
              <div key={name} style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '1.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{emoji}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{name}</h3>
                <p style={{ color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.6rem' }}>{role}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.55' }}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Kitchen Program details */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="section-eyebrow">Cloud Kitchen Program</span>
            <h2 className="section-title">From Home Kitchen to Restaurant</h2>
            <p className="section-subtitle">Our flagship program sponsors top-performing home chefs to open their own brick-and-mortar restaurant outlet.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {[
              { step: '1', title: 'Join as Chef', desc: 'Register your home kitchen and list your dishes on CraveCrew.' },
              { step: '2', title: 'Build Reputation', desc: 'Earn 4.5★+ rating with consistent quality, hygiene, and service.' },
              { step: '3', title: 'Get Sponsored', desc: 'CraveCrew sponsors setup costs, training, and branding for your restaurant.' },
              { step: '4', title: 'Own Your Business', desc: 'Launch your own outlet with full support from the CraveCrew ecosystem.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ background: 'var(--bg-card)', borderRadius: '18px', padding: '1.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(232,130,26,0.08)' }} />
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '1rem', marginBottom: '0.85rem' }}>{step}</div>
                <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: '1.55' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'white', marginBottom: '0.75rem' }}>
            Be Part of the Movement
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
            Whether you're hungry or a home cook — you belong in the CraveCrew family.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button className="btn btn-lg" style={{ background: 'white', color: 'var(--saffron)', fontWeight: '700' }}>
                Join CraveCrew <ArrowRight size={18}/>
              </button>
            </Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKdJvf53qxw_M1enw4UdYSPOhh4b9ql9s6qrmXImE3rvW_jg/viewform" target="_blank" rel="noreferrer">
              <button className="btn btn-lg" style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.6)' }}>
                <ExternalLink size={16}/> Chef Registration Form
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
