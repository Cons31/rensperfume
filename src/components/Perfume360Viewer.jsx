import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import perfumes from '../data/perfumes';

// Import react-toastify
import { toast } from 'react-toastify';

export default function PerfumeDetail({ onAddToCart }) {
  const { id } = useParams();
  const perfume = perfumes.find(p => p.id === parseInt(id));
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!perfume) return <p>Parfum tidak ditemukan.</p>;

  const handleAdd = () => {
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
    toast.success('✅ Berhasil ditambahkan ke keranjang!');
  };

  const handleVariantChange = (e) => {
    const variant = perfume.variants.find(v => v.size === e.target.value);
    setSelectedVariant(variant);
  };

  return (
    <div className="perfume-detail">
      <Link to="/" className="back-button">← Kembali</Link>

      <h2>{perfume.name}</h2>
      <img src={perfume.imgUrl} alt={perfume.name} />
      <p><strong>Deskripsi:</strong> {perfume.description}</p>

      <select
        value={selectedVariant ? selectedVariant.size : ''}
        onChange={handleVariantChange}
      >
        <option value="">Pilih Varian</option>
        {perfume.variants.map(variant => (
          <option key={variant.size} value={variant.size}>
            {variant.size}
          </option>
        ))}
      </select>

      {selectedVariant && (
        <p className="price">
          <span>Rp {selectedVariant.price.toLocaleString('id-ID')}</span>
          <span>Rp {selectedVariant.discountPrice.toLocaleString('id-ID')}</span>
        </p>
      )}

      <button onClick={handleAdd}>Tambah ke Keranjang</button>
    </div>
  );
}
