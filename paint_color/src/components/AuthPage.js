import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const AuthPage = () => {
 const [isLogin, setIsLogin] = useState(true);
 const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.from || '/'; 

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '', address: '' });
    setErrors({});
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = {};


  if (!form.email.includes('@')) {
    validationErrors.email = 'Invalid email address';
  }

  if (!validatePassword(form.password)) {
    validationErrors.password =
      'Password must be 8+ chars and include uppercase, lowercase, number, and special character';
  }

  if (!isLogin) {
    if (!form.name) validationErrors.name = 'Username is required';
    if (!form.phone.match(/^\d{10}$/)) validationErrors.phone = 'Phone must be 10 digits';
    if (form.password !== form.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
    if (!form.address) validationErrors.address = 'Address is required';
  }

  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    try {
      if (isLogin) {
       
        const response = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Logged in successfully!');
    
          const userData = data.user || { name: 'User' }; 
          localStorage.setItem('user', JSON.stringify(userData));
          setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '', address: '' });
          window.location.href = redirectPath; 

          
     
        } else {
          alert(data.error || 'Login failed');
        }

      } else {
       
        const response = await fetch('http://localhost:8000/api/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            password: form.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Registered successfully!');
          setIsLogin(true); 
           setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '', address: '' });
        } else {
          alert(JSON.stringify(data));
        }
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
      console.error(err);
    }
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={ { textAlign:'center'}}>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={form.name}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.name && <p style={styles.error}>{errors.name}</p>}

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.phone && <p style={styles.error}>{errors.phone}</p>}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          {!isLogin && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}

              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                style={{ ...styles.input, height: '60px' }}
              />
              {errors.address && <p style={styles.error}>{errors.address}</p>}
            </>
          )}

          <button type="submit" style={styles.button}>
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </button>
        </form>
        <p style={{ marginTop: '10px' ,fontSize:'18px'}}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleForm} style={styles.toggle}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
container: {
  minHeight: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',               
  WebkitBackdropFilter: 'blur(10px)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
},

formCard: {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '24px', 
  width: '450px',       
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)', 
},

  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '12px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  toggle: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginTop: '-8px',
    marginBottom: '8px',
  },
};

export default AuthPage
