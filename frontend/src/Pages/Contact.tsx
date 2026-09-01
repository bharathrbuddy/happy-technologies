import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

import { company } from "../data/siteData";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSending, setIsSending] = useState(false);


const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const enquiryData = {
    name: formData.get("name")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    countryCode:
      formData.get("countryCode")?.toString().trim() || "+91",
    email: formData.get("email")?.toString().trim() || "",
    company: formData.get("company")?.toString().trim() || "",
    service: formData.get("service")?.toString().trim() || "",
    budget: formData.get("budget")?.toString().trim() || "",
    timeline: formData.get("timeline")?.toString().trim() || "",
    contactMethod:
      formData.get("contactMethod")?.toString().trim() || "",
    message: formData.get("message")?.toString().trim() || "",
  };

  setIsSending(true);
  setStatus("Sending your enquiry...");

  try {
    const response = await fetch(
      "https://happy-technologies-backend.onrender.com/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      form.reset();
      setStatus("");
      setShowSuccessModal(true);
    } else {
      setStatus(
        data.message ||
          "Unable to send your enquiry. Please try again."
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);

    setStatus(
      "Unable to connect to the server. Please try again later."
    );
  } finally {
    setIsSending(false);
  }
};


  return (
    <>
      <Helmet>
        <title>Contact Us | Happy Technologies</title>

        <meta
          name="description"
          content="Contact Happy Technologies for website development, e-commerce solutions, SEO services, website maintenance and custom software development."
        />
      </Helmet>

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
            {/* Contact Information */}
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
                rel="noopener noreferrer"
                className="whatsapp-contact"
              >
                <MessageCircle size={20} />

                <div>
                  <strong>Chat on WhatsApp</strong>
                  <span>Get in touch directly</span>
                </div>

                <ArrowRight size={17} />
              </a>

              {/* Social Media */}
              <div className="contact-social">
                <h3>Follow Happy Technologies</h3>

                <div className="contact-social-links">
                  <a
                    href="https://www.linkedin.com/company/happy-techno/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Happy Technologies on LinkedIn"
                    className="contact-social-link"
                  >
                    <FaLinkedin size={22} />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://www.instagram.com/happytchn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Happy Technologies on Instagram"
                    className="contact-social-link"
                  >
                    <FaInstagram size={22} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
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
      Phone Number

     <input
  type="tel"
  name="phone"
  placeholder="98765 43210"
  inputMode="numeric"
  maxLength={11}
  pattern="[6-9][0-9]{4}[ ]?[0-9]{5}"
  title="Please enter a valid 10-digit Indian mobile number"
  required
/>
    </label>
  </div>

  <div className="form-row">
    <label>
      Email

      <input
        type="email"
        name="email"
        placeholder="you@company.com"
        required
      />
    </label>

    <label>
      Company

      <input
        type="text"
        name="company"
        placeholder="Your company name"
      />
    </label>
  </div>

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

      <option value="Business Website">
        Business Website
      </option>

      <option value="Web Application">
        Web Application
      </option>

      <option value="Software Application">
        Software Application
      </option>

      <option value="SEO Services">
        SEO Services
      </option>

      <option value="Website Maintenance">
        Website Maintenance
      </option>

      <option value="Digital Marketing">
        Digital Marketing
      </option>

      <option value="Mobile Application">
        Mobile Application
      </option>

      <option value="UI/UX Design">
        UI/UX Design
      </option>

      <option value="Other">
        Other
      </option>
    </select>
  </label>

  <div className="form-row">
    <label>
      Estimated Budget

      <select
        name="budget"
        defaultValue=""
      >
        <option value="" disabled>
          Select your budget
        </option>

        <option value="Below ₹25,000">
          Below ₹25,000
        </option>

        <option value="₹25,000 - ₹50,000">
          ₹25,000 - ₹50,000
        </option>

        <option value="₹50,000 - ₹1,00,000">
          ₹50,000 - ₹1,00,000
        </option>

        <option value="₹1,00,000 - ₹3,00,000">
          ₹1,00,000 - ₹3,00,000
        </option>

        <option value="₹3,00,000+">
          ₹3,00,000+
        </option>

        <option value="Not sure">
          Not sure
        </option>
      </select>
    </label>

    <label>
      Project Timeline

      <select
        name="timeline"
        defaultValue=""
      >
        <option value="" disabled>
          When do you want to start?
        </option>

        <option value="Immediately">
          Immediately
        </option>

        <option value="Within 1 month">
          Within 1 month
        </option>

        <option value="1-3 months">
          1-3 months
        </option>

        <option value="3-6 months">
          3-6 months
        </option>

        <option value="Just exploring">
          Just exploring
        </option>
      </select>
    </label>
  </div>

  <label>
    Preferred Contact Method

    <select
      name="contactMethod"
      defaultValue=""
    >
      <option value="" disabled>
        How should we contact you?
      </option>

      <option value="Phone">
        Phone Call
      </option>

      <option value="WhatsApp">
        WhatsApp
      </option>

      <option value="Email">
        Email
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
    disabled={isSending}
  >
    {isSending ? "Sending..." : "Send Enquiry"}

    {!isSending && <ArrowRight size={17} />}
  </button>

  {status && (
    <p className="form-status">
      {status}
    </p>
  )}
</form>
          </div>
        </div>

        {/* Success Modal */}
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
                We'll get back to you shortly.
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
    </>
  );
}