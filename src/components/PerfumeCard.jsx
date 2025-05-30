// components/PerfumeCard.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PerfumeCard({ perfume, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!selectedVariant) {
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
    onAddToCart(perfume, selectedVariant.size, selectedVariant.discountPrice, 1);
  };

  const handleVariantChange = (e) => {
    const variant = perfume.variants.find(v => v.size === e.target.value);
    setSelectedVariant(variant);
  };

  return (
    <div
      className="perfume-card"
      onClick={() => navigate(`/detail/${perfume.id}`)}
      tabIndex={0}
    >
      <img src={perfume.imgUrl} alt={perfume.name} />
      <h3>{perfume.name}</h3>

      {selectedVariant ? (
        <p className="price">
          <span style={{ textDecoration: 'line-through', color: 'gray' }}>
            Rp {selectedVariant.price.toLocaleString('id-ID')}
          </span>{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            Rp {selectedVariant.discountPrice.toLocaleString('id-ID')}
          </span>
        </p>
      ) : (
        <p className="price">Pilih varian untuk melihat harga</p>
      )}

      <select
        value={selectedVariant ? selectedVariant.size : ''}
        onChange={handleVariantChange}
        onClick={e => e.stopPropagation()}
      >
        <option value="">Pilih Varian</option>
        {perfume.variants.map(variant => (
          <option key={variant.size} value={variant.size}>
            {variant.size}
          </option>
        ))}
      </select>

      <button onClick={handleAdd}>Tambah ke Keranjang</button>
    </div>
  );
}
