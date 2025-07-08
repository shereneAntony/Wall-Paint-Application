import React from 'react';
import bgimg from '../assets/bgimg.jpg';

const About = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Left Side - Image */}
      <div
        style={{
          flex: '1 1 400px',
          maxWidth: '500px',
          marginRight: '30px',
        }}
      >
        <img
          src={bgimg}
          alt="Color It Banner"
          style={{
            width: '100%',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      {/* Right Side - Text Content */}
      <div
        style={{
          flex: '1 1 500px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2
          style={{
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#f8f8f8',
          }}
        >
          "Make your lives colorful with Color It"
        </h2>

        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#ffcc00',
          }}
        >
          About Us
        </h1>

        <div style={{ fontSize: '18px', lineHeight: '1.8', textAlign: 'justify' }}>
          <p style={{ marginBottom: '20px' }}>
            Welcome to <strong>Color It</strong>, where your walls come to life with vibrant color, personality, and
            style. As a proud Indian paint brand, we are dedicated to transforming every home into a canvas of
            creativity, warmth, and expression. Just like you, we believe in living life in full color.
          </p>

          <p style={{ marginBottom: '20px' }}>
            Whether you're painting your dream home or revamping a single room, Color It offers a wide range of interior
            and exterior paints, textures, waterproofing solutions, and designer finishes to suit every space and mood.
            Our eco-friendly, long-lasting paints are crafted with care and cutting-edge technology to ensure brilliance,
            durability, and safety.
          </p>

          <p style={{ marginBottom: '20px' }}>
            Inspired by the needs of modern homes and the rich palette of Indian life, Color It stands for trust,
            innovation, and excellence. Our commitment goes beyond just paint — it’s about helping you create the perfect
            environment where life’s best moments happen.
          </p>

          <p style={{ marginBottom: '0px' }}>
            Join the <strong>Color It</strong> family and let your walls speak your style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
