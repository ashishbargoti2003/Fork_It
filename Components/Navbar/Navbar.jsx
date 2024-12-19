import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [productsDropdown, setProductsDropdown] = useState(false); // State for products dropdown
  const menuRef = useRef();

  // Dummy product data
  const products = [
    { name: "Diet Delights", route: "/Diet Delights" },
    { name: "Nourish Hub", route: "/Nourish Hub" },
    { name: "What can I make ?", route: "/What can I make ?" },
    { name: "Virtual Dish", route: "/Virtual Dish" },
    { name: "Ingredient Swap", route: "/Ingredient Swap" },
    { name: "Explore Recipe ", route: "/Explore Recipe" },
  ];

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const toggleProductsDropdown = () => {
    setProductsDropdown(!productsDropdown);
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => { setMenu("shop") }} className="nav-logo">
        <img src={logo} alt="" />
        <p>fork IT</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}>
          <Link to='/'>Home</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li>About</li>
        <li 
          onMouseEnter={toggleProductsDropdown} 
          onMouseLeave={toggleProductsDropdown} 
          style={{ position: 'relative' }} // Ensure dropdown is positioned correctly
        >
          Products
          {productsDropdown && (
            <ul className="products-dropdown">
              {products.map((product, index) => (
                <li key={index}>
                  <Link to={product.route}>{product.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>Idk</li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
      </div>
    </div>
  );
};

export default Navbar;
