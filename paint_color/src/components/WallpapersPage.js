import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const colors = ['Red', 'Orange', 'Yellow', 'Pink', 'Blue', 'Green', 'Brown', 'White'];

const WallpapersPage = () => {
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [wallpapers, setWallpapers] = useState([]);
  const navigate = useNavigate();

  const colorMap = {
    'Red': 'red',
    'Orange': 'orange',
    'Yellow': 'yellow',
    'Pink': 'pink',
    'Blue': 'blue',
    'Green': 'green',
    'Brown': 'brown',
    'White': 'white',
  };

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const endpoint = selectedColor
          ? `http://localhost:8000/api/wallpapers/${colorMap[selectedColor]}`
          : 'http://localhost:8000/api/wallpapers/'; // All textures
        const res = await axios.get(endpoint);
        setWallpapers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWallpapers();
  }, [selectedColor]);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
   
      <div style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginRight: '30px',
        width: '250px',
        minHeight: '400px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        flexShrink: 0,
        flexGrow: 0,
      }}>
        <h2 style={{ color: '#333', fontSize: '25px', marginBottom: '20px', textAlign: 'center' }}>
          Pick a Color
        </h2>
        {colors.map((color) => (
          <label
            key={color}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '12px 0',
              fontSize: '22px',
              color: '#444',
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '8px 12px',
              transition: 'background 0.2s ease-in-out',
              backgroundColor: selectedColor === color ? '#e0f0ff' : 'transparent',
            }}
          >
            <input
              type="radio"
              name="color"
              value={color}
              checked={selectedColor === color}
              onChange={() => setSelectedColor(color)}
              style={{ marginRight: '10px' }}
            />
            {color}
          </label>
        ))}
        
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      margin: '12px 0',
      fontSize: '22px',
      color: '#444',
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '8px 12px',
      transition: 'background 0.2s ease-in-out',
      backgroundColor: selectedColor === '' ? '#e0f0ff' : 'transparent',
    }}
  >
    <input
      type="radio"
      name="color"
      value=""
      checked={selectedColor === ''}
      onChange={() => setSelectedColor('')}
      style={{ marginRight: '10px' }}
    />
    Show All
  </label> 
      </div>

    
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.id}
            onClick={() => navigate(`/wallpaper/${wallpaper.id}`)}
            style={{
              cursor: 'pointer',
              width: '300px',
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
              src={`http://localhost:8000/media/${wallpaper.picture}`}
              alt={wallpaper.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px', backgroundColor: '#000', color: '#fff' }}>
              <h3>{wallpaper.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WallpapersPage
