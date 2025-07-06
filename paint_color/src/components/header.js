import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/paintlogo2.png';
import './header.css';

function Header({ onContactClick, onSearch }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [activeNav, setActiveNav] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleDropdownClick = (type) => {
    setActiveNav('shades');
    navigate(`/shades/${type.toLowerCase()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      setActiveNav('');
      onSearch(searchText.trim().toLowerCase());
      setSearchText('');
      navigate('/shades');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); 
  };

  return (
    <header className="header">
      <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>
      <div className="header-content">
        <div className="branding">
          <img className="logo" src={logo} alt="logo" />
          <div className="titleContainer">
            <h1 className="title">Color It</h1>
            <p className="quote">Make Your Lives Colourful</p>
          </div>
        </div>
      </div>

      <nav className="navbar">
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Colors"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn" style={{
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
}}><i className="fa fa-search" style={{ color: 'white', fontSize: '20px' }}></i></button>
        </form>

     
        <div className="dropdown">
          <button className={`dropbtn ${activeNav === 'shades' ? 'active' : ''}`}
            onClick={() => setActiveNav('shades')}>
            Shades of Colors
          </button>
          <div className="dropdown-content">
            <a onClick={() => handleDropdownClick('warm')}>Warm Colors</a>
            <a onClick={() => handleDropdownClick('cool')}>Cool Colors</a>
            <a onClick={() => handleDropdownClick('pastel')}>Pastel Shades</a>
            <a onClick={() => handleDropdownClick('bold')}>Bold & Vibrant</a>
            <a onClick={() => handleDropdownClick('earthy')}>Earthy / Natural Tones</a>
            <a onClick={() => handleDropdownClick('luxury')}>Luxury Shades</a>
            <a onClick={() => handleDropdownClick('kids')}>Kids Room Colors</a>
            <a onClick={() => handleDropdownClick('accent')}>Accent Colors</a>
            <a onClick={() => handleDropdownClick('common')}>All Colors</a>
          </div>
        </div>

        <div className="dropdown">
          <button className={`dropbtn ${activeNav === 'products' ? 'active' : ''}`}
            onClick={() => setActiveNav('products')}>
            Products
          </button>
          <div className="dropdown-content">
            <a onClick={() => navigate('/shades/common')}>Paints</a>
            <a onClick={() => navigate('/textures')}>Textures</a>
            <a onClick={() => navigate('/wallpapers')}>Wallpapers</a>
          </div>
        </div>

        <div className="dropdown">
          <button
            className={`dropbtn ${activeNav === 'services' ? 'active' : ''}`}
            onClick={() => {
              setActiveNav('services');
              navigate('/services');
            }}>
            Services
          </button>
        </div>

        <button className={`contact-btn ${activeNav === 'contact' ? 'active' : ''}`}
          onClick={() => {
            setActiveNav('contact');
            onContactClick();
          }}>
          Contact Us
        </button>

        <div className="dropdown">
          <button className={`dropbtn ${activeNav === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveNav('profile')}>
            {user ? `Welcome, ${user.name}` : 'Profile'}
          </button>
          <div className="dropdown-content">
            {!user && <a onClick={() => navigate('/login')}>Login / Register</a>}
             {user &&<a onClick={() => navigate('/myorders')}>My Orders</a>}
             {user &&<a onClick={() => navigate('/myservices')}>My Services</a>}
           {user && <a onClick={() => navigate('/cart')}> My Cart</a>}
            {user && <a onClick={handleLogout}>Logout</a>}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
