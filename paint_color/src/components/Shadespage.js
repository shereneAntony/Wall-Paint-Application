import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Shadespage = ({ searchQuery }) => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categoryInfo = {
    warm: { title: 'Warm Colors', description: 'Warm colors create a cozy and energetic space.' },
    cool: { title: 'Cool Colors', description: 'Cool colors bring calmness and serenity.' },
    pastel: { title: 'Pastel Shades', description: 'Pastels offer soft and airy vibes.' },
    bold: { title: 'Bold & Vibrant', description: 'Make a statement with bold and bright shades.' },
    earthy: { title: 'Earthy / Natural Tones', description: 'Inspired by nature for a grounded ambiance.' },
    luxury: { title: 'Luxury Shades', description: 'Elegant and premium tones for high-end design.' },
    kids: { title: 'Kids Room Colors', description: 'Fun and cheerful colors for little ones.' },
    accent: { title: 'Accent Colors', description: 'Add highlights with standout accent tones.' },
    common: { title: 'All Colors', description: 'Common colors include widely recognized and versatile shades.' },
  };

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const endpoint = searchQuery
          ? `http://localhost:8000/api/colors/?search=${searchQuery}`
          : `http://localhost:8000/api/colors/type/${type}/`;

        const response = await axios.get(endpoint);
        const data = response.data;
        const colorList = searchQuery ? data : Object.values(data).flat();

        const uniqueMap = {};
        colorList.forEach((color) => {
          const key = `${color.name?.toLowerCase().trim()}-${color.category?.toLowerCase().trim()}`;
          if (!uniqueMap[key]) {
            uniqueMap[key] = color;
          }
        });

        const uniqueColors = Object.values(uniqueMap);
        setColors(uniqueColors);
        setLoading(false);

        if (searchQuery) {
          setTitle(`Search Results for "${searchQuery}"`);
          setDescription('');
        } else {
          setTitle(categoryInfo[type]?.title || 'Shades');
          setDescription(categoryInfo[type]?.description || '');
        }
      } catch (error) {
        console.error('Error fetching colors:', error);
        setLoading(false);
      }
    };

    fetchColors();
  }, [type, searchQuery]);

  const groupedColors = colors.reduce((groups, color) => {
    if (!groups[color.category]) groups[color.category] = [];
    groups[color.category] = [...groups[color.category], color];
    return groups;
  }, {});

  const categoryList = Object.keys(groupedColors);

  if (loading) {
    return <p style={{ fontSize: '25px', padding: '20px' }}>Loading...</p>;
  }

  if (!colors.length) {
    return <p style={{ fontSize: '25px', padding: '20px' }}>No matching colors found.</p>;
  }

  return (
    <div style={{ display: 'flex', backgroundColor:'#E2DFD2'}}>
      {/* Side Menu */}
      <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
        <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Categories</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categoryList.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                cursor: 'pointer',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: selectedCategory === cat ? '#000' : '#f0f0f0',
                color: selectedCategory === cat ? '#fff' : '#333',
                borderRadius: '6px',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
              }}
            >
              {cat.toUpperCase()}
            </li>
          ))}
          <li
            onClick={() => setSelectedCategory('')}
            style={{
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: !selectedCategory ? '#000' : '#f0f0f0',
              color: !selectedCategory ? '#fff' : '#333',
              borderRadius: '6px',
              fontWeight: !selectedCategory ? 'bold' : 'normal',
            }}
          >
            SHOW ALL
          </li>
        </ul>
      </div>

     
      <div style={{ flex: 1, padding: '30px', backgroundColor:'white'}}>
        <h1>{title}</h1>
        {description && <p style={{ fontSize: '20px', marginBottom: '30px' }}>{description}</p>}

        {(selectedCategory ? [[selectedCategory, groupedColors[selectedCategory]]] : Object.entries(groupedColors)).map(
          ([category, colorGroup]) => (
            <div key={category} style={{ marginTop: '30px' }}>
              <h2
                style={{
                  marginBottom: '20px',
                  color: '#fff',
                  fontSize: '28px',
                  backgroundColor: '#000',
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                {category.toUpperCase()}
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  justifyContent: 'center',
                }}
               

              >
                {colorGroup.map((color) => (
                  <div
                    key={color.id}
                    onClick={() => navigate(`/color/${color.id}`)}
                    style={{
                      cursor: 'pointer',
                      width: '300px',
                      height: '200px',
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      textAlign: 'center',
                      boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                    }}
                     onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                     onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <img
                      src={`http://localhost:8000/media/${color.picture}`}
                      alt={color.name}
                      style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        padding: '10px',
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: '#000',
                        fontSize: '22px',
                      }}
                    >
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Shadespage;
