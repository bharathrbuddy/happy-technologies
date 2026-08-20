import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/siteData';

export default function Services() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">SERVICES</span>

          <h1>
            Digital solutions built
            <span> around your business.</span>
          </h1>

          <p>
            From professional business websites to custom web
            applications and ongoing maintenance, we provide practical
            technology solutions designed around your goals.
          </p>
        </div>

        <div className="services-large-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-large-card" key={service.title}>
                <div className="service-large-image">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                  />
                </div>

                <div className="service-large-content">
                  <div className="service-icon">
                    <Icon size={24} />
                  </div>

                  <span className="service-number">
                    {service.number}
                  </span>

                  <h2>{service.title}</h2>

                  <p>{service.description}</p>

                  <Link to="/contact" className="text-link">
                    Discuss this service
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="bottom-cta">
          <span className="eyebrow">
            HAVE A DIFFERENT REQUIREMENT?
          </span>

          <h2>Tell us what you need.</h2>

          <p>
            Every business is different. Tell us what you're trying to
            achieve and we'll help you determine the right solution.
          </p>

          <Link to="/contact" className="btn btn-primary">
            Talk to Us
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}