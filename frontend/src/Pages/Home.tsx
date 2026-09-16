import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import {
  services,
  benefits,
  projects,
  lighthouseReport,
} from '../data/siteData';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Happy Technologies | Website & Software Development
        </title>

        <meta
          name="description"
          content="Happy Technologies provides website development, custom software, web application development, SEO, digital marketing and website maintenance services for businesses."
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">
        <div className="hero-background" />

        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">HAPPY TECHNOLOGIES</span>

            <h1>
              Website & software development
              <span> for growing businesses.</span>
            </h1>

            <p className="hero-description">
              We design and develop modern websites, custom software
              and scalable web applications that help businesses build
              a strong digital presence.
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
              alt="Happy Technologies web application development"
            />

            <div className="floating-card">
              <span>Digital Experience</span>
              <strong>Fast. Modern. Reliable.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

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
                <article
                  className="service-card"
                  key={service.number}
                >
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

      {/* =====================================================
          WHY HAPPY TECHNOLOGIES
      ===================================================== */}

      <section className="section">
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
              We focus on practical technology that makes your
              business easier to operate and your customers'
              experience better.
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className="benefit-card"
                  key={benefit.title}
                >
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

      {/* =====================================================
          SELECTED WORK
      ===================================================== */}

      <section className="section section-muted">
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
            {projects.slice(0, 3).map((project) => (
              <article
                className="portfolio-card"
                key={project.title}
              >
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

      {/* =====================================================
          PERFORMANCE & QUALITY
      ===================================================== */}

      <section className="section lighthouse-section">
        <div className="container">
          <div className="lighthouse-content">

            <div className="section-heading">
              <span className="eyebrow">
                PERFORMANCE & QUALITY
              </span>

              <h2>
                Built to perform.
                <span> Designed to deliver.</span>
              </h2>

              <p>
                We believe a great website should be fast,
                accessible, reliable and ready for search engines.
                Our website is tested using Google Lighthouse.
              </p>
            </div>

            <div className="lighthouse-grid">

              <div className="lighthouse-card">
                <strong>
                  {lighthouseReport.performance}
                </strong>
                <span>Performance</span>
              </div>

              <div className="lighthouse-card">
                <strong>
                  {lighthouseReport.accessibility}
                </strong>
                <span>Accessibility</span>
              </div>

              <div className="lighthouse-card">
                <strong>
                  {lighthouseReport.bestPractices}
                </strong>
                <span>Best Practices</span>
              </div>

              <div className="lighthouse-card">
                <strong>
                  {lighthouseReport.seo}
                </strong>
                <span>SEO</span>
              </div>

            </div>

            <a
              href={lighthouseReport.report}
              target="_blank"
              rel="noopener noreferrer"
              className="lighthouse-link"
            >
              View Full Performance Report →
            </a>

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

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
            Tell us about your business, your idea or the website
            you want to improve. We'll help you understand the
            next steps.
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