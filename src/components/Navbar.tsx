import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="brand">
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

        {/* Navigation */}
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
      </div>
    </header>
  );
}