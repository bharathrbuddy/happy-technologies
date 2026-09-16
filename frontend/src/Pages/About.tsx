import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { processSteps } from '../data/siteData';

export default function About() {
  return (
    <>
      <Helmet>
        <title>
          About Happy Technologies | Web & Software Development
        </title>

        <meta
          name="description"
          content="Learn about Happy Technologies, our approach to website development, custom software, web applications, SEO and digital solutions for growing businesses."
        />
      </Helmet>

      {/* =====================================================
          PAGE INTRO
      ===================================================== */}

      <section className="page-section">
        <div className="container">

          <div className="page-heading">
            <span className="eyebrow">ABOUT US</span>

            <h1>
              Technology that helps
              <span> businesses move forward.</span>
            </h1>

            <p>
              Happy Technologies is a technology and digital
              development business focused on helping companies
              establish, improve and maintain their digital
              presence.
            </p>
          </div>

          {/* =================================================
              OUR APPROACH
          ================================================= */}

          <div className="about-feature">

            <div className="about-image">
              <img
                src="/images/about-happy-technologies.png"
                alt="Happy Technologies digital solutions"
              />
            </div>

            <div className="about-content">
              <span className="eyebrow">
                OUR APPROACH
              </span>

              <h2>
                Simple technology.
                <span> Meaningful results.</span>
              </h2>

              <p>
                Your website or digital product should solve
                business problems, not create unnecessary
                complexity.
              </p>

              <p>
                We start by understanding what your business
                actually needs before recommending a solution.
                Whether you are launching your first website or
                improving an existing digital product, our focus
                remains on creating something useful, reliable
                and easy to maintain.
              </p>

              <div className="about-points">

                <span>
                  <CheckCircle2 size={17} />
                  Business-focused solutions
                </span>

                <span>
                  <CheckCircle2 size={17} />
                  Modern development practices
                </span>

                <span>
                  <CheckCircle2 size={17} />
                  Responsive digital experiences
                </span>

                <span>
                  <CheckCircle2 size={17} />
                  Long-term technical support
                </span>

              </div>
            </div>

          </div>

          {/* =================================================
              HOW WE WORK
          ================================================= */}

          <div className="about-process">

            <div className="section-heading">
              <span className="eyebrow">
                HOW WE WORK
              </span>

              <h2>
                From the first idea
                <span> to launch.</span>
              </h2>

              <p>
                A clear process helps us understand your business,
                reduce unnecessary complexity and deliver a
                solution aligned with your objectives.
              </p>
            </div>

            <div className="process-grid">

              {processSteps.map((step) => (
                <article
                  className="process-card"
                  key={step.number}
                >
                   <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                  />
                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </article>
              ))}

            </div>

          </div>

          {/* =================================================
              OUR MISSION
          ================================================= */}

          <div className="about-statement">

            <span className="eyebrow">
              OUR MISSION
            </span>

            <h2>
              Make professional technology
              <span>
                {' '}accessible to growing businesses.
              </span>
            </h2>

            <p>
              A strong digital presence should not be limited to
              large companies. We want to help businesses of
              different sizes build websites and digital products
              that represent them professionally and help them
              compete online.
            </p>

            <Link
              to="/contact"
              className="btn btn-primary"
            >
              Work With Us
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}