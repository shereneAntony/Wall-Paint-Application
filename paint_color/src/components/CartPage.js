import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const localUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [userId, setUserId] = useState(null);

useEffect(() => {
  if (!localUser.email) return;

  const fetchData = async () => {
    try {
      const userRes = await axios.get(`http://localhost:8000/api/user-details/?email=${localUser.email}`);
      const userId = userRes.data.id;


      setUserDetails({
        name: userRes.data.name,
        email: userRes.data.email,
        phone: userRes.data.phone,
        address: userRes.data.address,
      });

  
      const cartRes = await axios.get(`http://localhost:8000/api/cart-items/?user_id=${userId}&status=pending`);
      setCartItems(cartRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [localUser.email]);



  const handleQuantityChange = (index, newQty) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQty;
    setCartItems(updatedItems);
  };

  const handleUpdate = async (item) => {
    try {
      await axios.put(`http://localhost:8000/api/cart-items/${item.id}/`, item);
      alert('Quantity updated');
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart-items/${id}/`);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  // ✅ BOOK ORDER FUNCTION
const handleBookOrder = async () => {
  try {
    const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const ordersPayload = cartItems.map((item) => ({
      product_type: item.product_type,
      product_name: item.product_name,
      product_price: item.product_price,
      quantity: item.quantity,
      picture: item.picture,
      delivery_date: deliveryDate,
      cart_id: item.id,
    }));

    const res = await axios.post('http://localhost:8000/api/orders/', {
      user: userId,
      orders: ordersPayload,
    });

    alert(`Order placed successfully! Your items will be delivered by ${res.data.delivery_date}.`);
    setCartItems([]);
    setShowBookingForm(false);
    setShowSummary(false);
  } catch (err) {
    console.error('Failed to place order:', err);
    alert('Failed to place order');
  }
};


  if (loading) return <p style={{ fontSize: '24px' }}>Loading cart...</p>;
  if (cartItems.length === 0) return <p style={{ fontSize: '24px',backgroundColor:'#FCF5E5',textAlign:'center'}}>Your cart is empty.</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto',backgroundColor:'#FCF5E5' }}>
  <h2 style={{
  fontSize: '40px',
  marginBottom: '30px',
  textAlign: 'center',
  fontFamily: '"Manufacturing Consent", system-ui',
  fontWeight: 1000,
  fontStyle: 'normal'
}}>My Cart</h2>

      {cartItems.map((item, index) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            marginBottom: '20px',
            backgroundColor: '#f9f9f9',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ flex: '0 0 120px', marginRight: '20px' }}>
            <img
              src={`http://localhost:8000/media/${item.picture}`}
              alt={item.product_name}
              style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <p style={{ fontSize:'18px' }}><strong>Type:</strong> {item.product_type}</p>
            <p style={{ fontSize:'18px' }}><strong>Name:</strong> {item.product_name}</p>
            <p style={{ fontSize:'18px' }}><strong>Price:</strong> ₹{item.product_price}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <label style={{ fontSize:'18px' }}><strong>Qty:</strong></label>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  style={{ width: '60px', margin: '0 10px', padding: '5px' }}
                />
                <button onClick={() => handleUpdate(item)} style={{ marginRight: '10px',fontSize:'20px',backgroundColor:'blue',color:'white', border:'none'}}>Update</button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize:'18px'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {!showBookingForm && (
        <div style={{ textAlign: 'right', marginTop: '30px' }}>
          <button
            onClick={() => setShowBookingForm(true)}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: '25px',
              cursor: 'pointer',
            }}
          >
            Proceed to Booking
          </button>
        </div>
      )}

     {showBookingForm && (
  <form
    onSubmit={handleBookingSubmit}
    style={{
      marginTop: '40px',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
    }}
  >
    <h2 style={{ marginBottom: '20px' }}>Booking Details</h2>

    {['name', 'email', 'phone', 'address'].map((field) => (
      <div key={field} style={{ marginBottom: '15px' }}>
        <label
          style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px',
          }}
        >
          {field.charAt(0).toUpperCase() + field.slice(1)}:
        </label>
        <input
          type="text"
          value={userDetails[field]}
          onChange={(e) =>
            setUserDetails({ ...userDetails, [field]: e.target.value })
          }
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
      </div>
    ))}

    <div style={{ marginTop: '20px', display: 'flex', gap: '15px',  justifyContent: 'flex-end'  }}>
      <button
        type="submit"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '12px 24px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Continue
      </button>
      <button
        type="button"
        onClick={() => setShowBookingForm(false)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6c757d',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '18px',
        }}
      >
        Cancel
      </button>
    </div>
  </form>
)}

    

      {showSummary && (
        <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Order Summary</h3>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f1f1' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Product</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Qty</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.product_name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>₹{item.product_price}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.quantity}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>₹{item.product_price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <p><strong>Subtotal:</strong> ₹{cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0)}</p>
            <p><strong>Delivery Charges:</strong> ₹100</p>
            <p style={{ fontSize: '20px' }}><strong>Total:</strong> ₹{cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0) + 100}</p>
          </div>

          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745', marginTop: '15px' }}>
            It will be delivered by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString()}
          </p>

          <div style={{ marginTop: '20px', display: 'flex', gap: '15px',  justifyContent: 'flex-end', }}>
             <button onClick={handleBookOrder} style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontSize:'18px' }}>
              Book Order
            </button>
            <button onClick={() => setShowSummary(false)} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', fontSize:'18px' }}>
              Cancel
            </button>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
