import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <img
            src="/images/logo.png"
            alt="Happy Technologies"
            className="brand-logo"
          />

          <div className="brand-text">
            <strong>HAPPY</strong>
            <span>TECHNOLOGIES</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path ? 'active' : ''
              }
            >
              {item.label}
            </Link>
          ))}

          <Link to="/contact" className="nav-cta">
            Start a Project
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`mobile-nav ${
          isMenuOpen ? 'mobile-nav-open' : ''
        }`}
      >
        {navigation.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path ? 'active' : ''
            }
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}

        <Link
          to="/contact"
          className="nav-cta"
          onClick={closeMenu}
        >
          Start a Project
        </Link>
      </div>
    </header>
  );
}