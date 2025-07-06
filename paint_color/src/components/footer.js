import React from 'react'

import './footer.css';

const footer = () => {
  return (
    <div>
     <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Color It. All rights reserved.</p>
    </footer> 
    </div>
  )
}

export default footer
