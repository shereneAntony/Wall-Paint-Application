import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ColorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/color/${id}/`);
        setColor(response.data);
      } catch (error) {
        console.error('Failed to fetch color detail:', error);
      }
    };
    fetchColor();

     const handlePopState = (event) => {
    
      navigate('/Shades', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [id]);

  const handleAddToCart = async () => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (!localUser.email) {
      alert('Please login to add items to cart.');
      navigate('/login', { state: { from: `/color/${id}` } });

      return;
    }

    try {

      const userRes = await fetch(`http://localhost:8000/api/user-details/?email=${localUser.email}`);
      const userData = await userRes.json();

      const cartData = {
        user: userData.id,
        product_type: 'Paint',
        product_name: color.name,
        product_price: color.price,
        quantity: quantity,
        picture:color.picture,
      };

      const res = await fetch('http://localhost:8000/api/add-to-cart/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });

      if (res.ok) {
        alert('Added to cart successfully!');
      } else {
        const err = await res.json();
        console.error('Error response:', err);
        alert('Failed to add to cart.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    }
  };

  if (!color) return <p style={{ fontSize: '25px' }}>Loading...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto',backgroundColor:'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{color.name}</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          flexWrap: 'wrap',
        }}
      >
      
        <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
          <img
            src={`http://localhost:8000/media/${color.picture}`}
            alt={color.name}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>

      
        <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
          <p style={{ fontSize: '22px', marginBottom: '15px' }}>
            <strong>Category:</strong>{' '}
            {color.category.charAt(0).toUpperCase() + color.category.slice(1)}
          </p>
          <p style={{ fontSize: '22px', marginBottom: '15px' }}>
            <strong>Contrast Colors:</strong> {color.combinations}
          </p>
          <p style={{ fontSize: '22px', marginBottom: '15px' }}>
            <strong>Litre:</strong> {color.litre}
          </p>
          <p style={{ fontSize: '22px', marginBottom: '15px' }}>
            <strong>Price:</strong> ₹{color.price}
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Quantity:
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{
                  marginLeft: '10px',
                  width: '70px',
                  padding: '8px',
                  fontSize: '18px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </label>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              padding: '14px 32px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorDetailsPage;
