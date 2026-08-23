import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

import {
  services,
  benefits,
  projects,
  processSteps,
} from '../data/siteData';

export default function Home() {
  return (
    <>
      {/* HERO */}

      <section className="hero">
        <div className="hero-background" />

        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">HAPPY TECHNOLOGIES</span>

            <h1>
              Build a digital presence
              <span> your business can grow with.</span>
            </h1>

            <p className="hero-description">
              We design and develop modern websites, custom software and scalable web applications that help businesses establish, improve and maintain their digital presence. Our SEO and digital marketing solutions help increase online visibility, reach the right customers and drive sustainable business growth.
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Start a Project
                <ArrowRight size={17} />
              </Link>

              <Link to="/portfolio" className="btn btn-secondary">
                View Our Work
              </Link>
            </div>

            <div className="hero-trust">
              <span>Modern Technology</span>
              <span>Performance Focused</span>
              <span>Ongoing Support</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="/images/hero-dashboard.jpg"
              alt="Happy Technologies digital experience"
            />

            <div className="floating-card">
              <span>Digital Experience</span>
              <strong>Fast. Modern. Reliable.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="section">
        <div className="container intro-grid">
          <div>
            <span className="eyebrow">WHAT WE DO</span>

            <h2>
              More than just building
              <span> websites.</span>
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              Your website is often the first interaction a potential
              customer has with your business. It needs to communicate
              who you are, what you offer and why customers should trust
              you.
            </p>

            <p>
              At Happy Technologies, we combine thoughtful UI/UX
              development, modern frontend technologies and practical
              business thinking to create digital experiences that are
              useful, reliable and built for long-term growth.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">OUR SERVICES</span>

              <h2>
                Digital solutions designed
                <span> around your business.</span>
              </h2>
            </div>

            <Link to="/services" className="text-link">
              View all services
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="service-card" key={service.number}>
                  <div className="service-top">

                    <div className="service-icon">
                      <Icon size={23} />
                    </div>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Link to="/services" className="service-link">
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMAGE SECTION */}

      <section className="section">
        <div className="container">
          <div className="large-image-section">
            <img
              src="/images/business-website.jpg"
              alt="Modern business website"
            />

            <div className="large-image-overlay">
              <span className="eyebrow">
                DIGITAL PRESENCE
              </span>

              <h2>
                Your website should work as hard
                <span> as your business.</span>
              </h2>

              <p>
                We don't build websites simply to fill a screen. We
                create digital experiences that communicate your value,
                build customer confidence and make it easier for people
                to take the next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">OUR PROCESS</span>

            <h2>
              From the first idea
              <span> to launch.</span>
            </h2>

            <p>
              A clear process helps us understand your business,
              minimize unnecessary complexity and deliver a website
              that matches your objectives.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-card" key={step.number}>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}

      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">SELECTED WORK</span>

              <h2>
                Designed around
                <span> business needs.</span>
              </h2>
            </div>

            <Link to="/portfolio" className="text-link">
              View portfolio
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="portfolio-grid">
            {projects.map((project) => (
              <article className="portfolio-card" key={project.title}>
                <div className="portfolio-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />

                  <div className="portfolio-overlay">
                    <ArrowUpRight size={21} />
                  </div>
                </div>

                <div className="portfolio-content">
                  <span className="project-category">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="portfolio-disclaimer">
            Concept projects created by Happy Technologies to
            demonstrate our design and development capabilities.
          </p>
        </div>
      </section>

      {/* WHY US */}

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              WHY HAPPY TECHNOLOGIES
            </span>

            <h2>
              Technology without
              <span> the complexity.</span>
            </h2>

            <p>
              We focus on practical technology that makes your business
              easier to operate and your customers' experience better.
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article className="benefit-card" key={benefit.title}>
                  <div className="benefit-icon">
                    <Icon size={21} />
                  </div>

                  <h3>{benefit.title}</h3>

                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAINTENANCE */}

      <section className="section">
        <div className="container maintenance-grid">
          <div className="maintenance-image">
            <img
              src="/images/maintenance.jpg"
              alt="Website maintenance and monitoring"
              loading="lazy"
            />
          </div>

          <div className="maintenance-content">
            <span className="eyebrow">
              WEBSITE MAINTENANCE
            </span>

            <h2>
              Your website shouldn't become
              <span> outdated after launch.</span>
            </h2>

            <p>
              A website is a living part of your business. Content
              changes, technology evolves, security updates become
              necessary and new requirements appear.
            </p>

            <p>
              Our maintenance service gives you ongoing technical
              support without the cost of hiring a full-time developer.
            </p>

            <div className="maintenance-points">
              <span>
                <CheckCircle2 size={17} />
                Content updates
              </span>

              <span>
                <CheckCircle2 size={17} />
                Bug fixes
              </span>

              <span>
                <CheckCircle2 size={17} />
                Security updates
              </span>

              <span>
                <CheckCircle2 size={17} />
                Performance improvements
              </span>
            </div>

            <Link to="/pricing" className="btn btn-secondary">
              View Maintenance Plans
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="section">
        <div className="container final-cta">
          <span className="eyebrow">
            LET'S BUILD SOMETHING GREAT
          </span>

          <h2>
            Ready to build a better
            <span> digital presence?</span>
          </h2>

          <p>
            Tell us about your business, your idea or the website you
            want to improve. We'll help you understand the next steps.
          </p>

          <Link to="/contact" className="btn btn-primary">
            Start a Project
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}