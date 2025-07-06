import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './components/header.css';
import './components/footer.css';
import './components/contact.css';
import './App.css';

import Header from './components/header';
import Footer from './components/footer';
import About from './components/About';
import Contact from './components/contact';
import ShadesPage from './components/Shadespage';
import ColorDetailsPage from './components/ColorDetailsPage';
import TexturesPage from './components/TexturesPage';
import TextureDetailsPage from './components/TextureDetailsPage';
import WallpapersPage from './components/WallpapersPage';
import WallpaperDetailsPage from './components/WallpaperDetailsPage';
import BookServicesPage from './components/BookServicesPage';
import AuthPage from './components/AuthPage';
import ServiceFormPage from './components/ServiceFormPage';
import CartPage from './components/CartPage';
import MyOrdersPage from './components/MyOrdersPage';
import MyServicesPage from './components/MyServicesPage';

function AppWrapper() {
  const contactRef = useRef(null);
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState('');

  const handleScrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate('/shades'); 
  };

  return (
    <div className="App">
      <Header onContactClick={handleScrollToContact} onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className='outer'>
                <div className="main1">
                  <About />
                </div></div>
              
            </>
          }
        />
        <Route path="/shades/:type" element={<ShadesPage />} />
        <Route path="/shades" element={<ShadesPage searchQuery={searchQuery} />} />
        <Route path="/color/:id" element={<ColorDetailsPage />} />
        <Route path="/textures" element={<TexturesPage />} />
        <Route path="/texture/:id" element={<TextureDetailsPage />} />
        <Route path="/wallpapers" element={<WallpapersPage />} />
        <Route path="/wallpaper/:id" element={<WallpaperDetailsPage />} />
        <Route path="/services" element={<BookServicesPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/book-service" element={<ServiceFormPage />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/myservices" element={<MyServicesPage />} />

      </Routes>
      <section ref={contactRef} id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
