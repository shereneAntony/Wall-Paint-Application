import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const localUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/my-orders/?email=${localUser.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [localUser.email]);

  if (loading) return <p style={{ fontSize: '24px' }}>Loading your orders...</p>;
  if (orders.length === 0) return <p style={{ fontSize: '24px' }}>You haven't placed any orders yet.</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto',backgroundColor:'#FCF5E5' }}>
        <h2 style={{
  fontSize: '40px',
  marginBottom: '30px',
  textAlign: 'center',
  fontFamily: '"Manufacturing Consent", system-ui',
  fontWeight: 1000,
  fontStyle: 'normal'
}}>My Orders</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {orders.map(order => (
          <div key={order.id} style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            padding: '20px',
          }}>
            <img
              src={`http://localhost:8000/media/${order.picture}`}
              alt={order.product_name}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '15px'
              }}
            />
            <h3 style={{ margin: '0 0 10px' }}>{order.product_name}</h3>
            <p style={{ margin: '5px 0' }}><strong>Type:</strong> {order.product_type}</p>
            <p style={{ margin: '5px 0' }}><strong>Price:</strong> ₹{order.product_price}</p>
            <p style={{ margin: '5px 0' }}><strong>Quantity:</strong> {order.quantity}</p>
            <p style={{ margin: '5px 0', color: '#28a745' }}>
              <strong>Delivery Date:</strong> {new Date(order.delivery_date).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
