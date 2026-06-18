import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Explore from './pages/Explore';
import Chefs from './pages/Chefs';
import ChefProfile from './pages/ChefProfile';
import Cart from './pages/Cart';
import CustomerDashboard from './pages/CustomerDashboard';
import ChefDashboard from './pages/ChefDashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
                success: { iconTheme: { primary: '#2ECC8A', secondary: 'white' } },
                error: { iconTheme: { primary: '#DC3545', secondary: 'white' } },
              }}
            />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/chefs" element={<Chefs />} />
                <Route path="/chefs/:id" element={<ChefProfile />} />
                <Route path="/about" element={<About />} />

                <Route path="/cart" element={
                  <ProtectedRoute role="customer"><Cart /></ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>
                } />
                <Route path="/chef-dashboard" element={
                  <ProtectedRoute role="chef"><ChefDashboard /></ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
