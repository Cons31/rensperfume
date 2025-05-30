import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PerfumeCard from './components/PerfumeCard';
import Cart from './components/Cart';
import TextMarquee from './components/TextMarquee';
import PerfumeDetail from './components/Perfume360Viewer';
import perfumes from './data/perfumes';

// Import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(perfume, variant, price, qty = 1) {
    if (!variant) {
      toast.warn('⚠️ Silakan pilih varian terlebih dahulu sebelum menambahkan ke keranjang.', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      });
      return;
    }

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === perfume.id && item.variant === variant);
      if (existing) {
        return prevCart.map(item =>
          item.id === perfume.id && item.variant === variant
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prevCart, { ...perfume, variant, price, qty }];
      }
    });
  }

  function removeFromCart(id, variant) {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.variant === variant)));
  }

  function checkout() {
    if (cart.length === 0) {
      toast.error('❌ Keranjang masih kosong. Tambahkan produk dulu ya!', {
        position: 'top-center',
        autoClose: 2500,
        theme: 'colored'
      });
      return;
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    toast.success(`✅ Terima kasih sudah membeli! Total bayar: Rp ${total.toLocaleString('id-ID')}`, {
      position: 'top-center',
      autoClose: 3000,
      theme: 'colored'
    });

    setCart([]);
  }

  return (
    <div className="app-container">
      <Header />
      <TextMarquee text="Welcome to RensPerfume — Experience the luxury fragrance collection" />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="perfume-list">
                {perfumes.map(p => (
                  <PerfumeCard
                    key={p.id}
                    perfume={p}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
              <Cart cart={cart} removeFromCart={removeFromCart} checkout={checkout} />
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={<PerfumeDetail onAddToCart={addToCart} />}
        />
      </Routes>

      {/* Toast container untuk notifikasi */}
      <ToastContainer />
    </div>
  );
}
