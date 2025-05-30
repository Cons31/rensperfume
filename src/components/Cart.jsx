import React from 'react';

export default function Cart({ cart, removeFromCart, checkout }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart">
      <h2>Keranjang</h2>
      {cart.length === 0 && <p>Keranjang kosong.</p>}
      <ul>
        {cart.map(item => (
          <li key={`${item.id}-${item.variant}`}>
            {item.name} ({item.variant}) x {item.qty} = Rp {(item.price * item.qty).toLocaleString('id-ID')}
            <button onClick={() => removeFromCart(item.id, item.variant)}>Hapus</button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <>
          <p>Total: Rp {totalPrice.toLocaleString('id-ID')}</p>
          <button className="checkout-btn" onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}
