import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ServiceFormPage = () => {
  const location = useLocation();
  const { service } = location.state || {};
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (!localUser.email) return;

      try {
        const res = await fetch(`http://localhost:8000/api/user-details/?email=${localUser.email}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            date: '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch user details:', err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert('User not loaded. Please login again.');
      return;
    }

    const bookingData = {
      user: user.id,
      service_name: service.title,
      service_price: service.price.toString(),
      preferred_date: formData.date,
    };

    try {
      const res = await fetch('http://localhost:8000/api/book-service/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        alert(
          `Service booked successfully!\n\nWe will meet you on ${formData.date}.\n\nBest regards,\nColorIt`
        );
      } else {
        const errData = await res.json();
        console.error('Booking error response:', errData);
        alert('Booking failed!');
      }
    } catch (err) {
      console.error('Error booking service:', err);
      alert('Something went wrong!');
    }
  };

  if (!service) return <div>Service details not found.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
      
        <div style={styles.leftPane}>
          <img src={service.image} alt={service.title} style={styles.image} />
          <h2 style={styles.title}>{service.title}</h2>
          <p style={styles.description}>{service.description}</p>
          <h4 style={styles.price}>Price: ₹{service.price}</h4>
        </div>

       
        <form style={styles.form} onSubmit={handleBooking}>
          <h2 style={styles.formTitle}>Book This Service</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={styles.input} required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={styles.input} required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={styles.input} required />
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" style={styles.textarea} required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} required />
          <button type="submit" style={styles.button}>Book Service</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f4f7fb',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    maxWidth: '1200px',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  leftPane: {
    flex: 1,
    padding: '30px',
    borderRight: '1px solid #eaeaea',
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '26px',
    color: '#333',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  price: {
    fontSize: '18px',
    color: '#007bff',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  input: {
    marginBottom: '15px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    marginBottom: '15px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minHeight: '80px',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default ServiceFormPage;
