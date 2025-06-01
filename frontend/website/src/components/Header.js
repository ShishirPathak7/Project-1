import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import imageBanner from '../images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

const LogoWithLink = () => {
  const logoStyles = {
    width: '140px',
    height: 'auto',
    objectFit: 'contain',
    transition: 'all 0.3s ease',
  };

  return (
    <Link to="/">
      <img src={imageBanner} alt="Logo" style={logoStyles} />
    </Link>
  );
};

function Header() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setShowMediaIcons(!showMediaIcons);
    setMenuOpen(!menuOpen);
  };

  const hamburgerMenuStyle = {
    display: windowWidth <= 1080 ? 'block' : 'none',
    padding: '10px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '24px',
  };

  const navContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  };

  const navLinksStyle = {
    display: windowWidth <= 1080
      ? showMediaIcons ? 'flex' : 'none'
      : 'flex',
    flexDirection: windowWidth <= 1080 ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    listStyleType: 'none',
    gap: windowWidth <= 1080 ? '15px' : '40px',
    margin: 0,
    padding: 0,
    flex: 1,
  };

  const navStyle = {
    backgroundColor: 'blue',
    padding: '10px 20px',
  };

  return (
    <div className="mainHeader" id="home">
      <nav className="navbar" style={navStyle}>
        <div style={navContainerStyle}>
          {/* Logo */}
          <div style={{ flex: '0 0 auto' }}>
            <LogoWithLink />
          </div>

          {/* Navigation Links */}
          <ul style={navLinksStyle}>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/About">About</CustomLink>
            <CustomLink to="/Contact">Contact</CustomLink>
            <CustomLink to="/Login">Login</CustomLink>
            <CustomLink to="/SignUp">Signup</CustomLink>
          </ul>

          {/* Hamburger Icon */}
          <div className="hamburger-menu" style={hamburgerMenuStyle} onClick={toggleMenu}>
            {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>
      <div className="clearfix"> </div>
    </div>
  );
}

// Updated link style
function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link
        to={to}
        style={{
          color: 'white',
          fontWeight: 'bold',
          textDecoration: 'none',
          fontSize: '26px',
          padding: '10px 15px',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
      >
        {children}
      </Link>
    </li>
  );
}

export default Header;
