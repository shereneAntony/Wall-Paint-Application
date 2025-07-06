import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const localUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/my-services/?email=${localUser.email}`);
        setServices(response.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    if (localUser.email) {
      fetchServices();
    }
  }, [localUser.email]);

  if (loading) return <p style={{ fontSize: '24px' }}>Loading your services...</p>;
  if (services.length === 0) return <p style={{ fontSize: '24px' }}>You have not booked any services yet.</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto',backgroundColor:'#FCF5E5' }}>
       <h2 style={{
  fontSize: '40px',
  marginBottom: '30px',
  textAlign: 'center',
  fontFamily: '"Manufacturing Consent", system-ui',
  fontWeight: 1000,
  fontStyle: 'normal'
}}>My Booked Services</h2>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>{service.service_name}</h3>
            <p style={{ fontSize: '16px', color: '#555' }}><strong>Price:</strong> ₹{service.service_price}</p>
            <p style={{ fontSize: '16px', color: '#555' }}>
              <strong>Service Date:</strong> {new Date(service.preferred_date).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServicesPage;
