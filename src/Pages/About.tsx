import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">ABOUT US</span>

          <h1>
            Technology that helps
            <span> businesses move forward.</span>
          </h1>

          <p>
            Happy Technologies is a technology and digital development business focused on helping companies establish, improve and maintain their digital presence. We build modern websites, custom software and scalable web applications, while providing SEO and digital marketing solutions that help businesses improve visibility, reach customers and grow online.
          </p>
        </div>

        <div className="about-feature">
          <div className="about-image">
            <img
              src="/images/about-happy-technologies.png"
              alt="Happy Technologies"
            />
          </div>

          <div className="about-content">
            <span className="eyebrow">OUR APPROACH</span>

            <h2>
              Simple technology.
              <span> Meaningful results.</span>
            </h2>

            <p>
              We believe technology should solve problems rather than
              create unnecessary complexity.
            </p>

            <p>
              Whether you're a small business launching your first
              website or an established company looking to improve an
              existing digital product, we focus on understanding what
              your business actually needs before recommending a
              solution.
            </p>

            <p>
              Our goal is to create digital experiences that are
              professional, reliable, easy to use and maintainable for
              the long term.
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

        <div className="about-statement">
          <span className="eyebrow">OUR MISSION</span>

          <h2>
            Make professional technology
            <span> accessible to growing businesses.</span>
          </h2>

          <p>
            A strong digital presence should not be limited to large
            companies. We want to help businesses of different sizes
            build websites and digital products that represent them
            professionally and help them compete online.
          </p>

          <Link to="/contact" className="btn btn-primary">
            Work With Us
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}