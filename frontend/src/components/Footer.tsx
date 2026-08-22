import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { company } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company */}
          <div className="footer-company">
            <Link to="/" className="footer-brand">
              <img
                src="/images/logo.png"
                alt="Happy Technologies"
                className="footer-logo"
              />

              <div>
                <strong>HAPPY TECHNOLOGIES</strong>

                <p>
                  Modern websites, web applications, software applications and
                  digital solutions for growing businesses.
                </p>
              </div>
            </Link>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h4>Company</h4>

            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4>Services</h4>

            <Link to="/services">Business Websites</Link>
            <Link to="/services">Web Applications</Link>
            <Link to="/services">Software Applications</Link>
            <Link to="/services">SEO</Link>
            <Link to="/services">Digital Marketing</Link>
            <Link to="/services">Website Maintenance</Link>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact</h4>

            <a href={`mailto:${company.email}`}>
              <Mail size={15} />
              {company.email}
            </a>

            <a href={`tel:${company.phone}`}>
              <Phone size={15} />
              {company.phone}
            </a>

            <span>
              <MapPin size={15} />
              {company.location}
            </span>
          </div>

          {/* Social Media */}
          <div className="footer-column footer-social">
            <h4>Follow Us</h4>

            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/happy-technologies-090b5242b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.instagram.com/happytchn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Happy Technologies. All rights
            reserved.
          </span>

          <Link to="/contact">
            Start a Project
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </footer>
  );
}