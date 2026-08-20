import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

import { company } from '../data/siteData';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setStatus('Sending...');

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      'access_key',
      '23f9dfb8-53f7-477a-9f88-a00c6e2a5198'
    );

    formData.append(
      'subject',
      'New Enquiry - Happy Technologies'
    );

    formData.append(
      'from_name',
      'Happy Technologies Website'
    );

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        form.reset();
        setStatus('');
        setShowSuccessModal(true);
      } else {
        setStatus(
          'Unable to send your enquiry. Please try again.'
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus(
        'Something went wrong. Please try again later.'
      );
    }
  };

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
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                />
              </label>
            </div>

            <label>
              Company
              <input
                type="text"
                name="company"
                placeholder="Your company name"
              />
            </label>

            <label>
              What do you need?
              <select
                name="service"
                defaultValue=""
                required
              >
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
                  Software Application
                </option>

                <option value="maintenance">
                  Website Maintenance
                </option>

                <option value="other">
                  Digital Marketing
                </option>
              </select>
            </label>

            <label>
              Tell us about your project
              <textarea
                name="message"
                placeholder="Tell us what you're looking to build..."
                required
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Send Enquiry
              <ArrowRight size={17} />
            </button>

            {status && (
              <p className="form-status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div
          className="success-modal-overlay"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="success-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="success-modal-icon">
              ✓
            </div>

            <h2>Thank You!</h2>

            <p>
              Thank you for submitting your enquiry.
              We’ll get back to you shortly.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}