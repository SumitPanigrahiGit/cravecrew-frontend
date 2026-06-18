import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2, ShoppingBag, Tag, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { API } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiId, setUpiId] = useState('');
  const [address, setAddress] = useState(user?.address || '');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('cart'); // cart | checkout

  const isFirstOrder = user?.isFirstOrder;
  const discount = isFirstOrder ? Math.min(100, cartTotal) : 0;
  const finalTotal = cartTotal - discount;

  const handlePlaceOrder = async () => {
    if (!address.trim()) { toast.error('Please enter delivery address'); return; }
    if (paymentMethod === 'UPI' && !upiId.trim()) { toast.error('Please enter your UPI transaction ID'); return; }
    if (cart.items.length === 0) { toast.error('Cart is empty'); return; }

    setLoading(true);
    try {
      const orderData = {
        chef: cart.chefId,
        items: cart.items.map(i => ({ dish: i._id, name: i.name, price: i.price, quantity: i.quantity })),
        paymentMethod,
        deliveryAddress: address,
        specialInstructions: instructions,
        upiTransactionId: upiId || undefined
      };
      await axios.post(`${API}/orders`, orderData);
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally { setLoading(false); }
  };

  if (cart.items.length === 0 && step === 'cart') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious homemade food to get started.</p>
          <Link to="/explore"><button className="btn btn-primary" style={{ marginTop: '1rem' }}>Explore Food</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '90px', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => step === 'checkout' ? setStep('cart') : navigate('/explore')}
            style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.6rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
            <ArrowLeft size={20}/>
          </button>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--text-primary)' }}>
              {step === 'cart' ? 'Your Cart' : 'Checkout'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>From {cart.chefName}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {step === 'cart' ? (
              <>
                {cart.items.map(item => (
                  <div key={item._id} style={{
                    background: 'var(--bg-card)', borderRadius: '16px', padding: '1.25rem',
                    border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center'
                  }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                      {item.isVeg ? '🌱' : '🍖'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.2rem', truncate: true }}>{item.name}</p>
                      <p style={{ color: 'var(--saffron)', fontWeight: '700' }}>₹{item.price} each</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--bg-alt)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}><Minus size={14}/></button>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--saffron)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Plus size={14}/></button>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '70px' }}>
                      <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>₹{item.price * item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: '#DC3545', cursor: 'pointer', padding: '0.3rem' }}>
                      <Trash2 size={17}/>
                    </button>
                  </div>
                ))}
              </>
            ) : (
              /* Checkout Form */
              <div style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Delivery Details</h3>

                <div className="form-group">
                  <label className="form-label">Delivery Address *</label>
                  <textarea className="form-input" rows={3} value={address} onChange={e => setAddress(e.target.value)} placeholder="Full delivery address..." style={{ resize: 'vertical' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Special Instructions</label>
                  <input className="form-input" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Less spicy, extra roti, etc." />
                </div>

                <div>
                  <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Payment Method *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                      { id: 'COD', icon: Truck, label: 'Cash on Delivery', sub: 'Pay when food arrives' },
                      { id: 'UPI', icon: CreditCard, label: 'UPI Payment', sub: 'Google Pay, PhonePe, Paytm' }
                    ].map(({ id, icon: Icon, label, sub }) => (
                      <button key={id} onClick={() => setPaymentMethod(id)} style={{
                        padding: '1.1rem', borderRadius: '14px', cursor: 'pointer', textAlign: 'left',
                        border: paymentMethod === id ? '2px solid var(--saffron)' : '2px solid var(--border)',
                        background: paymentMethod === id ? 'rgba(232,130,26,0.08)' : 'var(--bg-alt)',
                        transition: 'all 0.2s'
                      }}>
                        <Icon size={20} style={{ color: paymentMethod === id ? 'var(--saffron)' : 'var(--text-muted)', marginBottom: '0.4rem' }} />
                        <p style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{label}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {paymentMethod === 'UPI' && (
                  <div style={{ background: 'rgba(46,204,138,0.08)', borderRadius: '14px', padding: '1.25rem', border: '1px solid rgba(46,204,138,0.2)' }}>
                    <p style={{ fontWeight: '700', color: 'var(--mint-dark)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                      📱 Pay via UPI to: <span style={{ fontFamily: 'monospace', fontSize: '1rem' }}>cravecrew@upi</span>
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>Amount: ₹{finalTotal}. Enter transaction ID after payment:</p>
                    <input className="form-input" placeholder="UPI Transaction ID (e.g., 123456789012)" value={upiId} onChange={e => setUpiId(e.target.value)} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border)', padding: '1.75rem', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {cart.items.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.87rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.87rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-primary)' }}>₹{cartTotal}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.87rem' }}>
                  <span style={{ color: 'var(--mint-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Tag size={13}/> First Order Discount
                  </span>
                  <span style={{ color: 'var(--mint-dark)', fontWeight: '700' }}>-₹{discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.87rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                <span style={{ color: 'var(--mint-dark)', fontWeight: '600' }}>FREE</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Total</span>
                <span style={{ fontWeight: '800', color: 'var(--saffron)', fontSize: '1.2rem' }}>₹{finalTotal}</span>
              </div>
            </div>

            {isFirstOrder && (
              <div style={{ background: 'rgba(46,204,138,0.1)', borderRadius: '10px', padding: '0.75rem', marginTop: '1rem', border: '1px solid rgba(46,204,138,0.25)', fontSize: '0.82rem', color: 'var(--mint-dark)', fontWeight: '600', textAlign: 'center' }}>
                🎉 ₹100 first-order discount applied!
              </div>
            )}

            <button
              onClick={step === 'cart' ? () => setStep('checkout') : handlePlaceOrder}
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.95rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? <><div className="loading-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}/> Placing Order...</>
                : step === 'cart' ? <><ShoppingBag size={18}/> Proceed to Checkout</>
                : <><ShoppingBag size={18}/> Place Order · ₹{finalTotal}</>
              }
            </button>

            {step === 'checkout' && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.75rem' }}>
                🔒 Secure & encrypted checkout
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
