import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

import { company } from '../data/siteData';

export default function Contact() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">CONTACT</span>

          <h1>
            Let's talk about
            <span> your project.</span>
          </h1>

          <p>
            Tell us about your business, your current website or the
            digital product you're planning. We'll help you understand
            the next steps.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={21} />
              </div>

              <div>
                <span>Email</span>

                <a href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={21} />
              </div>

              <div>
                <span>Phone</span>

                <a href={`tel:${company.phone}`}>
                  {company.phone}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin size={21} />
              </div>

              <div>
                <span>Location</span>

                <strong>{company.location}</strong>
              </div>
            </div>

            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-contact"
            >
              <MessageCircle size={20} />

              <div>
                <strong>Chat on WhatsApp</strong>
                <span>Get in touch directly</span>
              </div>

              <ArrowRight size={17} />
            </a>
          </div>

          <form
            className="contact-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="form-row">
              <label>
                Name
                <input
                  type="text"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                />
              </label>
            </div>

            <label>
              Company
              <input
                type="text"
                placeholder="Your company name"
              />
            </label>

            <label>
              What do you need?
              <select defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option value="website">
                  Business Website
                </option>
                <option value="application">
                  Web Application
                </option>
                <option value="uiux">
                  UI / UX Development
                </option>
                <option value="maintenance">
                  Website Maintenance
                </option>
                <option value="other">
                  Something Else
                </option>
              </select>
            </label>

            <label>
              Tell us about your project
              <textarea
                placeholder="Tell us what you're looking to build..."
                required
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Send Enquiry
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}