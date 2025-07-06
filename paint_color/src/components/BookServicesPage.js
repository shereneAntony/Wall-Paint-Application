import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const services = [
  {
    title: 'Interior Painting',
    image: 'https://i.pinimg.com/736x/7c/25/de/7c25de826a50823412486a92bd503823.jpg',
    price: 5000,
    description: 'Enhance the beauty of your home with our elegant and durable interior painting solutions tailored to your taste.',
    highlights: [
      '🎨 Expert color consultation to match your style',
      '🧱 Crack repair, priming, and surface smoothing',
      '🖌️ High-quality wall and ceiling painting',
      '🚪 Trim, doors, and window frame finishing',
      '🌿 Odorless, eco-friendly low-VOC paints',
      '🧼 Dust-free work & thorough cleanup',
    ],
  },
  {
    title: 'Exterior Painting',
    image: 'https://i.pinimg.com/736x/39/2c/42/392c42a20800f9d43ea73044b6748ff1.jpg',
    price: 8000,
    description: 'Protect and beautify the outside of your home with weather-resistant exterior paint and clean finishes.',
    highlights: [
      '🏡 Painting for walls, gates, railings, and fences',
      '🧼 Pressure washing and fungal treatment prep',
      '🖌️ Application of weather-shield paints',
      '🌦️ UV & rain protection coatings',
      '🧱 Minor exterior crack patching included',
    ],
  },
  {
    title: 'Waterproofing',
    image: 'https://i.pinimg.com/736x/fe/b2/92/feb292676beeaa7050c8896b99cd7351.jpg',
    price: 6500,
    description: 'Say goodbye to dampness and leaks with our expert waterproofing services for rooftops, bathrooms, and more.',
    highlights: [
      '💧 Terrace and roof waterproof membrane application',
      '🚿 Leak sealing for wet areas (bathroom/kitchen)',
      '🧱 Wall crack filling and damp-proof coating',
      '🔬 Use of chemical sealants & PU coatings',
      '✅ 3-5 years warranty options available',
    ],
  },
  {
    title: 'Bathroom Renovation',
    image: 'https://i.pinimg.com/736x/c7/0a/63/c70a63aa8332b2348d663e3c7d935c9a.jpg',
    price: 15000,
    description: 'Upgrade your bathroom into a modern, functional space with complete remodeling, plumbing, and tiling.',
    highlights: [
      '🚽 Total transformation: design to finish',
      '🛁 New tiling, sanitaryware, shower panels',
      '🔧 Plumbing & electrical rerouting',
      '💡 Elegant lighting, exhaust & mirrors',
      '🧼 Waterproofing and anti-slip flooring',
    ],
  },
];
const BookServicesPage = () => {
  const navigate = useNavigate();
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: `'Segoe UI', sans-serif`,
    backgroundColor: '#f8f9fc',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    marginBottom: '40px',
  };

  const imageStyle = {
    width: '40%',
    height: '350px',
    objectFit: 'cover',
  };

  const contentStyle = {
    width: '60%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 700,
    color: '#222',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '22px',
    color: '#444',
    marginBottom: '12px',
    lineHeight: 1.5,
  };

  const subheadingStyle = {
    fontSize: '25px',
    fontWeight: 600,
    color: '#000',
    marginTop: '10px',
    marginBottom: '10px',
  };

  const priceStyle = {
    fontSize: '22px',
    fontWeight: 600,
    color: 'blue',
    marginBottom: '10px',
  };

  const listStyle = {
    paddingLeft: '20px',
    marginBottom: '20px',
    color: '#333',
    lineHeight: '1.6',
    fontSize: '20px',
  };


  const buttonStyle = {
    alignSelf: 'center',
    padding: '12px 24px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '25px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '50px', color: '#2c3e50' }}>
        Our Premium Home Services
      </h1>

      {services.map((service, idx) => (
        <div key={idx} style={cardStyle}>
          <img src={service.image} alt={service.title} style={imageStyle} />
          <div style={contentStyle}>
            <div style={titleStyle}>{service.title}</div>
            <div style={descriptionStyle}>{service.description}</div>
            <div style={priceStyle}>Starting at ₹{service.price}</div>
            <div style={subheadingStyle}>What You’ll Get:</div>
            <ul style={listStyle}>
              {service.highlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            
                        <button
              style={buttonStyle}
              onClick={() => {
                const user = localStorage.getItem('user');
                if (user) {
                    navigate('/book-service', {
        state: {
          service: {
            title: service.title,
            image: service.image,
            price: service.price,
            description: service.description,
          }
        }
      });
                } else {
                  alert('Please login or register to book a service.');
                  navigate('/login', { state: { from: '/services' } });

                }
              }}
            >
              Book Service
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookServicesPage
