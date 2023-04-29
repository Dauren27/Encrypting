import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/hash">
        Хэширование
      </Link>
      <Link to="/encrypt">
        Шифрование
      </Link>
    </div>
  )
}

export default Navbar
