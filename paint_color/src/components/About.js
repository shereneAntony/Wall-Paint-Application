import React from 'react';
import bgimg from '../assets/bgimg.jpg';

const About = () => {
  return (
    <div style={{
      width: '100%',
      padding: '20px 10px',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#2c2c2c',
      lineHeight: '1.8',
      boxSizing: 'border-box',

    }}>
    
      <img
        src={bgimg}
        alt="Color It banner"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          marginBottom: '30px',
        }}
      />

     
      <h2 style={{
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: '28px',
        color: '#fff',
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        "Make your lives colorful with Color It"
      </h2>

     
      <h1 style={{
        fontSize: '36px',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '30px',
        color: '#fff',
      }}>
        About Us
      </h1>

    
      <div style={{ fontSize: '18px', textAlign: 'justify', padding: '0 10px' }}>
        <p style={{ marginBottom: '20px', fontSize:'22px',color:'white' }}>
          Welcome to <strong>Color It</strong>, where your walls come to life with vibrant color, personality, and style.
          As a proud Indian paint brand, we are dedicated to transforming every home into a canvas of creativity, warmth,
          and expression. Just like you, we believe in living life in full color.
        </p>

        <p style={{ marginBottom: '20px', fontSize:'22px',color:'white' }}>
          Whether you're painting your dream home or revamping a single room, Color It offers a wide range of interior
          and exterior paints, textures, waterproofing solutions, and designer finishes to suit every space and mood.
          Our eco-friendly, long-lasting paints are crafted with care and cutting-edge technology to ensure brilliance,
          durability, and safety.
        </p>

         <p style={{ marginBottom: '20px', fontSize:'22px',color:'white'  }} >
          Inspired by the needs of modern homes and the rich palette of Indian life, Color It stands for trust,
          innovation, and excellence. Our commitment goes beyond just paint — it’s about helping you create the perfect
          environment where life’s best moments happen.
        </p>

        <p style={{ marginBottom: '20px', fontSize:'22px',color:'white'  }} >
          Join the <strong>Color It</strong> family and let your walls speak your style.
        </p>
      </div>
    </div>
  );
};

export default About;
