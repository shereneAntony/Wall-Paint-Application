import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF } from 'react-icons/fa';
import './contact.css';

function ContactUs() {
  return (
    <section className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <p><FaPhoneAlt className="icon" /> +91 98765 43210</p>
        <p><FaEnvelope className="icon" /> coloritservices@colorit.com</p>
        <p><FaMapMarkerAlt className="icon" /> 11/21, Rainbow Street, Chennai,Tamil Nadu, India</p>
        <div className="social-icons">
          <div className="social-icons">
  <p><FaInstagram className="icon" /><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Color_It_Services</a></p>
  <p><FaFacebookF className="icon" /><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Color_It_Services</a></p>
</div>

        </div>
      </div>
    </section>
  );
}

export default ContactUs;
