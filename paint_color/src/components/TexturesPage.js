import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const rooms = ['Living Room', 'Bed Room', 'Kids Room', 'Prayer Room'];

const TexturesPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [textures, setTextures] = useState([]);
  const navigate = useNavigate();

  const roomMap = {
    'Living Room': 'living',
    'Bed Room': 'bed',
    'Kids Room': 'kids',
    'Prayer Room': 'prayer',
  };

  useEffect(() => {
    const fetchTextures = async () => {
      try {
        const endpoint = selectedRoom
          ? `http://localhost:8000/api/textures/${roomMap[selectedRoom]}`
          : 'http://localhost:8000/api/textures/'; 
        const res = await axios.get(endpoint);
        setTextures(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTextures();
  }, [selectedRoom]);

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
          Select Room
        </h2>
       

 {rooms.map((room) => (
    <label
      key={room}
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
        backgroundColor: selectedRoom === room ? '#e0f0ff' : 'transparent',
      }}
    >
      <input
        type="radio"
        name="room"
        value={room}
        checked={selectedRoom === room}
        onChange={() => setSelectedRoom(room)}
        style={{ marginRight: '10px' }}
      />
      {room}
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
      backgroundColor: selectedRoom === '' ? '#e0f0ff' : 'transparent',
    }}
  >
    <input
      type="radio"
      name="room"
      value=""
      checked={selectedRoom === ''}
      onChange={() => setSelectedRoom('')}
      style={{ marginRight: '10px' }}
    />
    Show All
  </label>     
        
      
      </div>

     
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {textures.map((texture) => (
          <div
            key={texture.id}
            onClick={() => navigate(`/texture/${texture.id}`)}
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
              src={`http://localhost:8000/media/${texture.picture}`}
              alt={texture.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px', backgroundColor: '#000', color: '#fff' }}>
              <h3>{texture.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TexturesPage;
